# Ferramentas de blog — Auditik

Pipeline em duas etapas para conteúdo do blog:

1. **Coleta** (`scrape_blog.py`) — extrai artigos de referência e salva em `post_ideas/`
2. **Adaptação** (`reshape_blog_post.py`) — reescreve via Gemini com perfil configurável e publica em `content/blog/`

## Pré-requisitos

- Python 3.10+
- Ambiente virtual do projeto em `.venv` (raiz do repositório)
- Chave `GOOGLE_API_KEY` em `.env.local` (apenas para adaptação)

```bash
# Na raiz do projeto
source .venv/bin/activate

pip install -r requirements.txt
pip install -r scripts/blog_tools/requirements-blog.txt
playwright install chromium
```

---

## 1. Coleta (`scrape_blog.py`)

```bash
# Validar viabilidade de scraping (sem coletar)
.venv/bin/python scripts/blog_tools/scrape_blog.py \
  --url "https://otoclinic.com.br/blog-otoclinic/" \
  --validate-only

# Coletar todos os artigos de uma lista
.venv/bin/python scripts/blog_tools/scrape_blog.py \
  --list-file scripts/blog_tools/urls.example.txt

# Coletar com pasta customizada (alinha com post_ideas/comunicare)
.venv/bin/python scripts/blog_tools/scrape_blog.py \
  --url "https://comunicareaparelhosauditivos.com/blog/" \
  --site-slug comunicare

# Teste com limite de artigos
.venv/bin/python scripts/blog_tools/scrape_blog.py \
  --url "https://otoclinic.com.br/blog-otoclinic/" \
  --max-articles 3 \
  --site-slug otoclinic
```

### Fluxo

1. **Validação** — conectividade, descoberta (sitemap/RSS/crawl), contagem e amostra de extração
2. **Coleta** — salva `post_ideas/{site_slug}/{slug-do-titulo}.md`
3. **Resumo** — estatísticas no terminal (Rich)

### Flags úteis (coleta)

| Flag                       | Descrição                                   |
| -------------------------- | ------------------------------------------- |
| `--validate-only`          | Só valida, não coleta                       |
| `--force`                  | Coleta sites com status AVISO               |
| `--resume`                 | Pula artigos já salvos                      |
| `--no-playwright`          | Desativa fallback para sites com JavaScript |
| `--max-articles N`         | Limita artigos por site                     |
| `--site-slug-map URL=slug` | Mapeia pasta por URL                        |

### Limitações da coleta

- Paywall, login obrigatório ou bloqueio anti-bot podem impedir a coleta
- Paginação infinita (scroll JS) pode não listar todos os artigos
- Sites muito dinâmicos dependem do fallback Playwright

---

## 2. Adaptação (`reshape_blog_post.py`)

Adapta artigos markdown para o contexto da marca usando Google Gemini. A instrução enviada ao modelo é definida por **perfis YAML** em `profiles/`, com overrides via CLI.

### Uso rápido

```bash
# Perfil padrão Auditik (saída completa com front matter)
.venv/bin/python scripts/blog_tools/reshape_blog_post.py \
  --input-dir scripts/blog_tools/post_ideas/comunicare

# Ajustar tom sem editar o YAML
.venv/bin/python scripts/blog_tools/reshape_blog_post.py \
  --input-dir scripts/blog_tools/post_ideas/otoclinic \
  --tone "Didático e acolhedor, voltado para familiares de idosos" \
  --extra-instructions "Enfatize a linha Philips HearLink sem soar promocional"

# Inspecionar o prompt antes de chamar a API (sem custo)
.venv/bin/python scripts/blog_tools/reshape_blog_post.py \
  --input-dir scripts/blog_tools/post_ideas/comunicare \
  --show-prompt
```

> **Nota:** `--show-prompt` não exige `GOOGLE_API_KEY`. Use para validar tom, regras e estratégia antes de processar lotes.

### Fluxo de adaptação

1. Lê artigos de `post_ideas/` (ou paths informados)
2. Monta prompt a partir do perfil + template `content/blog/.template.md`
3. Chama Gemini e normaliza a saída conforme `output.mode`
4. Salva em `content/blog/{timestamp}-{seq}.md`
5. Move o arquivo de entrada para `posted/`

### Flags (adaptação)

| Flag | Descrição |
| ---- | --------- |
| `--profile NAME` | Perfil em `profiles/` (padrão: `auditik`) |
| `--config PATH` | YAML adicional com merge sobre o perfil |
| `--tone TEXT` | Sobrescreve `voice.tom` |
| `--audience TEXT` | Sobrescreve `voice.publico_alvo` |
| `--extra-instructions TEXT` | Acrescenta instruções de adaptação |
| `--output-mode {full,body_only}` | `full` = front matter + corpo; `body_only` = só corpo |
| `--model NAME` | Modelo Gemini (padrão: definido no perfil) |
| `--template PATH` | Template markdown de referência |
| `--input-dir DIR` | Pasta com `.md` para lote |
| `--list-file PATH` | Arquivo com 1 path por linha |
| `--show-prompt` | Exibe prompt do primeiro arquivo e encerra |
| `--api-key KEY` | Chave Gemini (ou `GOOGLE_API_KEY` no `.env.local`) |

### Perfil YAML

O perfil padrão está em [`profiles/auditik.yaml`](profiles/auditik.yaml). Prioridade de configuração:

1. Perfil base (`--profile`)
2. YAML customizado (`--config`) — merge profundo sobre o perfil
3. Flags CLI (`--tone`, `--audience`, etc.)

#### Seções do perfil

| Seção | Função |
| ----- | ------ |
| `brand` | Dados da empresa (nome, contato, endereço, redes) |
| `voice` | Tom, público-alvo e estilo de escrita |
| `adaptation.estrategia` | Raciocínio que o Gemini aplica **internamente** antes de reescrever |
| `adaptation.regras` | Regras de adaptação do conteúdo |
| `adaptation.cta_final` | Orientação para o call-to-action final |
| `adaptation.instrucoes_extras` | Campo vazio por padrão; preenchível via CLI |
| `output.mode` | `full` (padrão) ou `body_only` |
| `output.topics_permitidos` | Lista de slugs válidos para o front matter |
| `model.name` | Modelo Gemini padrão |

#### Criar um perfil novo

```bash
cp scripts/blog_tools/profiles/auditik.yaml scripts/blog_tools/profiles/meu-perfil.yaml
# Edite name, brand, voice, adaptation...
.venv/bin/python scripts/blog_tools/reshape_blog_post.py \
  --profile meu-perfil \
  --input-dir scripts/blog_tools/post_ideas/comunicare
```

#### Exemplo de override parcial via `--config`

```yaml
# meu-override.yaml
voice:
  tom: "Técnico e objetivo, voltado para profissionais de saúde"
adaptation:
  instrucoes_extras: "Mantenha termos clínicos quando apropriado."
output:
  mode: body_only
```

```bash
.venv/bin/python scripts/blog_tools/reshape_blog_post.py \
  --config meu-override.yaml \
  --input-dir scripts/blog_tools/post_ideas/essencial_aasi
```

### Compatibilidade

`reshape2auditik.py` permanece como wrapper obsoleto que delega para `reshape_blog_post.py`.

---

## Pipeline completo

```bash
# 1. Coletar referências
.venv/bin/python scripts/blog_tools/scrape_blog.py \
  --list-file scripts/blog_tools/urls.txt

# 2. Adaptar para Auditik
.venv/bin/python scripts/blog_tools/reshape_blog_post.py \
  --input-dir scripts/blog_tools/post_ideas/comunicare

# 3. Revisar e publicar manualmente em content/blog/ (TinaCMS)
```

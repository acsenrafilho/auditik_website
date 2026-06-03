# Ferramenta de extração social — Auditik

Extrai **legendas** e **transcrições de áudio** de posts públicos de Instagram e Facebook (conteúdo de terceiros) para gerar relatórios prontos para análise com IA.

Use esta ferramenta quando quiser entender **quais temas, ganchos e ângulos** estão performando em referências externas antes de criar conteúdo para a Auditik.

---

## Pré-requisitos

- **Python 3.10+**
- **FFmpeg** instalado no sistema:

```bash
sudo apt update && sudo apt install -y ffmpeg
```

- **~2 GB RAM** (modelo Whisper `base` em CPU)
- Conta Instagram/Facebook **logada no navegador** (cookies necessários para a maioria dos Reels de terceiros)

---

## Instalação

Recomendamos um venv dedicado para não misturar dependências pesadas com o restante do projeto:

```bash
cd /caminho/para/auditik_website

python3 -m venv scripts/social_scrapping/.venv-social
source scripts/social_scrapping/.venv-social/bin/activate

pip install -r scripts/social_scrapping/requirements.txt
```

Na primeira execução com transcrição, o modelo Whisper será baixado automaticamente (~150 MB para `base`).

---

## Configurar cookies (obrigatório para Instagram)

Posts de terceiros quase sempre exigem sessão autenticada. Duas opções:

### Opção A — Importar do navegador (recomendado)

```bash
python scripts/social_scrapping/extract.py \
  --list-file scripts/social_scrapping/urls.txt \
  --cookies-from-browser chrome
```

Navegadores suportados: `chrome`, `chromium`, `firefox`, `brave`, `edge`.

> Feche o navegador antes de rodar, se houver erro de bloqueio do perfil.

### Opção B — Arquivo cookies.txt

1. Instale a extensão **Get cookies.txt LOCALLY** no Chrome
2. Acesse instagram.com logado
3. Exporte cookies → salve como `scripts/social_scrapping/cookies.txt`
4. Execute com `--cookies-file scripts/social_scrapping/cookies.txt`

**Nunca commite `cookies.txt`** — contém credenciais de sessão.

---

## Uso

### 1. Prepare a lista de URLs

Copie o exemplo e edite:

```bash
cp scripts/social_scrapping/urls.example.txt scripts/social_scrapping/urls.txt
```

Formato: **1 URL por linha**. Linhas em branco e comentários (`#`) são ignorados.

### 2. Triagem rápida (só legendas, sem transcrição)

Menos tráfego, ideal para filtrar URLs relevantes:

```bash
python scripts/social_scrapping/extract.py \
  --list-file scripts/social_scrapping/urls.txt \
  --cookies-from-browser chrome \
  --no-transcribe
```

### 3. Extração completa (legenda + transcrição)

```bash
python scripts/social_scrapping/extract.py \
  --list-file scripts/social_scrapping/urls.txt \
  --cookies-from-browser chrome \
  --whisper-model base \
  --delay-min 8 --delay-max 15
```

### 4. URL individual

```bash
python scripts/social_scrapping/extract.py \
  --url "https://www.instagram.com/reel/ABC123/" \
  --cookies-from-browser chrome
```

### 5. Retomar lote (--resume)

Evita reprocessar URLs já extraídas (cache em `output/.cache.json`):

```bash
python scripts/social_scrapping/extract.py \
  --list-file scripts/social_scrapping/urls.txt \
  --cookies-from-browser chrome \
  --resume
```

---

## Saída

Relatórios gerados em `scripts/social_scrapping/output/`:

| Arquivo | Conteúdo |
|---------|----------|
| `relatorio_YYYYMMDD-HHMMSS.md` | Relatório legível + resumo executivo para colar na IA |
| `relatorio_YYYYMMDD-HHMMSS.json` | Mesmos dados estruturados (JSON) |
| `.cache.json` | Cache de URLs já processadas (--resume) |

---

## Workflow recomendado para análise de conteúdo

1. **Curadoria** — Selecione 10–15 Reels de referência sobre um tópico (ex.: presbiacusia, zumbido, tecnologia auditiva)
2. **Triagem** — Rode com `--no-transcribe` para validar legendas
3. **Extração completa** — Transcreva os posts mais relevantes
4. **Análise** — Abra o `.md` gerado e cole o bloco "Resumo executivo" no Cursor, ChatGPT ou Gemini
5. **Criação** — Use os insights manualmente no TinaCMS ou no pipeline `reshape2auditik.py`

### Prompt sugerido para análise

```
Analise os posts de referência abaixo sobre [TÓPICO].
Identifique:
1. Ganchos de abertura mais eficazes (primeiros 3 segundos / primeiras frases)
2. Temas e subtemas recorrentes
3. Tom de voz (educativo, emocional, provocativo, etc.)
4. CTAs e estruturas narrativas
5. Oportunidades de conteúdo para a Auditik (Philips HearLink) que ainda não foram exploradas
6. Ranking dos 3 posts com maior potencial de adaptação para nosso público (idosos + familiares, Piracicaba/região)
```

---

## Execução segura (anti-bloqueio)

| Prática | Motivo |
|---------|--------|
| Executar **localmente** (seu PC) | IPs de datacenter/CI são bloqueados rapidamente |
| Lotes pequenos: **5–15 URLs por sessão** | Reduz fingerprint de automação |
| Usar cookies de conta pessoal real | Sessão autenticada simula acesso humano |
| Intervalo **8–15 s** entre URLs (padrão) | Rate limiting com jitter |
| `--no-transcribe` na triagem | Menos downloads = menos risco |
| Manter yt-dlp atualizado | `pip install -U yt-dlp` |
| **Não usar VPN comercial/datacenter** | IPs compartilhados são flagados |
| Espaçar sessões grandes (horas/dias) | Evita rate limit acumulado |

---

## Limitações

| Tipo de conteúdo | Suporte |
|------------------|---------|
| Instagram Reels / vídeos | Bom (com cookies) |
| Instagram carrossel / imagem | Legenda sim; transcrição N/A |
| Facebook vídeos | Instável (best-effort) |
| Stories | Não (expiram rapidamente) |
| Posts privados | Não (precisa ser seguidor + cookies) |

---

## Troubleshooting

### `Login required` / `Requested content is not available`

- Renove cookies (`--cookies-from-browser chrome` com sessão ativa)
- Confirme que consegue abrir a URL no navegador logado
- Aguarde 24h se houver bloqueio temporário e reduza o lote

### `FFmpeg not found`

```bash
sudo apt install ffmpeg
ffmpeg -version
```

### Transcrição lenta

- Use `--whisper-model tiny` ou `small` para testes
- Use `--no-transcribe` na triagem e transcreva só os selecionados

### URL não suportada

Apenas Instagram e Facebook são aceitos. URLs de TikTok, YouTube etc. não são suportadas nesta ferramenta.

### Erro ao importar cookies do Chrome (Linux)

Instale a dependência de keyring do sistema:

```bash
pip install secretstorage
```

Se persistir, use `--cookies-file` com export manual.

---

## Aviso legal e ético

Esta ferramenta destina-se a **inspiração analítica** de conteúdo público para estratégia editorial. Ao adaptar ideias para a Auditik:

- Não copie textos, áudios ou roteiros verbatim
- Respeite direitos autorais e marcas registradas
- Crie conteúdo original alinhado à voz da Auditik e à Philips HearLink

---

## Estrutura

```
scripts/social_scrapping/
├── extract.py           # CLI principal
├── lib/
│   ├── config.py        # Configurações e tipos
│   ├── extractor.py     # yt-dlp (metadados + áudio)
│   ├── transcriber.py   # faster-whisper
│   ├── formatter.py     # Relatórios MD/JSON
│   └── rate_limit.py    # Delays entre URLs
├── urls.example.txt
├── requirements.txt
└── output/              # Relatórios (gitignored)
```

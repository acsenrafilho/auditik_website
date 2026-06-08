---
title: "Diretrizes para Receitas em Python na Kommo: Código, Estilo & Publicação"
source: "https://pt-developers.kommo.com/docs/diretrizes-para-receitas-em-python"
date: "2026-02-19"
---

Primeiro, é uma ótima notícia que você gostaria de compartilhar seu conhecimento com a comunidade de desenvolvedores!
Há várias regras que você deve seguir para que sua receita seja publicada. Vamos começar!
- Certifique-se de que o código seja fácil de ler e entender. Use nomes de variáveis e funções claros.
✅ resposta_campo_customizado_contato
❌ c_cf_resp - Certifique-se de que o trecho de código aborda um problema específico ou demonstra uma funcionalidade particular em Python. Isso pode ser algo útil para a comunidade, como trabalhar com APIs ou processamento de dados.
- Sempre que possível, evite dependências externas complexas. Isso simplificará a execução do código pelos usuários.
- Se uma dependência for necessária, forneça instruções de instalação (por exemplo, usando pip).
- Teste o código antes de publicá-lo. Certifique-se de que ele funcione e não contenha erros.
- Siga as diretrizes de formatação de código padrão (PEP 8 for Python). Isso aumentará a legibilidade.
- Considere o desempenho do seu código e evite soluções excessivamente intensivas em recursos, a menos que sejam necessárias.
- Forneça uma possível resposta ao seu código, se aplicável.
- Inclua uma descrição de cada etapa como comentários acima da seção de código.
Um exemplo:
import requests
import csv
#1. Defina subdomínio e chave_api
#Escreva aqui o subdomínio da sua conta e o token de longa duração ou de acesso.
SUBDOMAIN = ''
API_KEY = ''
#2. Defina um URL modelo
#Cole o URL que será usado para enviar os dados.
CREATE_TEMPLATE_URL = f'https://{SUBDOMAIN}.kommo.com/api/v4/chats/templates'
#3. Obtenha um arquivo CSV
#Obtenha um arquivo CSV com os modelos pré-aprovados que você deseja importar.
with open('templates.csv') as csvData:
templates = csv.DictReader(csvData)
#4. Analise o arquivo CSV
#O documento CSV deve conter duas colunas: ‘name’ e ‘content’.
#O loop FOR adicionará um nome e conteúdo de cada modelo
#e enviará uma solicitação POST para adicionar um modelo com esses dados.
for template in templates:
name = template['name']
body = {
'name' : name,
"content": template['content'],
}
headers = {
'Authorization' : f'Bearer {API_KEY}',
'Content-Type': 'application/json'
}
response = requests.post(CREATE_TEMPLATE_URL, json=body, headers=headers)
print(response.text)
Certifique-se de incluir as seguintes informações ao enviar seu snippet de receita:
- Título e uma breve descrição da receita, junto com a categoria escolhida. Se seu snippet não se encaixar nas categorias fornecidas, escolha “Outro” e especifique a categoria nas notas.
- Compartilhe um link para seu Google Colab ou repositório no GitHub onde o snippet está armazenado.
- Forneça seu nickname no GitHub/Discord ou o nome da sua empresa, caso deseje ser creditado na descrição da receita.
- Compartilhe seu número de telefone e o aplicativo de mensagens preferido (WhatsApp/Telegram) ou e-mail. Entraremos em contato apenas se tivermos dúvidas sobre seu snippet ou descrição.
Seu formulário será revisado por um moderador e um desenvolvedor backend em até 10 dias após o envio.
Se houver dúvidas sobre seu código ou comentários, você receberá uma mensagem no mensageiro escolhido ou um e-mail. Por isso, recomendamos fornecer essas informações.
Quando sua receita for publicada, faremos um anúncio no nosso canal do Discord e marcaremos você, se deixar seu nickname do Discord.
Se você deseja criar uma receita em uma linguagem de programação diferente de Python, envie uma mensagem para nós no Discord.

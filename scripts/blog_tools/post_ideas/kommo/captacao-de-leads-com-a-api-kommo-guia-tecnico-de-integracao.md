---
title: "Captação de Leads com a API Kommo: Guia Técnico de Integração"
source: "https://pt-developers.kommo.com/docs/capta%C3%A7%C3%A3o-de-leads"
date: "2026-02-19"
---

Este tutorial ajudará iniciantes a entender como construir um aplicativo. Você encontrará respostas para suas dúvidas sobre:
-
Entidades do Kommo e como elas interagem entre si
-
Criação de uma integração privada
-
Autorização
-
Teste de um aplicativo
-
Informações básicas sobre a API do Kommo
É importante notar que não vamos ensinar programação geral ou desenvolvimento de backend, mas sim como entender a Kommo e criar integrações que resolvam os problemas dos clientes sem causar danos.
Vamos imaginar que você recebeu um pedido de um cliente. Eles têm uma escola de idiomas online para jovens aprendizes. A equipe não é muito grande. Há um gerente da escola, gerentes de vendas, professores e assistentes de professores. Eles têm um site com um formulário que gera leads (seus clientes em potencial preenchem o formulário para se inscrever nas aulas).
Por algum motivo, eles não conseguem usar as integrações de formulários existentes. Eles precisam de uma solução que colete todos os leads e os importe para a conta deles na Kommo.
Então, você diz ao seu cliente que a melhor forma de resolver o problema deles é criar uma integração privada.
Aqui você pode encontrar um guia sobre como construir um aplicativo na conta de um cliente.
Para criar uma solução funcional, você precisará fazer requisições para a API da Kommo.
Para solicitar uma conta, você precisa incluir o subdomínio da conta na URL.
Por exemplo,
https://littletreeschool.kommo.com/api/v4/lead
Você pode entrar na sua conta e encontrar o subdomínio da conta na URL.
Uma integração privada existe apenas em uma conta. Se for criada em uma conta, ela não terá acesso a outras contas.
Portanto, uma integração privada deve ser criada em uma conta onde será utilizada, ou seja, na conta do seu cliente.
Você não precisa de uma conta técnica para começar a desenvolver integrações privadas.
Para criar uma integração privada, basta ir no Menu lateral → Configurações → Integraçãos → botão Criar Integração no canto superior direito.
Depois disso, você estará a apenas um clique de criar uma integração privada.
Existem dois tipos de autorização:
-
OAuth 2.0
O OAuth 2.0 é mais complexo. Não vamos focar nele neste tutorial.
Usaremos um token de longa duração para a integração em que estamos trabalhando.
Abra a integração que foi criada na etapa anterior e clique na guia Chaves e escopos.
O único item que você usará é o token de longa duração.
Como você pode obter esse token:
-
Você pode obter esse token sozinho, se o administrador da conta lhe conceder esses direitos (direitos de administrador). Nesse caso, você gera o token e o armazena em um local seguro. Se o administrador da conta remover seus direitos de administrador, você ainda poderá usar o token. Eles também teriam que revogar o acesso na guia Autorização, caso não queiram mais que você tenha acesso à conta deles via integração.
-
Um administrador da conta pode criar a integração, gerar um token de longa duração e compartilhá-lo com você.
Mantenha seu token de longa duração em um local seguro!
Quando você cria uma integração na conta de um cliente, sempre há o risco de que algo possa dar errado e afetar os dados na conta (se o seu app não for apenas leitura).
A melhor coisa que você pode fazer para criar um bom produto (seu app) é praticar em um sandbox.
Uma conta de teste pode se tornar esse sandbox, pois não tem as limitações de uma conta técnica.
Para criar outra conta de teste, vá para kommo.com, clique em Acessar conta no canto superior direito → Criar outra conta. Não se esqueça de que ela dura apenas 14 dias!
Depois de concluir as etapas anteriores, é hora de aprender as informações básicas sobre requisições e respostas.
Use o formato JSON para as requisições da API.
Você deve fazer todas as requisições da API para o endpoint seguro (HTTPS).
A API do Kommo utiliza os seguintes verbos HTTP:
Por exemplo, POST /api/v4/leads
com o corpo relevante irá adicionar um lead à conta.
Há um limite para o número de requisições API por segundo que você pode realizar. Esse limite é aplicado ao endereço IP usado para fazer as requisições.
Você não deve fazer mais de 7 requisições por segundo.
O que acontece se você ultrapassar o limite?
Se você enviar muitas requisições de uma vez, receberá o código de status HTTP 429 Too Many Requests
.
Se as restrições forem violadas várias vezes, seu endereço IP será bloqueado e o código de status HTTP 403 Forbidden
será retornado para qualquer requisição.
Então, você tem seu subdomínio e token, mas não sabe exatamente onde colocá-los.
Este é um exemplo de uma requisição GET. Passe seu subdomínio como valor para a variável SUBDOMINIO
e seu token de longa duração como valor para a variável CHAVE_API
.
import requests
SUBDOMINIO = ''
CHAVE_API = ''
GET_LEAD_URL = f'{SUBDOMINIO}.kommo.com/api/v4/leads'
headers = {
'Authorization' : f'Bearer {CHAVE_API}',
'Content-Type': 'application/json'
}
requests.get(GET_LEAD_URL, headers=headers)
Também existe uma receita que pode ajudar com isso.
Se você quiser usar nossas referências de API para praticar, é ainda mais fácil.
Um diagrama de relacionamento de entidades (ERD), também conhecido como modelo de relacionamento de entidades, é uma representação gráfica que ilustra os relacionamentos entre pessoas, objetos, lugares, conceitos ou eventos dentro de um sistema de tecnologia da informação (TI).
O cliente que mencionamos no início tem uma escola online para jovens alunos.
Então, podemos dizer que
- a entidade Conta representa a escola
- os Usuários representam os gerentes de vendas
- a entidade Lead representa um aluno (como são muito jovens, os Contatos são seus pais)
- Tags são essenciais porque ajudam os gerentes de vendas a colocar os alunos corretamente em grupos para as aulas
- existem Campos personalizados como Idade que também ajudam no processo de alocação
- há diferentes Pipelines para diferentes idiomas
- Etapas mostram o estado de um lead no pipeline (se o aluno está agendado para uma aula demo ou está prestes a assinar um contrato)
Uma escola pode funcionar e fazer sentido se houver alunos. Os alunos são representados por leads no Kommo CRM, então começaremos com uma ação simples como a adição de um lead.
Você pode criar um lead com uma simples solicitação POST, até mesmo com um único parâmetro no corpohttps://{YOUR_SUBDOMAIN}.kommo.com/api/v4/leads
.
Mas, como os leads devem ser importados de um formulário preenchido no site da escola, ele conterá um pouco mais do que apenas o nome de um aluno.
Primeiro, vamos dar uma olhada nos parâmetros do corpo do método.
[
{
"name": "Ana Clara",
"pipeline_id": 8244687,
"status_id": 65625139,
"responsible_user_id": 10618939,
"custom_fields_values": [
{
"field_id": 1551478,
"values": [
{
"value": 7
}
]
}
]
}
]
-
name
- é o nome de um aluno do formulário. -
pipeline_id
- É o ID de um pipeline ao qual o lead será adicionado. Você pode obter uma lista de pipelines e definir um como padrão, já que todos os leads vêm do mesmo formulário. -
status_id
- você pode obter uma lista de etapas e escolher uma etapa para todos esses leads. -
responsible_user_id
- você pode obter uma lista de usuários, classificá-los por grupo (equipe de vendas) e escrever sua lógica para distribuição de leads entre os gerentes de vendas. -
custom_fields_values
- Você pode passar informações extras do formulário, como a idade do aluno. Para isso, você precisa conhecer os IDs dos campos personalizados. Você pode obter uma lista de campos personalizados de leads e escolher o necessário.
Esteja ciente de que os IDs de campos personalizados/pipeline/etapa não são universais. Se você tentar enviar o corpo da solicitação do exemplo acima, receberá o código de status HTTP 400 porque um campo personalizado/pipeline/etapa com tal ID não existe em sua conta.
O controle de duplicados é a capacidade de um aplicativo verificar as instâncias de entidades adicionadas e garantir que não haja duplicatas.
Vamos analisar um trecho de código que verifica se o contato do lead é novo ou já existe na conta.
Você pode verificar qualquer entidade quanto a duplicados. Apenas tenha em mente que as habilidades de filtragem são limitadas, e em alguns casos, você terá que usar um parâmetro query
para pesquisar uma instância da entidade que você precisa.
Linguagem do snippet - Python
# insira o subdomínio da sua conta aqui
SUBDOMINIO = ''
# insira seu token de longa duração ou token de acesso
CHAVE_API = ''z
Aqui, temos que definir as variáveis que usaremos mais tarde no snippet: SUBDOMINIO
(seu subdominio de conta) e CHAVE_API
(seu Token de longa duração ou Token de acesso).
BASE_LEAD_URL = f"https://{SUBDOMINIO}.kommo.com/api/v4/leads/complex"
BASE_CONTATO_URL = f"https://{SUBDOMINIO}.kommo.com/api/v4/contacts"
BASE_CONTATO_CAMPOCUSTOMIZADO_URL = f"https://{SUBDOMINIO}.kommo.com/api/v4/contacts/custom_fields"
Definimos variáveis que usaremos mais tarde no código.
BASE_LEAD_URL
será usado para adicionar leads com contatos e empresas.
BASE_CONTATO_URL
será usado para obter uma lista de contatos.
BASE_CONTATO_CAMPOCUSTOMIZADO_URL
será usado para obter uma lista de campos personalizados de contatos.
telefoneContatoNovo = '+18305803077'
params = {
'query' : telefoneContatoNovo
}
response = requests.get(BASE_CONTATO_URL, params=params, headers=headers)
Aqui obtemos um número de telefone (+18305803077
) e o adicionamos como uma chave ao valor query
.
Depois, obtemos uma resposta de uma solicitação GET com um parâmetro de consulta.
if (response.status_code == 204):
response = requests.get(BASE_CONTATO_CAMPOCUSTOMIZADO_URL, params=params, headers=headers)
respostaContatoCampoCustomizado = response.json()
print(respostaContatoCampoCustomizado)
Se você receber o código HTTP 204
(Sem conteúdo), isso significa que não existe um contato com esse número.
Então, a primeira coisa que fazemos é enviar uma solicitação GET para obter os campos personalizados do contato e salvar a resposta como contactCustomFieldsResponse
.
campoCustomizadoContato = respostaContatoCampoCustomizado["_embedded"]['custom_fields']
idCampoTelefone = ''
for field in campoCustomizadoContato:
if (field['code'] == 'PHONE'):
idCampoTelefone = field['id']
break
A partir de respostaContatoCampoCustomizado
precisamos apenas de um array de objetos de campos personalizados, então salvamos o array como campoCustomizadoContato
.
Declaramos uma variável chamada idCampoTelefone
e definimos seu valor inicial como uma string vazia. É importante fazer isso para evitar a perda de dados no loop for
a seguir. Cada contato pode ter vários campos personalizados, mas essa variável armazenará especificamente o ID do campo personalizado para o número de telefone.
O loop for
itera por cada objeto (field
) no array campoCustomizadoContato
e verifica se o valor 'code'
do field
é igual a 'PHONE'
. Se for verdadeiro, o id
desse field
é salvo como idCampoTelefone
, e o loop para.
body = [{
'name': "Exemplo lead 1",
'_embedded': {
"contacts" : [
{
"name" : "Novo contato",
"custom_fields_values" : [{
"field_id": idCampoTelefone,
"values": [
{
"value": telefoneContatoNovo
}
]
}]
}
]
}
}]
novaRespostaLead = requests.post(BASE_LEAD_URL, json=body, headers=headers).json()
print(novaRespostaLead)
Em seguida, precisamos criar um corpo para a solicitação. Como é uma adição complexa do lead, não apenas adicionamos os dados do lead, mas também os dados do contato. Definimos idCampoTelefone
como o ID do campo personalizado do novo contato, e adicionamos telefoneContatoNovo
como seu valor.
Por fim, enviamos uma solicitação POST para adicionar o lead.
Estamos assumindo que há apenas um contato associado ao número de telefone fornecido. No entanto, se você não verificou previamente leads duplicados ou se o número de telefone está associado a uma empresa, pode haver vários contatos exibidos.
else:
respostaContatoExistente = response.json()
contatosExistentes = respostaContatoExistente["_embedded"]['contacts']
Se existir um contato com esse número, obtemos o corpo da resposta e salvamos o array de contatos como contatosExistentes
. Se houver vários contatos com o mesmo número de telefone, haverá vários objetos no array. Devido à forma como a filtragem funciona, todos os resultados relevantes para a consulta serão exibidos.
def encontreContatoDuplicado(contacts, query) -> str:
for contact in contacts:
campoCustomizadoContato = contact['custom_fields_values']
if (campoCustomizadoContato):
for campoCustomizado in campoCustomizadoContato:
values = campoCustomizado['values']
if (values):
for value in values:
data = value['value']
if (data == query):
return contact['id']
return ''
Em seguida, precisamos declarar uma função encontreContatoDuplicado
que retornará o ID do contato que encontramos.
Vamos examinar mais de perto o que ela faz.
O loop for
percorre todos os elementos do array contacts
e define apenas o array 'custom_fields_values'
do contato como uma variável campoCustomizadoContato
.
Se campoCustomizadoContato
existir e não for null
, usamos outro loop for
para percorrer todos os objetos dos campos personalizados. Se um dos valores em custom_fields_values['values']['value']
for igual à consulta que passamos para a função, a função retorna o ID do contato. Parece um pouco complicado, mas vamos revisar como é o formato de custom_fields_values
.
"custom_fields_values": [
{
"field_id": 1698052,
"field_name": "Phone",
"field_code": "PHONE",
"field_type": "multitext",
"values": [
{
"value": "+18305803077",
"enum_id": 1037745,
"enum_code": "MOB"
}
]
}
]
…e devemos voltar ao Controle Duplicado.
duplicateContactId = findDuplicateContact(existedContacts, newContactPhoneNumber)
Chamamos encontreContatoDuplicado
passamos uma lista de contatos e o número de telefone e salvamos o resultado como idContatoDuplicado
.
body = [{
'name': "Exemplo lead 1",
'_embedded': {
"contacts" : [
{
"id" : idContatoDuplicado
}
]
}
}]
respostaNovoLead = requests.post(BASE_LEAD_URL, json=body, headers=headers).json()
print(respostaNovoLead)
Em seguida, criamos o corpo da solicitação, definimos idContatoDuplicado
como o ID do contato e enviamos uma solicitação POST para adicionar o lead com um contato.
Você pode encontrar o código completo na receita Criar um Lead com um Contato com Controle de Duplicados.
Um módulo de rastreamento de ouriço (UTM) é um trecho de código adicionado a um URL com o objetivo de rastrear o desempenho de marketing online e entender melhor o comportamento do público. Esses URLs personalizados, conhecidos como códigos UTM, fornecem aos profissionais de marketing informações detalhadas sobre como uma campanha, peça de conteúdo ou canal específico está performando.
Os campos personalizados de UTM são criados automaticamente com uma conta.
Você pode encontrá-los na seção Estatísticas de um cartão de Lead.
import requests
from urllib import parse
SUBDOMINIO = ''
CHAVE_API = ''
BASE_LEAD_URL = f'https://{SUBDOMINIO}.kommo.com/api/v4/leads'
BASE_LEAD_CAMPOCUSTOMIZADO_URL = f'https://{SUBDOMINIO}.kommo.com/api/v4/leads/custom_fields'
headers = {
'Authorization': f'Bearer {CHAVE_API}',
'Content-Type': 'application/json'
}
SUBDOMINIO
é o subdomínio da sua conta.
CHAVE_API
é o Token de longa duração ou token de acesso.
BASE_LEAD_URL
será usado para adicionar leads.
BASE_LEAD_CAMPOCUSTOMIZADO_URL
será usado para obter uma lista de campos personalizados dos contatos.
UTM_URL = 'https://SEU_SITE.com/?utm_source=google&utm_medium=cpc&utm_campaign=form&utm_content=youtube&utm_term=utm'
UTM_URL
é um exemplo de uma URL que contém UTMs.
Se analisarmos, podemos aprender que o valor de utm_source
´é google
e o de utm_campaign
é form
.
Você pode usar uma ferramenta gratuita, como https://tilda.cc/utm/, para criar uma URL com UTMs.
def parseURL(url) -> dict:
return parse.parse_qs(parse.urlparse(url.lower()).query)
utms = parseURL(UTM_URL)
Primeiro, devemos definir uma função (ParseURL
) que receba uma URL como argumento e retorne um objeto.
Se você analisar a URL [UTM_URL]
, it will return {'utm_source': ['google'], 'utm_medium': ['cpc'], 'utm_campaign': ['form'], 'utm_content': ['youtube'], 'utm_term': ['utm']}
.
response = requests.get(BASE_LEAD_CAMPOCUSTOMIZADO_URL, headers=headers)
respostaLeadCampoCustomizado = response.json()
print(respostaLeadCampoCustomizado)
customFields = respostaLeadCampoCustomizado['_embedded']['custom_fields']
Enviamos uma resposta GET
para obter uma lista de campos personalizados da entidade Lead. Precisamos apenas do array de campos personalizados da resposta, então o salvamos como customFields
.
corpoLeadCampoCustomizado = []
for customField in customFields:
if (customField['type'] == 'tracking_data'):
chave = customField['code']
valorUtm = utms.get(chave.lower())
if (utmValue):
corpoLeadCampoCustomizado.append(
{
'field_id' : customField['id'],
'values' : [
{
'value' : valorUtm[0]
}
]
}
)
Utilizamos um loop FOR para criar um array de objetos chamado corpoLeadCampoCustomizado
. Vamos analisar mais de perto o que ele faz exatamente.
O loop verifica cada elemento do array de campos personalizados e determina se o tipo do campo personalizado é tracking_data
'. Se for, ele declara uma variável chave
com o valor de customField["code"]
.
Se analisarmos utms.get(key.lower())
, vemos que ele retorna um valor de uma chave utms
que é igual à variável chave
mas em letras minúsculas.
Em seguida, declara-se valorUtm
com o valor dessa chave.
Por fim, o loop adiciona ao corpoLeadCampoCustomizado
um objeto contendo umfield_id
e seu respectivo value
.
body = [{
"name": "Miguel Souza",
"status_id": 2343875,
"pipeline_id": 5347887,
"created_by": 10618939,
"responsible_user_id": 10618939,
"_embedded": {
"tags": [
{
"id": 2936577,
"name": "Grau_2"
},
{
"id": 2943611,
"name": "9anos"
}
]
},
'custom_fields_values' : corpoLeadCampoCustomizado
}]
respostaNovoLead = requests.post(BASE_LEAD_URL, json=body, headers=headers).json()
print(respostaNovoLead)
Finalmente, criamos o corpo do nosso futuro lead, onde adicionamos corpoLeadCampoCustomizado
à chave custom_fields_values
e o enviamos com a solicitação POST.
Você pode encontrar o código completo em Adicionar um lead com UTMs.

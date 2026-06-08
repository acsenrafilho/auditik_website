---
title: "Webhooks API da Kommo: Eventos CRM em Tempo Real"
source: "https://pt-developers.kommo.com/docs/webhooks"
date: "2024-09-17"
---

Os WebHooks são notificações enviadas a aplicativos de terceiros, informando sobre eventos que ocorreram na Kommo. Você pode configurar os endereços HTTP de suas aplicações e as regras de funcionamento associadas nas configurações da sua conta na seção de mercado da Kommo.
Trabalhar com WebHooks via API é possível apenas com os planos Avançado, Pro ou Empresarial.
Exemplo de cenários:
- Após uma transação bem-sucedida, você pode enviar informações sobre a transação para o seu aplicativo de contabilidade e gerar automaticamente uma fatura para pagamento.
- Você pode adicionar os e-mails de novos contatos no sistema CRM à lista de emails.
- Você pode configurar notificações por SMS sobre mudanças na sua conta.
Lista de entidades suportadas:
- Leads
- Contatos
- Empresas
- Tarefas
- Listas de elements
- Conversas
- Notas
- Lead adicionado
- Lead editado
- Lead apagado
- Lead restaurado
- Estágio (status) de Lead alterado
- Usuário responsável de Lead alterado
- Contato adicionado
- Contato editado
- Contato apagado
- Contato restaurado
- Usuário responsável de Contato alterado
- Empresa adicionada
- Empresa editada
- Empresa apagada
- Empresa restaurada
- Usuário responsável de Empresa alterado
- Tarefa adicionada
- Tarefa editada
- Tarefa apagada
- Usuário responsável da Tarefa alterado
- Lead de entrada adicionado
- Lead de entrada editado
- Lead de entrada apagado
- Mensagem de entrada recebida
- Conversa adicionada
- Conversa editada
- Nota adicionada ao Lead
- Nota adicionada ao Contato
- Nota adicionada a Empresa
- Adicionar elementos em Produtos
- Atualizar elementos em Produtos
- Apagar elementos em Produtos
Descrição de parâmetros em Configurações:
Configurar WebHooks envolve os seguintes três passos:
Vá para Configurações -> Integrações e clique em Web hooks no canto superior direito.
Insira a URL do WebHook.
Selecione os eventos que vão enviar uma notificação. Depois clique em Salvar.
- Realize a ação selecionada ao criar o WebHook
- Na sua aplicação, verifique os dados recebidos da Kommo
- Se os dados não chegaram, verifique se a URL inserida está correta e prossiga para a etapa 1
WebHook são enviados no formatox-www-form-urlencoded
para uma aplicação de terceiros, informações detalhadas sobre a entidade são descritas nas solicitações GET da seção atual.
POST Em caso de estar criando e atualizando uma entidade:
{
"entity":{
"add/update":[
{
"array of entity fields":"valores dos campos da entidade"
}
]
}
}
Em casos de apagar a entidade:
{
"entity":{
"delete":[
{
"id":"id"
}
]
}
}
{
"leads":{
"add":[
{
"id":"1111111",
"name":"Novo Lead",
"status_id":"2222222",
"price":"500",
"responsible_user_id":"3333333",
"last_modified":"1726566390",
"modified_user_id":"44444444",
"created_user_id":"44444444",
"date_create":"1726566390",
"pipeline_id":"5555555",
"account_id":"66666666",
"custom_fields":[
{
"id":"77777777",
"name":"Benefício",
"values":[
{
"value":"0"
}
]
},
{
"id":"88888888",
"name":"Texto",
"values":[
{
"value":"Texto"
}
]
},
{
"id":"9999999",
"name":"Numérico",
"values":[
{
"value":"123"
}
]
},
{
"id":"12345678",
"name":"Interruptor",
"values":[
{
"value":"1"
}
]
},
{
"id":"87654321",
"name":"Data",
"values":[
"1729717200"
]
},
{
"id":"12312312",
"name":"Moeda",
"values":[
{
"value":"200"
}
]
}
],
"created_at":"1726566390",
"updated_at":"1726566390"
}
]
}
{
"leads":{
"update":[
{
"id":"123456789",
"name":"",
"status_id":"67548615",
"old_status_id":"67548607",
"price":"1000",
"responsible_user_id":"11000000",
"last_modified":"1726567767",
"modified_user_id":"11087123",
"created_user_id":"11087123",
"date_create":"17265663a90",
"pipeline_id":"8572511",
"account_id":"12345678",
"custom_fields":[
{
"id":"1118164",
"name":"Benefício",
"values":[
{
"value":"1000"
}
]
},
{
"id":"1246483",
"name":"Texto",
"values":[
{
"value":"Texto"
}
]
},
{
"id":"1246485",
"name":"Numérico",
"values":[
{
"value":"123"
}
]
},
{
"id":"1246487",
"name":"Interruptor",
"values":[
{
"value":"1"
}
]
},
{
"id":"1246491",
"name":"Data",
"values":[
"1729717200"
]
},
{
"id":"1246493",
"name":"Moeda",
"values":[
{
"value":"200"
}
]
}
],
"created_at":"1726566390",
"updated_at":"1726567767"
}
]
}
}
{
"leads":{
"delete":[
{
"id":"12345678",
"status_id":"67548607",
"pipeline_id":"8572511"
}
]
}
}
{
"leads":{
"restore":[
{
"id":"15317715",
"name":"123",
"status_id":"67548607",
"price":"80",
"responsible_user_id":"12345678",
"last_modified":"1726572650",
"modified_user_id":"11087123",
"created_user_id":"11087123",
"date_create":"1726571070",
"pipeline_id":"8572511",
"account_id":"12345678",
"custom_fields":[
{
"id":"1118164",
"name":"Benefício",
"values":[
{
"value":"1000"
}
]
}
],
"created_at":"1726571070",
"updated_at":"1726572650"
}
]
}
}
{
"leads":{
"status":[
{
"id":"15318175",
"name":"",
"status_id":"67548619",
"old_status_id":"67548607",
"price":"1000",
"responsible_user_id":"12345678",
"last_modified":"1726572758",
"modified_user_id":"11087123",
"created_user_id":"11087123",
"date_create":"1726572752",
"pipeline_id":"8572511",
"account_id":"12345678",
"custom_fields":[
{
"id":"1118164",
"name":"Benefício",
"values":[
{
"value":"1000"
}
]
},
{
"id":"1246483",
"name":"Texto",
"values":[
{
"value":"Texto"
}
]
},
{
"id":"1246485",
"name":"Numérico",
"values":[
{
"value":"123"
}
]
},
{
"id":"1246489",
"name":"Selecionar",
"values":[
{
"value":"2",
"enum":"908107"
}
]
},
{
"id":"1246491",
"name":"Data",
"values":[
"1725915600"
]
}
],
"created_at":"1726572752",
"updated_at":"1726572758"
}
]
}
}
{
"leads":{
"responsible":[
{
"id":"15318175",
"name":"",
"status_id":"67548619",
"old_status_id":"67548607",
"price":"1000",
"responsible_user_id":"1234567",
"last_modified":"1726572882",
"modified_user_id":"11087123",
"created_user_id":"11087123",
"date_create":"1726572752",
"pipeline_id":"8572511",
"account_id":"12345678",
"custom_fields":[
{
"id":"1118164",
"name":"Benefício",
"values":[
{
"value":"1000"
}
]
},
{
"id":"1246483",
"name":"Texto",
"values":[
{
"value":"Texto"
}
]
},
{
"id":"1246485",
"name":"Numérico",
"values":[
{
"value":"123"
}
]
},
{
"id":"1246489",
"name":"Selecionar",
"values":[
{
"value":"2",
"enum":"908107"
}
]
},
{
"id":"1246491",
"name":"Data",
"values":[
"1725915600"
]
}
],
"old_responsible_user_id":"12345673",
"created_at":"1726572752",
"updated_at":"1726572882"
}
]
}
}
A aceitação e a rejeição de leads recebidos são tratadas como equivalentes à sua exclusão. Como resultado, essas ações acionarão um webhook para a exclusão do lead recebido. Você pode diferenciá-las por dois parâmetros: a ação mostrará decline se um lead recebido foi rejeitado e accept no caso de aceitação. Além disso, o parâmetro para os IDs das entidades dos leads recebidos será diferente, sendo
decline_result
ouaccept_result
.
{
"unsorted":{
"add":[
{
"uid":"4278accf80c59e99411d5c6e01e4054864ca958e594699484ba8c5f40bb1",
"category":"forms",
"source_data":{
"form_id":"1303311",
"form_type":"1",
"from":"Solicitação de site #1303311 do formulário «Formulário #1712844073»",
"form_name":"Formulário #1712844073",
"origin":{
"ip":"172.241.70.196",
"datetime":"1726573764",
"referer":"https://subdomain.kommo.com/"
},
"data":{
"name_2":{
"type":"text",
"id":"name_2",
"element_type":"2",
"name":"Nome do Lead",
"value":"Nome do Lead"
}
},
"date":"1726573764"
},
"date_create":"1726573764",
"data":{
"leads":[
{
"last_modified":"1726573765",
"name":"Nome do Lead",
"pipeline_id":"XXXXXXXX",
"modified_user_id":"0",
"date_create":"1726573764",
"custom_fields":[
{
"id":"XXXXXX",
"code":"REFERRER",
"values":[
{
"value":"https://subdomain.kommo.com/"
}
]
}
],
"visitor_uid":"XXXXXXXX-408f-46ef-8482-50e4950f78b1",
"source_id":"XXXXXX",
"gso_session_uid":"null",
"form_request_id":"AFyd4deuQF"
}
]
},
"pipeline_id":"XXXXXX",
"account_id":"XXXXXXX",
"request_id":"0",
"source_id":"XXXX",
"lead_id":"XXXXXX",
"created_at":"1726573764"
}
]
}
}
{
"unsorted": {
"update": [
{
"uid": "40789acb990dbb9754dc234e18d2325470612b2284880504d78f258d8f77",
"category": "forms",
"account_id": "1312313",
"user_id": "123123",
"source": "Solicitação do site nº 441310 pelo formulário <<Formulário #1548921297>>",
"pipeline_id": "142141",
"source_data": {
"form_id": "243222",
"form_type": "1",
"date": "156232405",
"from": "Solicitação do site nº 441310 pelo formulário <<Formulário #1548921297>>",
"form_name": "Site",
"date": "1567619168",
"source_uid": "232323",
"source": "2423424",
"uid": "24242432",
"origin": {
"ip": "12.123.123.12",
"referer": "https://test.kommo.com/settings/pipeline/leads/1541752",
"visitor_uid": "202273f9-03cc-42b5-aa4d-71e2ead59ec4",
"datetime": "1567619168"
}
},
"data": {
"leads": [
{
"id": "24242432",
"status_id": "424232222",
"pipeline_id": "4353222",
"name": "Lead",
"created_user_id": "0",
"date_create": "156760055"
}
],
"pipeline_id": "4353222",
"source": "2423424",
"source_uid": "232323",
"created_at": "156760055"
}
}
]
},
"account": {
"subdomain": "test",
"id": "1312313",
"_links": {
"self": "https://test.kommo.com"
}
}
}
//lead aceito
{
"unsorted":{
"delete":[
{
"action":"accept",
"uid":"f575b754b0d1eb1c380e53d6821ffd2820a6dfbe3822de0cfddaf266980f",
"accept_result":{
"leads":[
"15258873"
]
},
"category":"mail",
"created_at":"1726392264",
"modified_user_id":"11087123"
}
]
}
}
//lead recusado
{
"unsorted":{
"delete":[
{
"action":"decline",
"decline_result":{
"leads":[
"15270337"
]
},
"uid":"f575b754b0d1eb1c380e457edeba88954891f3dce5d2fe1324fd3e2af58d",
"category":"mail",
"created_at":"1726426986",
"modified_user_id":"11087123"
}
]
}
}
Ao criar e excluir entidades de contato ou empresa, para evitar problemas de compatibilidade retroativa, existe uma chave type que indica de qual entidade o webhook se originou.
{
"contacts":{
"add":[
{
"id":"XXXXXXXX",
"name":"Nome do Contato",
"responsible_user_id":"XXXXXXX",
"date_create":"1726573127",
"last_modified":"1726573127",
"created_user_id":"XXXXXXX",
"modified_user_id":"XXXXXX",
"account_id":"XXXXXXX",
"custom_fields":[
{
"id":"XXXXXXX",
"name":"Telefone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
},
{
"id":"782386",
"name":"Data de Nascimento",
"values":[
{
"value":"12.01.1980"
}
]
},
{
"id":"791668",
"name":"Bio",
"values":[
{
"value":"Texto"
}
]
},
{
"id":"791730",
"name":"Qualquer botão de opção",
"values":{
"value":"2",
"enum":"566642"
}
}
],
"created_at":"1726573127",
"updated_at":"1726573127",
"type":"contact"
}
]
}
}
{
"contacts":{
"update":[
{
"id":"17611273",
"name":"Nome do Contato",
"responsible_user_id":"11087123",
"date_create":"1726573127",
"last_modified":"1726573130",
"created_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Telefone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
},
{
"id":"782386",
"name":"Data de Nascimento",
"values":[
{
"value":"12.01.1980"
}
]
},
{
"id":"791668",
"name":"Bio",
"values":[
{
"value":"Texto"
}
]
},
{
"id":"791730",
"name":"Qualquer botão de opção",
"values":{
"value":"2",
"enum":"566642"
}
}
],
"created_at":"1726573127",
"updated_at":"1726573130",
"type":"contact"
}
]
}
}
{
"contacts":{
"delete":[
{
"id":"17611273",
"type":"contact"
}
]
}
}
{
"contacts":{
"restore":[
{
"id":"17611273",
"name":"Contact Name",
"responsible_user_id":"11087123",
"date_create":"1726573127",
"last_modified":"1726573264",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Telefone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
},
{
"id":"782386",
"name":"Birthday",
"values":[
{
"value":"12.01.1980"
}
]
},
{
"id":"791668",
"name":"Bio",
"values":[
{
"value":"Text"
}
]
},
{
"id":"791730",
"name":"Any radiobutton",
"values":{
"value":"2",
"enum":"566642"
}
}
],
"created_at":"1726573127",
"updated_at":"1726573264",
"type":"contact"
}
]
}
}
{
"contacts":{
"update":[
{
"id":"17611273",
"name":"Nome do Contato",
"responsible_user_id":"11940747",
"date_create":"1726573127",
"last_modified":"1726573326",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Telefone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
},
{
"id":"782386",
"name":"Data de Nascimento",
"values":[
{
"value":"12.01.1980"
}
]
},
{
"id":"791668",
"name":"Bio",
"values":[
{
"value":"Texto"
}
]
},
{
"id":"791730",
"name":"Qualquer botão de opção",
"values":{
"value":"2",
"enum":"566642"
}
}
],
"old_responsible_user_id":"11087123",
"created_at":"1726573127",
"updated_at":"1726573326",
"type":"contact"
}
]
}
}
{
"contacts":{
"add":[
{
"id":"17612521",
"name":"Nome da Empresa",
"responsible_user_id":"11087123",
"date_create":"1726576533",
"last_modified":"1726576534",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"linked_leads_id":{
"15319601":{
"ID":"15319601"
}
},
"created_at":"1726576533",
"updated_at":"1726576534",
"type":"company"
}
]
}
}
{
"contacts":{
"update":[
{
"id":"17612521",
"name":"Nome da Empresa não especificado",
"responsible_user_id":"11087123",
"date_create":"1726576533",
"last_modified":"1726576634",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Telefone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
}
],
"linked_leads_id":{
"15319601":{
"ID":"15319601"
}
},
"created_at":"1726576533",
"updated_at":"1726576634",
"type":"company"
}
]
}
}
{
"contacts":{
"delete":[
{
"id":"17612521",
"type":"company"
}
]
}
}
{
"contacts":{
"restore":[
{
"id":"17612521",
"name":"Nome da Empresa não especificado",
"responsible_user_id":"11087123",
"date_create":"1726576533",
"last_modified":"1726576937",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Telefone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
}
],
"linked_leads_id":{
"15319601":{
"ID":"15319601"
}
},
"created_at":"1726576533",
"updated_at":"1726576937",
"type":"company"
}
]
}
}
{
"contacts":{
"update":[
{
"id":"17612521",
"name":"Nome da Empresa não especificado",
"responsible_user_id":"11940747",
"date_create":"1726576533",
"last_modified":"1726576988",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Telefone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
}
],
"linked_leads_id":{
"15319601":{
"ID":"15319601"
}
},
"old_responsible_user_id":"11087123",
"created_at":"1726576533",
"updated_at":"1726576988",
"type":"company"
}
]
}
}
{
"task":{
"add":[
{
"id":"1564671",
"element_id":"15320411",
"element_type":"2",
"task_type":"1",
"date_create":"2024-09-17 13:07:29",
"text":"Texto da tarefa",
"status":"0",
"account_id":"32720107",
"created_user_id":"11087123",
"last_modified":"2024-09-17 13:07:29",
"responsible_user_id":"11087123",
"complete_till":"2025-10-02 20:59:00",
"created_at":"1726578449",
"updated_at":"1726578449",
"complete_before":"1759438740"
}
]
}
}
//editar tarefa (texto)
{
"task":{
"update":[
{
"id":"1502517",
"element_id":"14791277",
"element_type":"2",
"task_type":"1",
"date_create":"2024-09-04 16:00:13",
"text":"texto da tarefa editado",
"status":"0",
"account_id":"32720107",
"created_user_id":"11087123",
"last_modified":"2024-09-17 13:11:20",
"responsible_user_id":"11087123",
"complete_till":"2025-09-04 20:59:00",
"action_close":"0",
"old_text":"texto da tarefa",
"created_at":"1725465613",
"updated_at":"1726578680",
"complete_before":"1757019540"
}
]
}
}
//lista de tarefas complaeta
{
"task":{
"update":[
{
"id":"1564845",
"element_id":"15320411",
"element_type":"2",
"task_type":"1",
"date_create":"2024-09-17 13:20:25",
"text":"texto",
"status":"1",
"account_id":"32720107",
"created_user_id":"11087123",
"last_modified":"2024-09-17 13:21:09",
"responsible_user_id":"11087123",
"complete_till":"2024-10-23 20:59:00",
"action_close":"1",
"old_text":"texto",
"created_at":"1726579225",
"updated_at":"1726579269",
"complete_before":"1729717140"
}
]
}
}
//resultado adicionado (quando completado pelo calendário)
{
"task":{
"update":[
{
"id":"1564835",
"element_id":"17612485",
"element_type":"3",
"task_type":"2",
"date_create":"2024-09-17 13:18:58",
"text":"teste",
"status":"1",
"account_id":"32720107",
"created_user_id":"0",
"last_modified":"2024-09-17 13:29:18",
"responsible_user_id":"11087123",
"complete_till":"2024-09-17 13:18:57",
"action_close":"0",
"result":{
"id":"4600307",
"text":"cliente respondeu"
},
"created_at":"1726579138",
"updated_at":"1726579758",
"complete_before":"1726579137"
}
]
}
}
{
"task":{
"delete":[
{
"id":"1564885"
}
]
}
}
{
"task":{
"update":[
{
"id":"1564917",
"element_id":"15320411",
"element_type":"2",
"task_type":"1",
"date_create":"2024-09-17 13:27:53",
"text":"text",
"status":"0",
"account_id":"32720107",
"created_user_id":"11087123",
"last_modified":"2024-09-17 13:28:01",
"responsible_user_id":"11940747",
"complete_till":"2025-09-17 20:59:00",
"action_close":"0",
"old_text":"text",
"main_user":"11940747",
"modified_by":"11087123",
"old_responsible_user_id":"11087123",
"created_at":"1726579673",
"updated_at":"1726579681",
"complete_before":"1758142740"
}
]
}
}
Se houver um arquivo de mídia em uma nota, você receberá 2 webhooks: 1 para o texto e 1 para o arquivo de mídia.
//texto da nota
{
"leads":{
"note":[
{
"note":{
"text":"texto da nota",
"attachement":"",
"date_create":"2024-09-17 16:38:11",
"note_type":"4",
"element_type":"2",
"element_id":"15320411",
"catalog_id":"0",
"group_id":"0",
"timestamp_x":"2024-09-17 16:38:49",
"account_id":"32720107",
"metadata":"{\"event_source\":{\"id\":11087123,\"author_name\":\"Jean Pierre\",\"type\":1}}",
"created_by":"11087123",
"modified_by":"11087123",
"main_user_id":"11087123",
"id":"4600471",
"created_at":"1726580291",
"updated_at":"1726580329"
}
}
]
}
}
//arquivo de mídia
{
"leads":{
"note":[
{
"note":{
"text":"foto.jpg",
"note_type":"5",
"date_create":"2024-09-17 16:39:32",
"element_type":"2",
"element_id":"15320411",
"catalog_id":"0",
"group_id":"0",
"attachement":"drive/528f59ad-6f5b-4738-b6d2-bb707aee9511/e433243c-e55e-4d16-b625-65a2bd8d3a44/Skrinshot_17-09-2024_153156.jpg",
"timestamp_x":"2024-09-17 16:40:09",
"account_id":"32720107",
"metadata":"{\"event_source\":{\"id\":11111111,\"author_name\":\"Danny Potter\",\"type\":1}}",
"created_by":"11087123",
"modified_by":"11087123",
"main_user_id":"11087123",
"id":"4600505",
"created_at":"1726580372",
"updated_at":"1726580409"
}
}
]
}
}
{
"contacts":{
"note":[
{
"note":{
"text":"texto",
"attachement":"",
"date_create":"2024-09-17 16:43:34",
"note_type":"4",
"element_type":"1",
"element_id":"17614247",
"catalog_id":"0",
"group_id":"0",
"timestamp_x":"2024-09-17 16:44:11",
"account_id":"32720107",
"metadata":"{\"event_source\":{\"id\":111111111,\"author_name\":\"Samantha Potter\",\"type\":1}}",
"created_by":"11087123",
"modified_by":"11087123",
"main_user_id":"11087123",
"id":"4600607",
"created_at":"1726580614",
"updated_at":"1726580651"
},
"type":"contact"
}
]
}
}
{
"contacts":{
"note":[
{
"note":{
"text":"texto da nota",
"attachement":"",
"date_create":"2024-09-17 16:44:13",
"note_type":"4",
"element_type":"3",
"element_id":"17614267",
"catalog_id":"0",
"group_id":"0",
"timestamp_x":"2024-09-17 16:44:49",
"account_id":"32720107",
"metadata":"{\"event_source\":{\"id\":2222222,\"author_name\":\"Gloria Potter\",\"type\":1}}",
"created_by":"11087123",
"modified_by":"11087123",
"main_user_id":"11087123",
"id":"4600623",
"created_at":"1726580653",
"updated_at":"1726580689"
},
"type":"company"
}
]
}
}
{
"catalogs":{
"add":[
{
"id":"347577",
"date_create":"1726580883",
"date_modify":"1726580883",
"created_by":"11087123",
"modified_by":"11087123",
"catalog_id":"32908",
"name":"Item 1",
"deleted":"0",
"custom_fields":[
{
"id":"771934",
"name":"SKU",
"values":[
{
"value":"1234567534efgd"
}
],
"code":"SKU"
},
{
"id":"771938",
"name":"Preço",
"values":[
{
"value":"100"
}
],
"code":"PRICE"
},
{
"id":"771936",
"name":"Descrição",
"values":[
{
"value":"texto da descrição"
}
],
"code":"DESCRIPTION"
},
{
"id":"771944",
"name":"Unidade",
"values":[
{
"value":"kg",
"enum":"552500"
}
],
"code":"UNIT"
},
{
"id":"771946",
"name":"Preço especial 1",
"values":[
{
"value":"80"
}
],
"code":"SPECIAL_PRICE_1"
},
{
"id":"771948",
"name":"Preço cheio",
"values":[
{
"value":"50"
}
],
"code":"WHOLESALE_PRICE"
}
],
"created_at":"1726580883",
"updated_at":"1726580883",
"type":"catalog"
}
]
}
}
{
"catalogs":{
"update":[
{
"id":"347577",
"date_create":"1726580883",
"date_modify":"1726580962",
"created_by":"11087123",
"modified_by":"11087123",
"catalog_id":"32908",
"name":"Item 1",
"deleted":"0",
"custom_fields":[
{
"id":"771934",
"name":"SKU",
"values":[
{
"value":"1234567534efgd"
}
],
"code":"SKU"
},
{
"id":"771938",
"name":"Preço",
"values":[
{
"value":"1000"
}
],
"code":"PRICE"
},
{
"id":"771936",
"name":"Descrição",
"values":[
{
"value":"edição do texto de descrição"
}
],
"code":"DESCRIPTION"
},
{
"id":"771944",
"name":"Unidade",
"values":[
{
"value":"kg",
"enum":"552500"
}
],
"code":"UNIT"
},
{
"id":"771946",
"name":"Preço especial 1",
"values":[
{
"value":"800"
}
],
"code":"SPECIAL_PRICE_1"
},
{
"id":"771948",
"name":"Preço cheio",
"values":[
{
"value":"500"
}
],
"code":"WHOLESALE_PRICE"
}
],
"created_at":"1726580883",
"updated_at":"1726580962",
"type":"catalog"
}
]
}
}
{
"catalogs":{
"delete":[
{
"id":"347577",
"catalog_id":"32908",
"type":"catalog"
}
]
}
}
{
"message":{
"add":[
{
"id":"660b5b93-4ead-ac38-3797c062146c",
"chat_id":"33b41601-443b-9108-6938ae6b7935",
"talk_id":"191",
"contact_id":"11018118",
"text":"Olá!",
"created_at":"1726581295",
"element_type":"2",
"entity_type":"lead",
"element_id":"9276114",
"entity_id":"9276114",
"type":"incoming",
"author":{
"id":"e1ec058c-7efb-4b59-24b1bcesdf3168f6",
"type":"external",
"name":"nome de usuário",
"avatar_url":"https://amojo.kommo.com/attachments/profiles/a6c9-24b1bc7368f6/file-0_128x128.jpg"
},
"origin":"telegram"
}
]
}
}
{
"talk":{
"add":[
{
"talk_id":"191",
"created_at":"1726581298",
"updated_at":"1726581298",
"rate":"0",
"contact_id":"11018118",
"chat_id":"33b41601-7ed1-333ff2-9108-6938ae6b7935",
"entity_id":"9276114",
"entity_type":"lead",
"is_in_work":"1",
"is_read":"0",
"origin":"telegram"
}
]
}
}
//marcar como respondida
{
"talk":{
"update":[
{
"talk_id":"191",
"created_at":"1726581298",
"updated_at":"1726581487",
"rate":"0",
"contact_id":"11018118",
"chat_id":"33b41601-7ed1-443b-9108-6938ae6b7935",
"entity_id":"9276114",
"entity_type":"lead",
"is_in_work":"1",
"is_read":"1",
"origin":"telegram"
}
]
}
}
//fechar conversa
{
"talk":{
"update":[
{
"talk_id":"191",
"created_at":"1726581298",
"updated_at":"1726581548",
"rate":"0",
"contact_id":"11018118",
"chat_id":"33b41601-7ed1-443b-9108-6938ae6b7935",
"entity_id":"9276114",
"entity_type":"lead",
"is_in_work":"0",
"is_read":"1",
"origin":"telegram"
}
]
}
}
Nosso serviço espera uma resposta do webhook dentro de 2 segundos. Se não recebermos uma resposta dentro desse tempo ou se o código de resposta não for bem-sucedido (código HTTP não estiver entre 100 e 299), consideramos o webhook não entregue e a resposta inválida.
Seu webhook pode ser desativado sob a seguinte condição:
- Se mais de 100 respostas inválidas forem recebidas nas últimas 2 horas, e o último webhook no momento da verificação também for inválido.
No caso de bloqueio de IP, o webhook será desativado por motivos de segurança. Você pode reativá-lo nas configurações clicando no botão Salvar e, em seguida, salvando as alterações. Os administradores da conta também receberão uma notificação no centro de notificações sobre a desativação do webhook.
Ao enviar uma solicitação, a informação é considerada aceita se o cabeçalho de resposta HTTP retornar um código entre 100 e 299, de acordo com a tabela de códigos de status de w3.org.
A primeira tentativa é feita imediatamente após a ação selecionada ser realizada. Se a tentativa não for bem-sucedida, uma nova tentativa ocorrerá de acordo com as regras descritas na tabela abaixo.

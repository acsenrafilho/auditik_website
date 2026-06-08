---
title: "Webhooks no Pipeline Digital Kommo: Eventos e Integração em Tempo Real"
source: "https://pt-developers.kommo.com/docs/webhooks-no-pipeline-digital"
date: "2026-04-06"
---

Webhooks são notificações enviadas para aplicativos de terceiros para informar sobre eventos que ocorreram na Kommo. Você pode configurar os endereços HTTP dos seus aplicativos e as regras associadas nas configurações do pipeline digital da Kommo.
Mais informações sobre esta tecnologia podem ser encontradas na seção WebHooks REST API . Embora a tecnologia de Webhooks no pipeline digital seja semelhante à usada nas configurações da conta (Configurações ➡ Integrações ➡ Web hooks), há algumas diferenças.
- Primeiro, a lista de eventos para os quais notificações são enviadas é mais limitada.
- Segundo, lógica de repetição de tentativas. Se uma resposta inválida for recebida, o sistema fará até 4 tentativas de entrega dentro de um período de uma hora. Novas tentativas podem ser desabilitadas temporariamente para endereços específicos uma vez que se encaixem com a seguinte condição: Caso sejam recebidas mais de 100 respostas inválidas do endereço da requisição dentro dos últimos 5 minutos. Quando o limite é excedido, o sistema suspende novas tentativas por 5 minutos, começando à partir do momento em que o limite é alcançado. Após o término desse período, o mecanismo de repetição de tentativas volta a funcionar automaticamente.
Lista de eventos possíveis:
- E-mail recebido
- Chamada recebida
- Mensagem de chat recebida
- Visita ao site
- Mudança de etapa
Acesse o Pipeline Digital (Leads ➡ Automatize no canto superior direito) e selecione adicionar uma ação automática para todos os negócios na etapa desejada.
Depois escolha API: + Enviar um webhook.
Selecione o evento que será o gatilho do webhook.
Insira a URL para a qual o webhook será enviado.
O webhook envia uma solicitação POST para o aplicativo de terceiros contendo uma variável com o seguinte formato: {"lead":{"event":{entity fields array}}}
.
Evento de e-mail recebido:
{
"leads": {
"mail_in": {[
"id": XXXXXXX,
"pipeline_id": 1111XXX,
"status_id": 2222XXX
]}
}
}
Evento de mudança para outra etapa:
{
"leads": {
"status": {[
"id": XXXXXXX,
"old_pipeline_id": 123XXX,
"pipeline_id": 321XXXX,
"old_status_id": 567XXXX
"status_id": 765XXXX
]}
}
}

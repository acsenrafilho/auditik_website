---
title: "Localizações do Widget Kommo: Guide para Manifest.json & Áreas de Conexão"
source: "https://pt-developers.kommo.com/docs/localiza%C3%A7%C3%B5es-do-widget"
date: "2026-02-19"
---

O processo de conexão de widgets envolve a habilitação dos scripts JavaScript do widget em páginas (interfaces) específicas do Kommo. Por padrão, os widgets não são conectados em todas as interfaces, mas apenas nas áreas solicitadas.
Para habilitar a funcionalidade de um widget, nosso sistema precisa ser informado sobre as áreas onde o widget irá operar e onde ele usará o painel à direita da tela.
Para fazer isso, você precisa listar as áreas necessárias no bloco locations
do arquivo manifest.json e indicar o uso do painel do widget, configurando 1 ou 0 como parâmetro. Configurar o indicador para 1 exibirá o widget no painel à direita de um cartão. Por outro lado, configurá-lo para 0 inicializará o widget no cartão, mas não o exibirá no painel à direita.
A área
everywhere
não aceita o parâmetro 1/0, e ela sempre é configurada como 0 para essa área.
Por exemplo, este widget será inicializado na página de configurações, nas configurações do pipeline digital, nas fontes de leads, na página de configurações avançadas, e nas cartões e listas de contatos e leads, mas o painel direito será usado apenas nos cartões especificados:
"locations":[
"lcard-1",
"llist-0",
"ccard-1",
"clist-0",
"comcard-0",
"card_sdk",
"settings",
"digital_pipeline",
"lead_sources",
"catalogs",
"advanced_settings",
"ai_agent"
]
Quando você conecta um widget a qualquer interface, o script JS será carregado, e a função de callback render()
será acionada, seguida por init()
e bind_actions()
.
Você pode controlar a capacidade de chamar as funções init()
e bind_actions()
toda vez que o usuário se mover de uma área para outra, especificando true ou false no bloco init_once
do arquivo manifest.json. Por exemplo, idgets de VoIP devem manter constantemente uma conexão WebSocket e não devem ser interrompidos, portanto, o init_once
deve ser configurado como true. Se não houver um contexto comum para todas as páginas, é melhor definir como false.
Quando você estiver lidando com as áreas de lista, observe que o widget não será adicionado automaticamente à interface. Primeiro, a lista aparecerá e, uma vez que você selecione pelo menos uma linha da lista usando as caixas de seleção, o menu de contexto aparecerá. Em seguida, escolha a ação do widget no botão Mais. O painel do widget no extremo direito da interface da lista, com o seu widget, será adicionado à página pelo evento selecionado, o qual acionará a função de callback correspondente no script.js.
Para garantir que o widget funcione no pipeline digital, você precisa especificar o digital_pipeline
nas localizações. A parte em Python do widget com o endpoint digital_pipeline
também é necessária, assim como o logo logo_dp.png com uma resolução de 174×109.
Se o seu widget tiver um escopo lead_sources
você pode verificar a qual pipeline da conta ele está vinculado usando a requisição HTTP:
GET https://subdomain.kommo.com/api/v4/widgets/{widget_code}
A resposta de tal requisição mostrará o pipeline_id
, ou então você pode obter essa informação no script.js do seu widget.
Para trabalhar com o SDK de listas, você precisa especificar um escopo especial "catalogs"
, o ID da lista com a qual o widget irá trabalhar e também implementar um callback especial loadCatalogElement
.
Os widgets do Kommo podem criar sua própria página na seção de Configurações. Para fazer isso, você precisa especificar o escopo advanced_settings na lista de "location"
e também adicionar o bloco “advanced” no arquivo manifest.json, além de implementar um callback especial chamado advancedSettings
.
O widget terá controle total sobre essa página e deverá formar as páginas do DOM e sua estrutura. O bloco "advanced"
no manifest.json deve conter o título da página de configurações.
Introdução
Se o seu widget foi projetado para funcionar com o agente de IA da Kommo, agora você pode exibi-lo no bloco de configurações do agente de IA. Para isso, serão necessárias pequenas alterações em manifest.json, além de adicionar a descrição apropriada às localizações.
Atualize manifest.json
Para conectar o widget à interface do agente de IA, você precisa especificar uma nova localidade ai_agent
em manifest.json
:
"locais": [ "ai_agent" ]
Especificar a localidade ai_agent
permite exibir o widget dentro do bloco de configurações do agente de IA. Lá, você pode dar uma olhada na funcionalidade de integração e ativá-la, se necessário.
Você pode especificar
ai_agent
simultaneamente com outros valores em location se o widget suportar múltiplas zonas de conexão.
Atualizando arquivos de idioma
Para exibir corretamente a descrição do widget, você precisa adicionar a chave widget.ai_agent_description
a cada arquivo de localização localizado na pasta i18n. Exemplo para inglês (i18n/en.json
) para o restante, por analogia:
"widget": {
"name": "Minha integração de IA",
"description": "Descrição completa para informações gerais do widget",
"ai_agent_description": "Breve descrição do bloco para configurações do Agente de IA }
A descrição da chave widget.ai_agent_description
será exibida diretamente na aba do widget, na seção Agente de IA, e deve ser curta e concisa. O conteúdo que não couber no bloco será truncado com reticências. O comprimento recomendado para widget.ai_agent_description
é de 100 caracteres.
Importante: Se você usar a localidade
ai_agent
, deverá adicionar a chavewidget.ai_agent_description
a todos os arquivosi18n
. O valor da chave não pode estar vazio.
Exemplo
{ ... "locations": [
"ai_agent",
"settings"
], ...
}
{
"widget": {
"name": "Meu widget de IA",
"ai_agent_description": "Integração com um serviço de IA externo"
}
}
Agora você pode adaptar facilmente suas integrações à interface do agente de IA na Kommo. Isso permitirá que os usuários encontrem e conectem rapidamente as soluções necessárias diretamente no contexto da automação e da lógica de IA.

---
title: "manifest.json"
source: "https://pt-developers.kommo.com/docs/manifestjson"
date: "2026-02-19"
---

É um dos **requisitos** ao criar o widget. É um arquivo formatado em JSON que fornece metadados associados ao widget. Este arquivo inclui o nome do widget, descrição, imagens, versão, arquivos de idioma e diferentes tipos de configurações.

# Exemplo do arquivo manifest.json

JSON

```
{
"widget": {
"name": "widget.name",
"description": "widget.description",
"short_description": "widget.short_description",
"version": "1.0.1",
"interface_version": 2,
"init_once": true,
"locale": [
"en",
"es"
],
"installation": true,
"support": {
"link": "https://www.kommo.com",
"email": "[email protected]"
}
},
"locations": [
"ccard-1",
"clist-0",
"lcard-1",
"llist-0",
"settings",
"digital_pipeline",
"advanced_settings",
"salesbot_designer",
"sms",
"mobile_card"
],
"tour": {
"is_tour": true,
"tour_images": {
"en": [
"/images/tour_1_en.png",
"/images/tour_2_en.png",
"/images/tour_3_en.png"
],
"pt": [
"/images/tour_1_pt.png",
"/images/tour_2_pt.png",
"/images/tour_3_pt.png"
]
},
"tour_description": "widget.tour_description"
},
"settings": {
"login": {
"name": "settings.login",
"type": "text",
"required": true
},
"api_key": {
"name": "settings.api_key",
"type": "text",
"required": true
},
"account": {
"name": "settings.account",
"type": "text",
"required": true
}
},
"dp": {
"settings": {
"message": {
"name": "dp.message",
"type": "text",
"required": true
}
},
"action_multiple": false,
"webhook_url": "https://example.com/webhook"
},
"advanced": {
"title": "advanced.title"
},
"salesbot_designer": {
"handler_code": {
"name": "salesbot.handler_name",
"settings": {
"button_title": {
"name": "salesbot.button_title",
"type": "text",
"default_value": "salesbot.button_title_default_value",
"manual": true
},
"button_caption": {
"name": "salesbot.button_caption",
"type": "text",
"default_value": "salesbot.button_caption_default_value",
"manual": true
},
"text": {
"name": "salesbot.text",
"type": "text"
},
"number": {
"name": "salesbot.number",
"type": "numeric"
},
"url": {
"name": "salesbot.url",
"type": "url"
}
}
}
},
"sms": {
"endpoint": "https://example.com/sms_endpoint"
},
"mobile": {
"frame_url": "https://example.com/",
"color": "#ffff00"
}
}
```

> 📘
>
> Se o widget for desenvolvido para uso em múltiplas línguas, os arquivos correspondentes na pasta [i18n](https://desenvolvedores-kommo.readme.io/docs/i18n) devem conter valores no formato `"widget.name"`, `"widget.description"`, `"advanced.title"`, etc.

# Propriedades do arquivo manifest.json

As propriedades deste arquivo estão nesta tabela

| Parâmetro | Obrigatório? | Tipo de dado | Descrição |
| --- | --- | --- | --- |
| widget | ✅ | obj | Este bloco contém todas as configurações básicas do widget. |
| widget/name | ✅ | string | O nome do widget a ser incluído na lista de widgets. O valor`"widget.name"`significa que ele será retirado do arquivo correspondente na pasta **i18n**, dependendo da [localização](https://desenvolvedores-kommo.readme.io/docs/i18n).  *Se o widget for enviado para uma integração pública, o nome especificado na integração será utilizado, mas o campo ainda é obrigatório.* |
| widget/description | ✅ | string | A descrição do widget pode ser encontrada na janela de configurações do widget. Ela deve conter o caminho para a tradução nos arquivos de idioma. Você pode usar tags HTML e tags curtas especiais para criar uma descrição personalizada. Por exemplo, se você precisar mostrar o subdomínio da conta Kommo na qual o usuário trabalha, pode usar a tag **#SUBDOMAIN#**.  Aqui está uma lista de tags disponíveis:   - \*#HOST#\*\* mostra o host atual; - \*#SUBDOMAIN#\*\* mostra o subdomínio da conta; - \*#LOGIN#\*\* exibe o login do usuário autorizado atual; - \*#ACCOUNT\_ID#\*\* exibe o ID da conta atual no sistema; - \*#USER\_ID#\*\* exibe o ID do usuário atual no sistema; - \*#TOP*LEVEL\_DOMAIN#\*\* exibe o domínio de nível superior (com).    \_Se o widget for carregado para uma integração pública, a descrição especificada na integração será usada. No entanto, este campo ainda é obrigatório.* |
| widget/short\_description | ✅ | string | Uma breve descrição da funcionalidade do widget será exibida no lado esquerdo da janela modal. |
| widget/version | ❌ | string | O campo de versão do widget é para fins informativos e deve ser atualizado toda vez que você carregar o arquivo do widget para garantir que os arquivos no sistema estejam atualizados. |
| widget/interface\_version | ✅ | int | O campo da versão da interface especifica a versão carregada do widget na interface do sistema e deve ser definida como **2**. |
| widget/init\_once | ❌ | bool | O campo `widget/init_once` controla a capacidade de chamar as funções `init()` e `bind_actions()` uma vez por sessão. Definir como **true** ou **false** depende da funcionalidade do widget. Por exemplo, widgets de VoIP mantêm a conexão WebSocket constante, portanto,`widget/init_once` deve ser definido como **true**. Se não houver um contexto comum para todas as páginas, é melhor definir o valor como**false**. |
| widget/locale | ✅ | array | Para permitir que o widget esteja disponível em vários idiomas, deve-se fornecer um array de códigos de idiomas, e cada código de idioma deve corresponder a um arquivo de tradução na pasta [i18n](https://desenvolvedores-kommo.readme.io/docs/i18n) folder. As opções de idiomas disponíveis são Inglês (**`en`**), Espanhol (**`es`**), Português (**`pt`**), Turco (**`tr`**) e Indonésio (**`id`**).  *Ao publicar um widget no Kommo Marketplace, os arquivos de idioma devem corresponder aos idiomas preenchidos na integração. Além disso, você deve fornecer suporte nos idiomas disponíveis. Você pode usar temporariamente as versões de arquivos de idioma*\*`en`\*\*”e o suporte em inglês para os novos locais **`id`** e **`tr`**. É importante traduzir sua integração e fornecer suporte no idioma desejado dentro de 6 meses.\* |
| widget/installation | ✅ | bool | A opção “settings” para o widget pode ser definida como **true** ou **false**. Se definida como **true**, as configurações aparecerão durante a instalação. Se definida como **false**, o widget aparecerá apenas na lista de widgets, sem solicitar configurações ou instalações. Isso geralmente ocorre quando todas as configurações são gerenciadas em outro sistema que interage com o Kommo via API. |
| widget/support | ❌ | obj | Um conjunto das informações de suporte do widget. |
| support/link | ❌ | string | Você deve fornecer um link válido e funcional para o site de suporte da integração. |
| support/email | ❌ | string | Se um link para o site de suporte da integração não estiver disponível, você deve fornecer um e-mail de suporte técnico. |
| locations | ✅ | array | O widget deve ser exibido em interfaces específicas. Para usar a parte JavaScript do widget, você deve preencher um array com as [áreas](https://desenvolvedores-kommo.readme.io/docs/localiza%C3%A7%C3%B5es-do-widget) relevantes. |
| tour | ✅ | obj | Uma coleção de imagens está disponível para demonstrar a funcionalidade do widget. |
| tour/is\_tour | ✅ | bool | Indica se um tour está incluído para o widget. Aceita somente o valor `true` |
| tour/tour\_images | ❌ | obj | Um conjunto contém chaves de localização para as imagens do tour. |
| tour/tour\_images/{lang} | ❌ | array | Um array conterá o caminho para as imagens relacionadas ao tour, dependendo da localização do widget. |
| tour/tour\_description | ❌ | string | Além disso, um texto breve será exibido quando o tour do widget for mostrado. Se você definir este valor como "widget.tour\_description"`, será exibida uma descrição que segue a localização definida. |
| [settings](https://desenvolvedores-kommo.readme.io/docs/tipos-de-campos-de-configura%C3%A7%C3%A3o) | ✅ | obj | O usuário pode acessar uma série de configurações do widget. Esses campos de configurações aparecerão na janela de configurações do widget e serão preenchidos pelo usuário. Esta seção é obrigatória apenas se `"installation"` for **true**. Se`"installation"` for **false**, essa seção não será necessária, pois a descrição do widget será exibida na janela de configurações. A chave no array é o código do campo (`"FIELD_CODE"`). |
| settings/{FIELD\_CODE}/name | ❌ | string | O nome do campo será apenas um link para o elemento no arquivo de idioma. |
| settings/{FIELD\_CODE}/type | ❌ | string | [Tipo de campo](https://desenvolvedores-kommo.readme.io/docs/tipos-de-campos-de-configura%C3%A7%C3%A3o): As opções são `"text"`, `"pass"`, `"users"`, `"users_lp"`, e `"custom"`. |
| settings/{FIELD\_CODE}/required | ❌ | bool | Indica se o campo deve ser preenchido pelo usuário |
| dp | ❌ | obj | Configuração de Widgets de Bloco no Pipeline Digital. Este bloco deve ser incluído em **manifest.json** só se `'digital_pipeline'` for aplicável. |
| dp/settings | ❌ | obj | Parecido com o bloco **Settings** é exibido ao ajustar o widget no pipeline digital. |
| dp/settings/action\_multiple | ❌ (but if you add dp, it's required) | bool | Campo obrigatório no bloco do pipeline digital, valores. (**true/false**), determina se a ação do widget pode ser estendida para várias etapas. |
| advanced/title | ❌ | string | Se o widget oferece uma página de configurações avançadas na conta a seção **Settings** , este campo estará no título da página.  Se o valor do campo for `"advanced.title"` então o valor será retirado dos arquivos de [localização](https://desenvolvedores-kommo.readme.io/docs/i18n). |
| salesbot\_designer | ❌ | obj | Parâmetros para adicionar um widget no construtor do Salesbot. |
| sms/endpoint | ❌ | string | Para que o sistema tenha funcionalidade de SMS, o widget deve incluir um objeto **sms** e especificar uma localização adicional **sms**. O objeto deve conter uma propriedade do tipo string chamada **endpoint**, que especifica o endereço para o qual a solicitação **POST** com as informações necessárias para o envio do SMS será enviada. |
| mobile/frame\_url | ❌ | string | Para habilitar a funcionalidade do aplicativo móvel, o widget precisa incluir um novo objeto mobile e definir uma localização adicional `"mobile_card"`. O objeto mobile possui duas propriedades: `"frame_url"` e `"color"`. O `"frame_url"` é a URL que será aberta em uma área designada dentro do aplicativo móvel. |
| mobile/color | ❌ | string | A cor é o código **HEX** da cor que será usada como fundo abaixo dos títulos do bloco com o widget. |

# Prevenção de Erros

- Muitos arquivos, incluindo o **manifest.json**, estão no formato **JSON**. Portanto, é essencial garantir que a sintaxe esteja correta antes de enviá-los. Você pode usar ferramentas online para verificar a sintaxe dos arquivos **JSON**. Um dos erros mais comuns é enviar um arquivo com sintaxe incorreta.

Updated 4 months ago

---

Copy Page

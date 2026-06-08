---
title: "Como usar UTMs no Meta Ads e Google Ads no CRM Leads360"
source: "https://leads360.com.br/como-usar-utms-meta-ads-google-ads-identificar-origem-leads"
date: "2026-04-24"
---

Quando você investe em anúncios, uma das perguntas mais importantes é: de onde vieram os leads que chegaram ao meu CRM?
Com o CRM Leads360, você consegue acompanhar a origem dos contatos e entender quais canais estão gerando mais oportunidades para o seu negócio. Para isso, é fundamental configurar corretamente os parâmetros de UTM nas campanhas de Meta Ads e Google Ads.
Atenção! Estas instruções são válidas para uso no CRM Leads360.
O que será abordado:
Copie e cole o código abaixo no campo “Parâmetros de URL” no anúncio Meta:
?utm_source=fb_ad&utm_medium={{adset.name}}&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&campaign_id={{campaign.id}}
Obs: pode adicionar com o "?" na frente
Copie e cole o código abaixo no campo “Sufixo do URL Final” no anúncio Google Ads:
utm_source=adwords&utm_medium={adname}&utm_campaign={campaignname}&utm_content={adgroupname}&utm_keyword={keyword}&utm_matchtype={matchtype}&campaign_id={campaignid}&ad_group_id={adgroupid}&ad_id={creative}
Obs: adicione sem o "?" na frente pois o Google adicionará automaticamente
Agora, se quiser entender um pouco mais sobre UTM, leia nosso artigo abaixo com mais explicações.
Neste artigo, você vai aprender o básico sobre UTMs, como elas ajudam na atribuição de leads e quais modelos usar nas suas campanhas.
UTMs são pequenos códigos adicionados ao final de uma URL para identificar a origem de um visitante.
Por exemplo:
https://seudominio.com/agendamento?utm_source=fb_ad&utm_medium={{adset.name}}&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&campaign_id={{campaign.id}}
Esses parâmetros ajudam o Leads360 a entender se o lead veio de uma campanha no Facebook, Instagram, Google Ads, busca orgânica, tráfego direto ou outro canal.
Na prática, isso permite responder perguntas como:
Qual campanha trouxe mais leads?
Qual anúncio gerou mais agendamentos?
O Google Ads está performando melhor que o Instagram?
Quais canais merecem mais investimento?
A proposta do Leads360 é simples: venda mais e atenda melhor com um CRM preparado para pequenos negócios locais.
Quando as UTMs estão configuradas corretamente, você consegue enxergar com mais clareza quais canais estão trazendo contatos, agendamentos, formulários preenchidos e oportunidades reais.
Isso ajuda sua empresa a:
- medir o retorno das campanhas;
- identificar os anúncios que mais geram leads;
- melhorar a distribuição do orçamento;
- criar automações diferentes para cada origem;
- personalizar o atendimento de acordo com o canal de entrada;
- evitar decisões baseadas apenas em achismos.
O Leads360 pode registrar dois momentos importantes da jornada do contato:
Primeira atribuição
É a primeira interação registrada do lead com sua empresa. Por exemplo, quando a pessoa acessa uma página de captura pela primeira vez e preenche um formulário.
Essa informação mostra como o lead chegou inicialmente até você.
Última atribuição
É a interação mais recente registrada antes de uma nova conversão ou ação importante. Por exemplo, a pessoa conheceu sua empresa por um anúncio no Facebook, mas depois voltou por uma campanha do Google e agendou uma consulta.
A primeira atribuição permanece como histórico inicial. Já a última atribuição pode mudar conforme novas interações acontecem.
Para que os dados de atribuição sejam capturados corretamente, o visitante precisa realizar uma ação dentro de elementos do próprio sistema, como:
- envio de formulário;
- envio de pesquisa;
- agendamento no calendário;
- envio de dados pelo chat;
- compra ou envio de pedido em formulário de checkout.
É importante que a conversão aconteça na página de destino que recebeu os parâmetros UTM. Se o usuário clicar no anúncio, chegar em uma página com UTM e depois for enviado para outra página sem os parâmetros, os dados podem não ser capturados corretamente.
Use este modelo para campanhas de Meta Ads (Facebook e Instagram Ads).
Copie e cole o código abaixo no campo “Parâmetros de URL” no anúncio Meta:
?utm_source=fb_ad&utm_medium={{adset.name}}&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&campaign_id={{campaign.id}}
utm_source=fb_ad
Identifica que o tráfego veio de anúncio pago da Meta.
Para o Leads360 classificar corretamente como Paid Social, use fb_ad
como fonte.
utm_medium={{adset.name}}
Registra o nome do conjunto de anúncios.
utm_campaign={{campaign.name}}
Registra o nome da campanha.
utm_content={{ad.name}}
Registra o nome do anúncio.
campaign_id={{campaign.id}}
Registra o ID da campanha no Meta Ads.
Imagine uma clínica estética anunciando uma avaliação gratuita.
A URL final poderia ficar assim:
https://clinicaexemplo.com/avaliacao?utm_source=fb_ad&utm_medium={{adset.name}}&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&campaign_id={{campaign.id}}
Quando alguém clicar no anúncio e preencher o formulário, o Leads360 poderá registrar que esse contato veio de uma campanha paga no Facebook ou Instagram.
Copie e cole o código abaixo no campo “Sufixo do URL Final” no anúncio Google Ads:
utm_source=adwords&utm_medium={adname}&utm_campaign={campaignname}&utm_content={adgroupname}&utm_keyword={keyword}&utm_matchtype={matchtype}&campaign_id={campaignid}&ad_group_id={adgroupid}&ad_id={creative}
Obs: adicione sem o "?" na frente pois o Google adicionará automaticamente
utm_source=adwords
Identifica que o tráfego veio do Google Ads.
Para o Leads360 classificar corretamente como Paid Search, a fonte deve conter adwords
.
utm_medium={adname}
Registra o nome do anúncio.
utm_campaign={campaignname}
Registra o nome da campanha.
utm_content={adgroupname}
Registra o grupo de anúncios.
utm_keyword={keyword}
Registra a palavra-chave que acionou o anúncio.
utm_matchtype={matchtype}
Registra o tipo de correspondência da palavra-chave.
campaign_id={campaignid}
Registra o ID da campanha.
ad_group_id={adgroupid}
Registra o ID do grupo de anúncios.
ad_id={creative}
Registra o ID do criativo ou anúncio.
Imagine uma empresa de energia solar anunciando para pessoas que pesquisam por “instalação de energia solar”.
Copie e cole a linha abaixo no campo Sufixo do URL Final no anúncio Google Ads:
utm_source=adwords&utm_medium={adname}&utm_campaign={campaignname}&utm_content={adgroupname}&utm_keyword={keyword}&utm_matchtype={matchtype}&campaign_id={campaignid}&ad_group_id={adgroupid}&ad_id={creative}
Assim, quando o lead preencher o formulário, o Leads360 poderá registrar que ele veio de uma campanha de busca paga no Google Ads.
Um ponto muito importante: os parâmetros precisam estar corretos.
Evite:
utm_source=Facebook
utm_source=facebook
utm_source=FB_AD
utm_source=google
Para Meta Ads, use:
utm_source=fb_ad
Para Google Ads, use:
utm_source=adwords
A configuração é sensível a erros de digitação, espaços extras e diferenças entre letras maiúsculas e minúsculas. Pequenos erros podem impedir que a atribuição seja registrada corretamente.
Antes de publicar suas campanhas, confira estes pontos:
1. Use a URL final correta
A URL final é a página para onde a pessoa será enviada depois de clicar no anúncio.
Exemplo:
https://seudominio.com/agendamento
Depois, adicione os parâmetros UTM ao final dela.
2. Não adicione espaços na URL
Um espaço extra pode quebrar o rastreamento.
Errado:
utm_source=fb_ad &utm_medium={{adset.name}}
Certo:
utm_source=fb_ad&utm_medium={{adset.name}}
3. Mantenha o formulário na mesma página
Sempre que possível, coloque o formulário, calendário ou etapa de conversão na mesma página em que o usuário chegou pelo anúncio.
Se o visitante for redirecionado para outra página antes de converter, os parâmetros podem se perder.
4. Não misture modelos diferentes
Use o modelo correto para cada plataforma.
Meta Ads:
utm_source=fb_ad
Google Ads:
utm_source=adwords
Evite criar modelos personalizados sem necessidade, especialmente se você depende dos relatórios de atribuição dentro do CRM.
5. Padronize os nomes das campanhas
Mesmo usando variáveis automáticas, é importante manter uma boa organização nos nomes das campanhas, conjuntos e anúncios.
Exemplo de padrão:
servico_cidade_objetivo_mes
Exemplo:
limpeza_dental_sao-paulo_leads_janeiro
Isso facilita a análise depois dentro do CRM Leads360.
O CRM analisa os parâmetros da URL e o domínio de referência para classificar a origem do lead.
Algumas classificações comuns são:
Paid Search
Quando o lead vem de anúncios de busca, como Google Ads.
Paid Social
Quando o lead vem de anúncios pagos em redes sociais, como Facebook e Instagram Ads.
Direct Traffic
Quando não há informação de origem. Isso pode acontecer quando a pessoa digita a URL diretamente no navegador ou acessa uma página sem parâmetros de rastreamento.
Organic Search
Quando o visitante vem de buscas não pagas em mecanismos como Google, Bing ou DuckDuckGo.
Social Media
Quando o tráfego vem de redes sociais de forma orgânica, sem campanha paga.
Referrals
Quando o visitante vem de outro site que possui um link apontando para sua página.
CRM UI
Quando o contato é criado manualmente dentro do CRM.
Third-Party
Quando o lead é criado por uma integração externa, como ferramentas de automação ou conexão entre sistemas.
Antes de colocar a campanha no ar, revise:
[ ] A URL final está correta?
[ ] O formulário ou calendário está na mesma página de destino?
[ ] A UTM do Meta Ads usa utm_source=fb_ad?
[ ] A UTM do Google Ads usa utm_source=adwords?
[ ] Não existem espaços extras na URL?
[ ] Os parâmetros estão escritos corretamente?
[ ] Os nomes das campanhas estão organizados?
[ ] O teste de clique e conversão foi realizado?
Configurar UTMs corretamente é um passo simples, mas essencial para entender quais campanhas realmente geram resultados.
Com o CRM Leads360, você pode acompanhar a origem dos contatos, identificar os canais mais eficientes e criar automações mais inteligentes para vender mais e atender melhor.
Use os modelos deste artigo como padrão nas suas campanhas de Meta Ads e Google Ads. Assim, sua equipe terá dados mais confiáveis para tomar decisões, otimizar anúncios e transformar mais visitantes em clientes.
Veja também:

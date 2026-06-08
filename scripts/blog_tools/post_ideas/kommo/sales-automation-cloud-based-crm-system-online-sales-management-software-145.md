---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/br/recursos/crm/passos-e-tipos-de-acoes-do-robo-de-vendas"
date: "2020-08-27"
---

Crie um Salesbot poderoso e eficiente com a Kommo! Nosso editor visual torna a automação perfeita e personalizada para qualquer negócio. Seja você iniciante ou experiente em bots, este guia ajudará em cada etapa.
Nunca construiu um bot antes? Aprenda como criar um.
Neste guia, você aprenderá sobre:
O que são os passos do Salesbot?
Os passos são os blocos de construção do seu Salesbot. Eles guiam conversas com leads e automatizam processos internos. Cada passo tem um propósito específico.
Abra o Construtor Visual para ver os passos disponíveis:
Enviar mensagem
O passo Mensagem é sua principal ferramenta para se comunicar com os clientes. Use para enviar mensagens de texto ou modelos de mensagens.
Como usar:
-
Clique em Mensagem no construtor visual.
- Um bloco de mensagem aparecerá. Clique no campo de texto para editar o conteúdo.
- Para adicionar um modelo de mensagem, clique em modelo e selecione um na lista de modelos de chat disponíveis.
Você também pode melhorar a comunicação com o cliente adicionando botões de resposta rápida. Eles permitem que os clientes escolham entre as opções que você definiu, guiando-os pelo seu fluxo. Para adicionar um, clique em + Botão de ação.
Por exemplo, você pode listar diversas opções que seu cliente pode escolher, e o bot seguirá o caminho apropriado com base na escolha dele.
Observação: Você pode adicionar até 13 botões, mas recomendamos adicionar no máximo três botões para evitar a divisão de mensagens em algumas plataformas.
Você também pode adicionar palavras-chave sinônimas como alternativas aos botões, ajudando o bot a entender a intenção do cliente, mesmo que ele digite em vez de clicar. Apenas uma dessas palavras-chave será suficiente para o Salesbot identificar a opção correta.
No passo Mensagem, você também pode incluir um botão de URL que redireciona os clientes para uma página da web. Por exemplo, rotule o botão como Visite nosso site, adicione o link para seu site e, quando clicado, ele os redirecionará diretamente para sua página inicial.
Depois de adicionar pelo menos um botão à sua mensagem, o sistema sugerirá adicionar duas ramificações adicionais:
-
Outra resposta: Se o usuário responder a uma mensagem com botões fornecendo uma entrada diferente (nem clicar em um botão nem inserir um sinônimo), uma ramificação alternativa pode ser configurada.
-
Sem resposta: Clique em Adicionar próximo passo. Um cronômetro será adicionado como a primeira etapa após esta. Se o Salesbot não receber uma resposta dentro do prazo especificado, uma ramificação alternativa pode ser configurada:
Você também pode anexar arquivos às suas mensagens clicando no ícone de anexo perfeito para compartilhar documentos como listas de preços ou cardápios.
Os tipos de arquivo suportados incluem:
- Documentos
- Imagens
- Vídeos
- Arquivos de áudio
Você pode enviar arquivos de áudio através dos seguintes métodos:
- Como um link de áudio nos formatos .mp3, .wav via integração do Instagram.
- Como um arquivo de áudio no formato .mp3 via integração WACA.
Você pode enviar mensagens de voz com o Salesbot usando o formato .ogg pelo sistema Android. Ao enviar uma mensagem no formato .ogg pelo iOS, o arquivo será entregue como um anexo de arquivo de áudio.
É possível enviar mensagens de voz por meio das seguintes integrações: Instagram, Facebook e WACA.
Em seguida, escolha o destinatário da mensagem se houver vários contatos em um cartão de lead:
-
Todos os contatos - canais selecionados (padrão) – Envia a mensagem para todos os contatos usando apenas os canais que você selecionou.
-
Todos os contatos - canal primário – Envia a mensagem para todos os contatos, mas apenas por meio de um dos canais.
-
Contato principal - canal selecionado – Envia a mensagem apenas para o contato principal, através dos canais que você escolheu.
-
Contato principal - canal primário – Envia a mensagem para o contato principal por meio de apenas um dos canais.
Observação: O contato principal se refere ao contato primário dentro de um lead quando vários contatos estão associados. Se um lead tiver apenas um contato, ele será considerado equivalente ao contato principal. Todos os contatos se refere a todos os contatos vinculados a um lead quando houver vários.
Selecione o canal que o Salesbot usará clicando em Canal na parte superior. Por padrão, ele é definido como Todos. Abra o menu suspenso para visualizar todos os canais conectados e escolha todos ou alguns deles.
Essas opções oferecem flexibilidade no gerenciamento da comunicação, permitindo que você a adapte à sua estrutura de leads e preferências de canal. A melhor parte? Você não precisa criar bots separados para cada canal — você pode gerenciá-los todos com um único bot!
Observação: Quando uma mensagem é enviada, ela primeiro passa para o status Enviado. Se a mensagem não for entregue, o bot seguirá a ramificação Erro no envio da mensagem.
Se a mensagem atingir com sucesso o status Entregue, o bot continua ao longo da ramificação principal.
List message (Whatsapp)
Este recurso permite que você envie até 10 opções em uma lista estruturada. Os clientes podem navegar facilmente e escolher entre as opções. Você também pode adicionar descrições a cada opção para fornecer informações mais detalhadas.
Como configurar:
-
Selecione List message (WhatsApp) no editor visual.
- Preencha os seguintes campos:
- Título da mensagem (opcional)
- Mensagem (obrigatório)
- Rodapé (opcional)
- Nome do botão (obrigatório)
- Título da seção (obrigatório)
- Título da opção (obrigatório)
- Descrição da opção (opcional)
-
Adicione mais opções e seções clicando em Adicionar opção ou + Adicionar seção:
Clicar no botão Adicionar seção criará uma nova seção que precisa ser concluída.
Clicar no botão Adicionar opção criará uma nova opção que precisa ser concluída.
Condição
Este passo serve como um filtro entre as ações do Salesbot. Você pode definir várias condições que uma mensagem de chat ou campos de contato devem atender antes de avançar para a próxima etapa. Este recurso é útil quando você precisa filtrar tipos específicos de contatos ou orientar o Salesbot com base no conteúdo da mensagem.
Você pode definir diferentes condições em uma única etapa ou criar várias condições para diferentes caminhos de conversação.
Isso ajuda você a personalizar as respostas do bot com base no que o cliente diz. Por exemplo, se um cliente digitar “Olá”, o bot pode responder com “Bem-vindo à nossa empresa”. Se eles pedirem um “catálogo”, o bot pode enviar o catálogo e dizer “Aqui está o nosso catálogo”.
Você pode personalizar este passo de muitas maneiras. Em vez de usar apenas a mensagem do cliente, você pode basear a condição em coisas como o Código de chat ativo, Fonte de lead ou outros campos personalizados.
Comentário
Esta etapa pode ser usada para configurar a automação para comentários do Instagram. Para começar, certifique-se de instalar nossa integração do Instagram.
Para saber mais sobre a integração, leia nosso artigo Instagram: Como conectar o Instagram com a Kommo.
Como configurar?
-
Use um passo Condição para disparar uma resposta com base em palavras-chave específicas nos comentários. Defina como Se o comentário do cliente for igual a: , digite a palavra-chave escolhida como o gatilho.
-
Adicione uma etapa Comentário para criar uma resposta pública que será publicada quando a palavra-chave for detectada em um comentário.
-
Quando estiver pronto, clique em Salvar e continuar para finalizar a configuração.
Para saber mais sobre a automação do Instagram, leia nosso artigo sobre automação de comentários do Instagram: Como configurar.
Pausa
A etapa Pausar permite que o bot aguarde ações específicas antes de continuar.
Como configurar:
-
Escolha Pausar na lista de passos.
Por padrão, o bot esperará até que a mensagem seja recebida. Clique nele para editar esta etapa.
O bot pode esperar até:
-
Mensagem recebida: o bot pausará suas ações até receber uma resposta do cliente.
-
O cronômetro acabou: o bot esperará por um período de tempo especificado antes de passar para a próxima etapa. O período máximo que você pode definir é 8760 horas, 60 minutos e 60 segundos.
-
Exceto para horas de serviço: o bot fará uma pausa se o horário atual estiver fora do seu horário de trabalho predefinido.
-
O vídeo é aberto ou O vídeo é fechado: o bot esperará até que um cliente abra ou feche um vídeo que foi enviado a ele antes de continuar. Isso pode ser usado para garantir que o cliente tenha interagido com o conteúdo do vídeo antes de prosseguir. Observe que os recursos Vídeo é aberto ou Vídeo é fechado estão disponíveis apenas no canal de chat ao vivo.
Você pode adicionar várias condições clicando em + Adicionar próxima condição. Para excluir uma condição, passe o mouse sobre ela e clique nos três pontos, depois em Excluir.
Observação: No cenário mostrado na captura de tela (com duas condições: Até mensagem recebida e Timer), o bot seguirá apenas uma condição. Se o Salesbot receber uma mensagem antes do timer expirar, ele prosseguirá com a etapa após a condição Até mensagem recebida. Se o timer expirar primeiro, ele seguirá a etapa após a condição do timer.
Validação
O passo de validação verifica as mensagens do cliente e direciona o bot adequadamente.
Ele valida mensagens com base em várias variáveis, como:
- é igual
- não é igual
- contém
- não contém
- tem um comprimento de; ou
- expressão regular
Observação: Ao selecionar a opção contém, você precisará especificar se o conteúdo deve conter números, letras, um número de telefone, um e-mail ou um intervalo numérico.
Suponha que o bot peça a um cliente seu número de telefone. Para garantir que o cliente forneça um número de telefone e não um texto aleatório, você pode definir uma condição de validação como se a mensagem do cliente contiver número de telefone. Se um número de telefone for detectado, o bot pode prosseguir com as próximas etapas. Você também pode adicionar outra condição, como se a mensagem do cliente não incluir número de telefone solicitando que o bot peça um número de telefone correto.
Enviar mensagem interna
Mensagens internas são ótimas para compartilhar informações dentro da sua empresa. Elas são visíveis apenas para a pessoa ou equipe selecionada para a qual são direcionadas.
Por exemplo, se você estiver administrando um negócio de buffet e um cliente quiser discutir opções em uma chamada, o bot pode enviar uma mensagem para um assistente responsável por lidar com tais questões.
Como configurar:
-
Selecione o passo Mensagem interna no editor visual.
- E insira o texto e escolha o usuário ou usuários responsáveis para os quais você deseja enviar esta mensagem uma vez acionada:
Inscrever-se (Meta)
A janela de conversação de 24 horas da Meta limita o envio de mensagens aos clientes a 24 horas após a última mensagem. Isso é feito para evitar spam. As mensagens opt-in resolvem esse problema permitindo que os clientes assinem boletins informativos regulares sobre o tópico escolhido, ajudando a manter a conversa. Você pode configurá-las usando o passo Inscrever-se (Meta).
Dois campos devem ser preenchidos para que a etapa seja iniciada: #adicionar tags e Insira um título para a mensagem.
Todas as ações disponíveis
O Salesbot oferece uma variedade de ações para automatizar fluxos de trabalho e aprimorar a comunicação. Basta clicar em Ação ao configurar uma etapa, e você verá um menu suspenso com as seguintes opções. Aqui está uma análise de cada ação:
-
Adicionar nota: Adicione notas diretamente ao cartão de um lead para melhor rastreamento. Para adicionar uma nota, primeiro selecione o tipo de entidade para a nota (padrão: contato principal).
Em seguida, insira o texto da nota. Uma vez acionada, a nota aparecerá no chat do lead.
Você pode editar a nota no cartão de lead quando você clicar nela. Você pode anexar arquivos ou excluí-la passando o mouse sobre o lado direito dela e clicando em Excluir.
-
Adicionar tarefa: Atribui tarefas aos membros da equipe. Você pode definir um prazo, escolher usuários responsáveis, alterar o tipo de tarefa ou deixar comentários.
Por exemplo, quando um lead atinge o estágio de tomada de decisão, você pode usar esta ação para agilizar as tarefas de acompanhamento e a coordenação da equipe. Atribua automaticamente uma tarefa ao membro da equipe responsável para acompanhar o lead. Para saber mais sobre como trabalhar com tarefas, leia nosso artigo Tarefas.
-
Alterar status da conversa: Atualizar automaticamente os status das conversas para fechadas ou respondidas com base em gatilhos específicos.
-
Mudar o status do lead: Mova os leads pelo seu pipeline de vendas automaticamente, dependendo da ação definida. Tudo o que você precisa fazer é escolher um pipeline e etapa (por exemplo, Tomada de decisão), clicando no botão Pipeline.
Por exemplo, você pode configurá-lo para que quando os clientes selecionem um serviço nos botões de resposta rápida, o bot os mova para a etapa de Tomada de decisão.
-
Mudar usuário responsável: Encaminhe clientes para o gerente certo com base em suas necessidades. Os usuários podem ser alterados nas seguintes entidades: contato principal, todos os contatos, contato de chat, lead e empresa.
Para selecionar o usuário responsável por lidar com o lead, clique em “…”.
-
Tarefa concluída: Marque automaticamente as tarefas como concluídas e atualize o calendário. Você pode escolher todas as tarefas ou uma específica e especificar o prazo. Assim que esta etapa for executada, a tarefa será concluída. Uma nota aparecerá nos chats com os leads para os quais as tarefas foram criadas.
A tarefa será movida da coluna de tarefas no calendário Kommo para a coluna de tarefas concluídas.
-
Gerar formulário: Crie um formulário para coletar mais informações de leads. Todos os dados vão para o cartão de lead. Ou você pode escolher criar um novo Lead com base nas informações do formulário. Você também pode definir a etapa do pipeline ou adicionar tags a um cartão de lead.
Para criar um formulário, clique no botão Criar formulário, escolha o layout do formulário, edite os campos e o design como desejar.
Você pode aprender mais sobre edição de formulários em nosso artigo Webform por Kommo.
-
Criar lead: Crie automaticamente novos leads com detalhes importantes.
Você pode escolher quais informações incluir (como Venda, Tags, Contatos e Empresa) e atribuí-las a qualquer usuário. Você também pode definir o estágio do pipeline em que ele estará. Quando o usuário seleciona uma opção da lista, as específicas serão copiadas diretamente do cartão de lead que o bot está manipulando no momento.
Por exemplo, o Salesbot pode criar automaticamente leads para participantes de webinars que solicitam uma consulta. Ele pode adicionar detalhes como nome, informações de contato e empresa do formulário de inscrição, marcá-los como “Participante do webinar” e atribuir o lead à etapa do pipeline e ao representante de vendas corretos. Isso economiza tempo e garante que nenhum cliente potencial seja perdido.
-
Gerenciar assinantes: Adicione ou remova assinantes (por exemplo, membros da equipe) em chats para mantê-los notificados sobre atualizações em cartões de leads.
-
Gerenciar tags: Adicione ou exclua tags facilmente para melhor organização. Você pode adicionar/excluir tags e alterar a qual entidade elas serão atribuídas/excluídas. Quando você clicar em #adicionar tags, uma lista de tags disponíveis aparecerá. Escolha a que você precisa na lista ou crie uma nova tag.
Meta Conversions API:
Rastreie facilmente as ações do cliente na Kommo (como leads e compras) dos seus anúncios Click-to-Message no Instagram, Facebook Messenger ou WhatsApp sincronizando-os diretamente com o Gerenciador de Eventos da Meta. Essa integração ajuda você a monitorar o desempenho do anúncio, avaliar campanhas e refinar estratégias, fornecendo uma compreensão abrangente da jornada do seu cliente.
Para saber como configurar o Meta Conversions API por meio de um Salesbot, leia nosso artigo Meta Conversions API: Como configurar.
-
Enviar email: Automatizar o envio de email usando modelos.
Primeiro, você precisará conectar um endereço de email clicando em conectar.
Observação: Para enviar emails, você precisa criar modelos de email acessando o menu Email > Configurações > Modelos.
Os emails são enviados do email conectado do gerente responsável. Se indisponível, um email corporativo compartilhado será usado.
Para mais detalhes, consulte nosso artigo Emails engatilhados.
Enviar um webhook: Envie dados para aplicativos de terceiros usando webhooks. Por exemplo, você pode usar webhooks para alterar o status do pedido de Feito para Cancelado no sistema ERP. Tudo o que você precisa é inserir o URL do webhook.
Definir campo: Atualizar campos personalizados em perfis de lead automaticamente. Por exemplo, o bot pode preencher automaticamente um campo personalizado quando um cliente fornece seu email ou número de telefone no chat.
Para escolher o campo que você gostaria de solicitar que o usuário do chat preencha, clique em …:
Selecione o tipo de entidade para o qual o campo será definido clicando em Contato de chat:
Em seguida, escolha qual campo você deseja atualizar e o tipo de dados que você precisa. Dependendo da sua escolha da entidade, o Salesbot pode preencher campos diferentes. Estes são os mais populares:
- Mensagem do cliente - Receba a última mensagem de bate-papo que o usuário enviou antes que essa ação fosse acionada.
- Entrada manual - O Salesbot entrará em contato com o usuário responsável no Kommo e solicitará que ele insira os dados manualmente
Ir para outra etapa
O recurso Ir para outra etapa permite que o bot pule diretamente para uma etapa diferente na sua sequência. Ele foi projetado para facilitar fluxos complexos ao vincular etapas sem duplicá-las. Basta selecionar uma etapa da lista e o bot as conectará para você.
Observação: Essa opção fica disponível somente depois de você ter configurado pelo menos uma outra etapa no fluxo do bot.
Use Ir para outra etapa para mesclar várias ações em um único caminho ou etapa, reduzindo a redundância:
Ele também permite conectar várias ações a uma etapa para evitar recriar o mesmo processo repetidamente. Por exemplo, se um cliente não forneceu um número de telefone obrigatório, solicite que ele o insira e redirecione o bot de volta para uma etapa de validação.
Dica: Se o fluxo do seu Salesbot se tornar complexo, use a ferramenta de mapa na parte inferior da tela para navegar facilmente entre as etapas. Clique em qualquer seção no mapa para pular diretamente para essa parte da sequência do seu bot.
Para uma navegação ainda mais suave, ao pular entre etapas, um botão aparecerá acima do mapa por alguns segundos, permitindo que você retorne rapidamente à etapa anterior.
Se duas etapas estiverem muito distantes para que setas automáticas as conectem, a etapa aparecerá como um botão clicável:
Clicar neste botão também exibirá o botão Voltar para... acima do mapa para facilitar a navegação.
Iniciar Salesbot
A etapa Iniciar Salesbot permite que você vincule um bot existente ao seu fluxo de trabalho atual.
Clique em Iniciar Salesbot e depois escolha o bot que você deseja incluir no processo.
Você pode usar esses tipos de bots para criar fluxos de trabalho de vendas completos, automatizando tarefas do início ao fim.
Por exemplo, antes de enviar um pedido, você pode querer verificar as informações de contato do cliente. Se as informações estiverem incorretas, você pode ativar um bot de boas-vindas para coletar os detalhes de contato atualizados. Assim que o bot de boas-vindas concluir sua tarefa, o bot de confirmação de dados pode continuar de onde parou, continuando o fluxo de trabalho perfeitamente.
Etapa adaptada (código)
Nesta etapa, você pode inserir seu próprio código para funcionalidade avançada.
Observação: Os manipuladores de código “” devem conter pelo menos um caractere para que a etapa seja ativada. Para ter uma ideia melhor de como criar comandos para o Salesbot por meio da codificação, consulte o artigo do Salesbot em nossa Central de Recursos para desenvolvedores.
Widget
Esta etapa tem widgets de terceiros que podem ser usados no Salesbot. Você pode adicionar várias integrações nesta etapa, como Stripe, Mailer e muitos outros ao seu fluxo. Eles adicionarão recursos extras ao seu bot. Para adicionar um widget, clique na etapa Widget.
Uma lista de widgets disponíveis aparecerá. Os widgets que você já instalou aparecerão primeiro. Se você quiser usar outro widget, basta clicar em Instalar.
Por exemplo, com o widget Stripe, você pode enviar faturas de pagamento personalizadas. Ao selecionar um widget, uma etapa aparecerá com as informações necessárias para preenchimento.
Eles podem ser adicionados manualmente ou automaticamente. Para obter instruções detalhadas sobre como usar o Stripe com seu bot, consulte nosso artigo sobre a integração do Stripe.
Cada etapa do widget é única. Para explorar quais integrações a Kommo oferece, confira nossa página de Apps e integrações.
Round Robin
O recurso Round Robin permite que você execute etapas em uma sequência circular, facilitando a distribuição uniforme de ações entre seus leads. Você pode escolher até 100 opções diferentes, cada uma executando uma ação única.
Como configurar:
-
Selecione Round Robin no menu do Salesbot.
-
Adicione etapas para cada opção clicando em Adicionar próximo passo.
-
Escolha uma ação para cada etapa, como Mensagem, Tarefa ou qualquer outra ação disponível.
Outro benefício desta etapa é que ela permite que você realize testes A/B para determinar quais mensagens são mais eficazes.
Por exemplo, se você adicionar três opções, o bot irá alternar entre elas assim:
-
O primeiro lead recebe Mensagem 1.
-
O segundo lead recebe Mensagem 2.
-
O terceiro lead recebe Mensagem 3.
-
O quarto lead retorna para Mensagem 1.
Esse padrão continua, garantindo que as mensagens sejam distribuídas uniformemente entre seus leads.
Embora o Round Robin seja flexível, tenha em mente algumas limitações e condições de reinicialização:
-
Máximo de ações: Você pode ter até 100 ações, mas pelo menos duas são necessárias. O bloco começa com duas opções, e você não pode excluir uma até adicionar uma terceira.
-
Reinício da distribuição: A sequência será redefinida se você adicionar/editar/excluir uma nova ação.
Observação: Lembre-se sempre de salvar as configurações do Salesbot depois de terminar de configurá-las.
Você ainda precisa de ajuda ou tem outras dúvidas? Entre em contato enviando um email para support@kommo.com ou fale com a gente via WhatsApp. Você também pode contratar um parceiro Kommo para fazer todo o trabalho pesado para você.
Ainda não é usuário? Inscreva-se para o nosso teste gratuito de 14 dias ou agende uma demonstração gratuita ao vivo.

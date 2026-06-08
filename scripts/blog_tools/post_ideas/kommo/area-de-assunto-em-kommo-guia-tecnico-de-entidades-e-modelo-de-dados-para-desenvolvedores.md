---
title: "Área de Assunto em Kommo – guia técnico de entidades e modelo de dados para desenvolvedores"
source: "https://pt-developers.kommo.com/docs/%C3%A1rea-de-assunto"
date: "2026-02-17"
---

Para o desenvolvedor, o sistema Kommo é um banco de dados relacional. O sistema possui entidades básicas e auxiliares, essencialmente tabelas de dados, que podem ser vinculadas entre si. O acesso a elas está disponível por meio da API.
Para acessar os dados do sistema, seja por meio de interfaces ou da API, é necessária autorização. Todas as interações da API são baseadas nos direitos de acesso do usuário autorizado associado à conta. Os métodos da API só podem ser invocados após uma autorização bem-sucedida.
Você pode recuperar detalhes essenciais sobre a conta através da API, incluindo:
- Nome da conta
- Período de assinatura
- Usuários da conta e suas permissões
- Diretórios de campos personalizados para contatos e leads
- Diretório de estágios de leads
- Diretório de tipos de nota
- Referência de tipos de tarefa
Contact consistem em um conjunto predefinido de campos, junto com campos personalizados que podem ser criados por um administrator da conta.
Cada contato pode estar vinculado a zero, um ou múltiplos leads.
Um contato pode estar associado a uma única empresa.
O email e o número de telefone do contato servem como identificadores únicos, usados em conjunto com outros sistemas. Por exemplo, o número de telefone e o endereço de email do contato são usados para rastrear o histórico de chamadas e correspondências por email.
Além disso, cada contato pode ser atribuído a um usuário responsável, o que ajuda a gerenciar os direitos de acesso para diferentes usuários da conta.
Um lead consiste em um conjunto predefinido de campos, junto com campos personalizados que podem ser criados pelo administrador da conta, seja através da interface ou via API.
Cada lead pode ser:
- Vinculado a zero, um ou múltiplos contatos
- Vinculado a apenas uma empresa
- Atribuído a um usuário responsável para gerenciar os direitos de acesso entre os usuários da conta
O lead possui uma etapa, que indica a posição do lead no pipeline. Cada lead deve ser atribuído a uma etapa.
A lista de etapas pode ser personalizada dentro da conta, com exceção das três etapas do sistema: Incoming leads, Closed – Won, e Closed – Lost. A única personalização disponível para as etapas do sistema é a capacidade de renomeá-las.
Um Lead de Entrada tem funcionalidades adicionais e pode originar de várias fontes. Ele pode não ter um usuário responsável atribuído e contém metadados adicionais (como o tipo de Lead de Entrada e outras propriedades).
Leads na etapa Leads de Entrada geralmente vêm de integrações como email, telefonia ou formulários de sites. Esses leads são inicialmente não processados e ainda não estão associados a um contato ou empresa. O usuário pode aceitar um lead de entrada, momento em que o lead, o contato e a empresa (se dados relevantes estiverem disponíveis) serão criados, ou rejeitar o lead.
Uma empresa é semelhante a um contato e consiste em um conjunto predefinido de campos, junto com campos personalizados que podem ser criados pelo administrador da conta.
Cada empresa pode:
- Vinculada a zero, um ou múltiplos leads
- Ter um usuário responsável para gerenciar os direitos de acesso dos usuários da conta
Tanto o email quanto o número de telefone são usados como identificadores.
Uma tarefa é uma das entidades principais do sistema, pois ajuda os usuários a acompanharem os clientes e garante que nada seja esquecido.
Uma tarefa deve ser atribuída a um usuário responsável e ter um prazo (que inclui uma data e hora exatas). Uma tarefa pode estar associada a um lead, contato, ou existir de forma independente, sem estar vinculada a nenhum objeto.
Quando uma tarefa é concluída, você pode definir o resultado usando notas.
Notas fornecem a capacidade de adicionar informações adicionais, estruturadas ou não estruturadas, a um contato, empresa ou lead.
As notas podem ser geradas pelo sistema (por exemplo, chamadas, mensagens SMS, etc.) ou criadas pelo usuário (por exemplo, comentários, arquivos). Elas são exibidas juntamente com as tarefas no registro da entidade.
As notas podem acionar eventos, e eventos também podem ser criados como resultado de ações do usuário ou automação (como uma mudança no responsável de uma entidade).
Frequentemente, event e notas são criados por integrações para adicionar informações extras a uma entidade ou quando os dados mudam.
Custom fields permitem adicionar informações adicionais às entidades e podem ser criadas ou excluídas individualmente.
Chamadaspermitem adicionar informações a um contato ou empresa. Os eventos de chamada são exibidos no registro da entidade junto com as tarefas. Se o evento de chamada incluir um link para a gravação da chamada, um player será incorporado na nota, permitindo que os usuários reproduzam a gravação diretamente.
Na Kommo, cada conta pode configurar notificações para um servidor web externo para vários eventos. Webhook podem ser usados para atualizar informações de leads em sua loja, enviar notificações SMS ou automatizar o processamento de leads. Cada webhook pode ser configurado para acionar ações específicas com base em eventos particulares. O administrador da conta pode configurar e gerenciar webhooks na página Configurações → Integrações.
As etapa de venda representam a sequência de etapas pelas quais um lead passa no pipeline de vendas antes de realizar uma compra.
Na Kommo, você pode criar até 10 pipelines por conta, cada um com estágios personalizados para acompanhar o progresso do lead. Cada pipeline pode conter até 100 etapas (incluindo ambas as etapas de Won e Lost). Apenas o administrador da conta pode configurar os pipelines e etapas de vendas acessando Leads→Automatize.
Um Digital Pipeline permite automatizar ações e mover leads através de diferentes estágios com base em eventos específicos. O administrador da conta pode configurar o Digital Pipeline acessando Leads → Automatize.
Um widget é uma coleção de arquivos que pode ser conectada a qualquer conta que tenha o widget ativado. O widget oferece várias funcionalidades:
- Exibir dados adicionais nas interfaces da Kommo.
- Interagir com os usuários e os dados que eles inserem. O JavaScript pode ser integrado em quase qualquer parte da interface do sistema. Por exemplo, você pode exibir um pop-up quando uma ligação for recebida.
- Configurações personalizadas para o seu serviço. Os administradores podem inserir detalhes de configuração exclusivos, como chaves de API, para personalizar o widget.
Os widgets podem ser configurados pelos administradores de conta na página Configurações → Integrações.
Listas refere-se a coleções de contatos e empresas. Esta seção permite criar listas e diretórios personalizados, que podem ser utilizados dentro dos perfis de leads.
Na Kommo, uma fonte refere-se a uma integração ou serviço que pode adicionar leads dentro de uma conta.
A fonte é exibida na seção Estatísticas do lead, pode ser utilizada para filtragem e aparece no widget do painel. Ela ajuda a determinar em qual pipeline o lead será criado e também é usada para a funcionalidade de chat.
Uma fonte pode ser uma integração ou um serviço da Kommo, como formulários.
As fontes possuem uma hierarquia e podem ser múltiplas. Por exemplo, pode haver vários arquivos conectados do Google Sheets ou múltiplos números do WhatsApp.
Fontes com as quais o usuário pode interagir são exibidas no lado esquerdo da seção Digital Pipeline.

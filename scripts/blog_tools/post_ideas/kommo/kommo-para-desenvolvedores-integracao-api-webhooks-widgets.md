---
title: "Kommo para Desenvolvedores: Integração, API, Webhooks & Widgets"
source: "https://pt-developers.kommo.com/docs/kommo-para-desenvolvedores"
date: "2026-04-14"
---

Nosso objetivo é oferecer uma ampla gama de possibilidades para integração com vários serviços e sistemas. Isso permite que clientes e parceiros expandam a funcionalidade da Kommo para si mesmos e para outros.
Desenvolver seus próprios widgets e integrações não é tão difícil quanto pode parecer à primeira vista. Para facilitar a tarefa dos desenvolvedores, a Seção do Desenvolvedor fornece documentação, receitas e referências de API.
Uma integração é um aplicativo (com ou sem widget) que ajuda os usuários a gerenciar seu fluxo de trabalho. A pessoa ou equipe que trabalha com integrações é chamada de integrador.
Para acessar os dados de usuários do Kommo, os desenvolvedores devem criar uma integração (inserindo o nome e a descrição do serviço e concedendo as permissões necessárias). Após a criação, Kommo fornece as chaves necessárias para acessar nossa API.
As integrações podem incluir
- um Token de Longa Duração que pode ser usado apenas para integrações privadas
- um conjunto de chaves secretas para autorização OAuth2 (client_id, client_secret, authorization_code)
- metadados como nome, logotipo e descrição. Essas informações são necessárias para que os usuários saibam qual serviço tem acesso à sua conta e dados.
- também é incluído um arquivo de widget contendo código JS executável na interface da Kommo, mas não é obrigatório.
Destacamos dois tipos de integrações:
Este é o tipo mais simples de integração: uma integração fornece funcionalidades adicionais dentro de uma única conta Kommo.
Por exemplo, um desenvolvedor/parceiro pode criar uma funcionalidade exclusiva que apenas uma empresa/conta necessita, como um formulário web em um site ou uma integração com software específico do cliente. Integrações desse tipo não requerem moderação e não serão publicadas no Kommo Marketplace.
Integrações privadas podem incluir um widget que funciona apenas na conta onde a integração foi criada.
Se você está desenvolvendo uma integração que possa ser útil para todos os usuários do Kommo, pode publicá-la no Kommo Marketplace. No entanto, integrações desse tipo devem passar pelo processo de moderação, que envolve testes e auditoria do código JavaScript do widget para garantir a segurança e a qualidade da experiência do usuário.
Como o desenvolvimento dessas integrações é um processo complexo, oferecemos contas técnicas para integradores de integrações públicas, onde podem se comunicar com nossa equipe de suporte e testes. Na conta técnica, os integradores também podem trabalhar com uma interface avançada para integrações personalizadas, que inclui recursos como controle de versões da integração e suporte para múltiplos idiomas.
Public integrations can include widgets that work within the Kommo interface. These integrations can be installed on an external website using the Button on the Site.
- Exibir seu layout em locais permitidos do sistema, como cartões de lead ou contato, listas, pipelines, dashboard, etc. Você também pode adicionar uma interface para que os usuários interajam com a integração
- Afetar a exibição e o comportamento das interfaces padrão do Kommo
- Trocar dados com sistemas externos enviando requisições ou com a Kommo via API REST
- Receber dados do contexto da página e objetos JS iniciados pelo Kommo
Qualquer usuário com direitos de administrador pode criar integrações privadas. A integração será atribuída à conta onde foi criada. Isso significa que qualquer um dos administradores dessa conta poderá gerenciar a integração e terá acesso às suas chaves compartilhadas.
Se você deseja construir um aplicativo público, precisa solicitar uma conta técnica.
Você pode:
- Fazer upload de dados do seu sistema contábil interno e exibir informações adicionais sobre um contato.
- Permitir que os funcionários da sua empresa enviem uma solicitação para o departamento de contabilidade a fim de gerar um pagamento diretamente do cartão do lead.
- Se você é o desenvolvedor de um serviço de terceiros (como mensageiros ou VoIP), pode oferecer aos clientes do Kommo a oportunidade de usar seu serviço publicando uma integração pública, tornando-a mais transparente e fácil, etc.
Além da capacidade de receber, adicionar e atualizar dados no Kommo usando a API REST, fornecemos um conjunto adicional de instrumentos para criar integrações convenientes e fáceis de usar.
A API do CRM é uma ferramenta poderosa para desenvolvedores que desejam expandir as capacidades da Kommo e criar soluções inovadoras que ajudem as empresas a se conectarem com os clientes de novas e empolgantes maneiras. Com suas funcionalidades e comunicação segura, a API do CRM oferece uma variedade de benefícios para desenvolvedores que buscam levar o desenvolvimento de software para o próximo nível.
A API de Chats é extremamente útil para qualquer integrador que tenha como objetivo conectar uma nova fonte de mensagens, como um novo mensageiro. Por exemplo, você pode desenvolver sua própria integração com o WhatsApp usando a API de Chats e distribuí-la de acordo com seus próprios termos. Nesse caso, você será responsável pela transferência das mensagens e pelo controle da API do WhatsApp. Para os usuários finais, isso parecerá como se eles estivessem enviando mensagens diretamente para o mensageiro e as recebendo na Kommo. O SalesBot também é compatível com mensagens recebidas de sua fonte.
A API de VoIP é um conjunto de métodos e bibliotecas JavaScript, como reprodutores de gravação de chamadas, notificações push e outros, além de exemplos específicos de API e uso. É útil para integradores que estão desenvolvendo integrações com serviços de telefonia.
Os webhooks permitem que os usuários se inscrevam em certos eventos (como uma alteração de contato ou uma nova tarefa) na Kommo, seja manualmente ou via API. Quando tal evento ocorre, o script correspondente é acionado, e o usuário recebe um contexto de entrada para o evento. Este instrumento permite que os usuários acompanhem as mudanças de dados necessárias, sem depender de sincronizações recorrentes, mas baseado no modelo de eventos.
O WEB SDK permite modificar a interface do Kommo introduzindo scripts e estilos personalizados ou criando widgets.
É uma ferramenta que você pode usar para criar cenários personalizados para operações automatizadas com usuários via mensageiros. Você pode programar o Salesbot para executar várias ações com leads e contatos, responder automaticamente em chats, usar processamento de linguagem natural (NLP) para determinar a intenção do usuário e muito mais.
Oferecemos uma linguagem personalizada do SalesBot e um editor visual para criar cenários automatizados de comunicação com os usuários. Além disso, os integradores têm a opção de incorporar sua integração ao fluxo de trabalho do Bot.
É uma poderosa ferramenta de automação que vem com seu próprio construtor. O construtor permite configurar reações automáticas do sistema para eventos, como mudanças de estágio de lead e visitas ao site. O Kommo pode reagir com uma ampla gama de ações personalizáveis, como criar uma tarefa, adicionar um contato ou enviar um e-mail. Além disso, os integradores podem criar seus próprios manipuladores de eventos e adicioná-los à lista de ações automáticas disponíveis.

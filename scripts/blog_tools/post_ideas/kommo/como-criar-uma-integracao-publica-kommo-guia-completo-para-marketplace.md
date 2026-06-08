---
title: "Como Criar uma Integração Pública Kommo: Guia Completo para Marketplace"
source: "https://pt-developers.kommo.com/docs/criar-uma-integra%C3%A7%C3%A3o-p%C3%BAblica"
date: "2026-06-03"
---

Se você está desenvolvendo uma integração que pode ser útil para todos os usuários da Kommo, teremos prazer em publicá-la em nosso Marketplace. Para esse tipo de integração, o suporte técnico é fornecido por meio de um canal de comunicação dedicado com a equipe do Marketplace da Kommo.
Se você está desenvolvendo uma integração pública, deve fazê-lo sob a conta técnica. Essa integração também deve passar pelo nosso processo de moderação para garantir que possamos oferecer suporte e proteger os dados e direitos de nossos clientes.
As integrações públicas podem incluir um widget que suporta as seguintes capacidades:
- API da Kommo:
A capacidade de manipular e gerar dados na Kommo, incluindo contas, usuários, leads, contatos, tarefas, etc. - JS SDK:
Um conjunto de funções e objetos que facilita o acesso ao ambiente (como informações sobre o widget e o usuário autorizado) e permite a interação com vários elementos da interface. - Salesbot:
Uma ferramenta para criar cenários personalizados para automatizar interações com usuários por meio de mensageiros. - Pipeline digital:
Uma poderosa ferramenta de automação que permite configurar gatilhos para diferentes eventos, como e-mails, chamadas ou mensagens recebidas, mudanças de estágio de leads ou visitas ao site. - API de Chats:
A capacidade de se integrar com diferentes mensageiros e permitir que os usuários do Kommo enviem e recebam mensagens por meio deles. - API VoIP:
Conjunto de métodos API e JS úteis para conectar serviços de telefonia com a Kommo.
Acesse a conta técnica que você solicitou para a integração. Vá para Configurações ➡ Integrações ➡ Criar Integração ➡ Pública
Observe que, neste ponto, você pode consultar rapidamente a documentação da API para verificar os nossos requisitos antes de criar sua integração.
Em uma conta técnica, ao criar uma integração pública, você perceberá que as interfaces de integração são mais complexas. Você terá mais capacidade para versionamento, multilíngue, etc.
Na primeira etapa, você deve preencher os seguintes campos:
To specify the widget code, use the following rules:
- Use letras latinas
- O código do widget não deve começar com uma letra maiúscula
- Números podem ser usados, mas não como o primeiro caractere do código do widget
- O único caractere especial permitido é _ (sublinhado), mas você não deve começar o código do widget com ele.
A URL de redirecionamento é um link para o seu site que irá gerenciar o trabalho com as chaves. É importante que o domínio seja protegido por um certificado SSL se você planeja usar a integração em mais de uma conta. Também verificamos periodicamente a disponibilidade do domínio para garantir que a integração funcione corretamente.
Este é o link para um webhook relacionado à desativação da integração. Uma solicitação GET será enviada para este endereço quando o usuário desativar a integração. A solicitação conterá dois parâmetros: account_id
e client_id
.
Conceder acesso é o conjunto mínimo de permissões necessárias para a integração funcionar. Você pode escolher várias opções:
- Acesso aos dados da conta
- Central de notificações
- Acesso a arquivos
- Exclusão de arquivos
- Criação de usuário
- Ativação de usuário
- Desativação de usuário
Escolha os idiomas necessários para a sua integração.
Nesta seção, você pode selecionar qualquer idioma necessário para o seu widget. Você pode adicionar ou remover idiomas extras posteriormente.
Depois, não se esqueça de clicar em Salvar!
Em seguida, você deve preencher as informações da integração para todos os idiomas que você escolheu.
Para validar o botão Solicitar revisão no futuro, você precisa garantir que TODOS os campos estejam preenchidos corretamente, pois todos os campos são obrigatórios.
Além disso, você pode encontrar informações no artigo Lista de verificação de integração pública.
- Controle duplicado
Marque esta caixa se sua integração suportar controle duplicado.
- Fontes múltiplas
Marque esta caixa se sua integração gerenciar as fontes por conta própria via a API de Fontes. Se esta caixa estiver selecionada, o Kommo não criará fontes por padrão (será necessário criar todas as fontes que a integração precisar).
- Faça o upload do arquivo do widget
Você precisa fazer o upload do arquivo do widget. Clique no botão Carregar arquivos de Widget. Você pode encontrar mais informações sobre os requisitos do arquivo no Artigo sobre Widgets.
No momento do upload, o arquivo é automaticamente verificado quanto à conformidade com os requisitos da lista de verificação para integração pública. Se forem encontradas inconsistências, você receberá um erro 400 Bad Request
com uma lista de erros e suas localizações exatas.
- Idioma de Integração
Você pode adicionar idiomas à sua integração diretamente da sua conta técnica. Basta clicar no botão ‘Adicionar Idioma’ e selecionar o que você precisa no menu suspenso. Se não precisar mais de certos idiomas, também pode removê-los.
No entanto, lembre-se de que um único idioma de uma integração deve permanecer e não poderá ser excluído.
- Ícone da Integração
Certifique-se de que o tamanho da imagem seja 400 x 272 px. Para alterar o logo, basta clicar na imagem e substituí-la por um arquivo do seu dispositivo.
- Nome da Integração
Forneça o nome da integração.
- Descrição Curta
Forneça uma descrição curta para a página da integração. O número máximo de caracteres é 50.
- Proprietário da Integração
Por favor, verifique o nome da empresa (ele será usado na seção de política de privacidade).
- Link para a Política de Privacidade
Provide a link to the integration's privacy policy.
- Link to Integration Support Site
Forneça um link para a política de privacidade da integração.
- Email de Suporte
Forneça um endereço de e-mail para suporte.
- Galeria de Integração
Certifique-se de que o tamanho da imagem seja 1188 x 616 px. As imagens do tour podem ser excluídas ou substituídas. Para isso, passe o cursor sobre a imagem e selecione a opção apropriada. Para adicionar uma imagem, clique no elemento padrão Galeria de Integração e selecione a imagem do seu dispositivo.
A ordem de adição das imagens não corresponderá à ordem na janela da integração. Dessa forma, a primeira imagem adicionada aparecerá por último na galeria.
- Descrição da Integração
Forneça uma descrição da integração.
- Logo após a instalação
Certifique-se de que o tamanho da imagem seja 108 x 108 px. Para alterar o logo, basta clicar na imagem e substituí-la por um arquivo do seu dispositivo.
- Descrição após a instalação
Forneça uma descrição para a visualização após a instalação.
- Tags (Opcional)
Você pode usar as tags sugeridas para personalizar sua descrição para cada usuário.
Adicione uma tag à descrição após a instalação no local desejado; basta clicar nela, e a tag irá inserir as informações do cliente na descrição para a conta dele.
Por exemplo, você pode usar a tag #ACCOUNT_ID#
para especificar onde deseja que essa informação seja usada, garantindo que seu widget esteja instalado corretamente.
Ao acessar a aba Chaves na Janela do Widget, você pode ver o Código de Autorização e o Token de Longa Duração que você pode usar no processo de autorização. A Chave secreta e o ID de Integração serão usados independentemente da conta em que a integração será instalada..
Na sua conta técnica, você também pode visualizar as estatísticas de instalações e desinstalações da sua integração por conta. Para acessar as estatísticas, clique no botão Estatísticas à esquerda do botão Chaves na janela modal de gerenciamento da integração.
Com a janela de estatísticas aberta, você terá acesso às seguintes informações se for administrador da conta técnica:
- Código Widget da integração que você está visualizando.
- Idioma
Um menu suspenso exibirá todos os idiomas disponíveis para a integração. Cada idioma tem suas próprias estatísticas, pois considera as instalações do Marketplace para cada idioma separadamente.
- Gráfico
Uma representação gráfica da dinâmica de instalações e desinstalações pelos clientes ao longo do período selecionado. As instalações são indicadas em azul, e as desinstalações em vermelho. O eixo horizontal mostra o período do relatório, enquanto o eixo vertical mostra o número de instalações.
- Métricas (exibição quantitativa das instalações)
Ao fazer alterações na integração, você pode testá-las imediatamente na mesma conta.
Para testar a integração, você precisa instalá-la a partir do Marketplace e garantir que ela seja exibida na seção Instalados .
Em seguida, você pode verificar a funcionalidade da integração como ela seria usada pelo usuário.
Se você deseja fazer alterações na versão após a moderação (aprovação/rejeição/ou se você retirou a versão), pode criar uma nova versão e fazer as alterações nela. Para fazer isso, clique no botão +Adicionar Versão na janela modal da integração.
Você pode verificar a versão que aparece no Marketplace abrindo o logo em uma aba separada e olhando o número no link após o código do widget, ou utilizando as Ferramentas de Desenvolvedor (Dev Tools)
https://subdomain.kommo.com/upl/my_integration/1/widget/images/en/logo_main.png?version=1
Uma vez que a integração tenha sido enviada para moderação ou publicada, ela não pode ser completamente excluída. Você pode apenas excluir a nova versão não publicada e adicioná-la novamente. Para fazer isso, use o botão Excluir Versão localizado à direita do campo de texto.
Você também pode ver uma aba chamada Minhas inscrições no topo da seção de integrações, onde você pode visualizar a integração pública que você criou.
Na conta técnica, seu widget é exibido em dois estados:
- Como uma ferramenta de gerenciamento de integração na seção Minhas Inscrições, onde o desenvolvedor pode fazer alterações
- Como uma integração finalizada que o usuário vê no Marketplace
Se a integração ainda não foi publicada e uma categoria ainda não foi selecionada, ela será exibida para o usuário no Marketplace sob a categoria Outros.
Ela também pode ser colocada na categoria selecionada durante a publicação e na seção Instalados.

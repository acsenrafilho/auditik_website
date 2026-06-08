---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/br/recursos/integracoes/paypal-como-criar-faturas"
date: "2022-10-27"
---

Você também pode criar faturas automáticas a partir do Funil de Vendas Digital. Pode ser um pouco complicado, mas quando você faz isso, pode economizar muito tempo e energia. Além disso, ele permite que você mova seus leads para uma etapa diferente automaticamente quando o pagamento é concluído.
Para isso, você precisa instalar um widget do PayPal no Funil de Vendas Digital e depois criar um pequeno bot para enviar o link para o usuário.
-
Vá até Leads > Configuração e clique no ícone de ‘mais’ abaixo da etapa em que você deseja aplicar o gatilho.
- Depois, desça até o widget do PayPal e clique em 'Adicionar'.
- Na janela do widget, escolha a entrada legal, defina a data de vencimento e aplique tarifas e descontos, se necessário.
A fatura é calculada com base nos preços dos produtos agregados ao Lead. Se você quiser que ela seja calculada de acordo com o preço de venda do Lead, então ligue a chave múltipla no meio.
Você também pode optar por enviar o Lead para outra etapa do Lead quando o pagamento for concluído. Para isso, ligue a chave múltipla na parte inferior e escolha o funil para o qual o Lead deve ser movido após o pagamento.
- Quando tudo estiver configurado, clique em "Pronto"
A parte complicada é que este widget só pode criar a fatura, mas não pode enviá-la ao usuário. É por isso que você também precisa criar um pequeno bot que enviará o link de pagamento.
-
Para criar um bot, vá em Configurações > Ferramentas de Comunicação > Salesbot e escolha criar um novo bot.
- Na janela seguinte, desça até o fundo e escolha 'Começar do zero'.
- Em seguida, escolha a etapa 'Mensagem' e digite seu texto com o espaço reservado para o link do pagamento. Por exemplo, você pode escrever 'Olá! Aqui está o link de pagamento para sua compra [link da fatura PayPal]'.
- Finalmente, clique no campo Executar, vá para 'Quando movido para esta etapa de acionar', clique em 'Imediatamente' e escolha 'após 5 minutos' para o período de tempo. Você pode colocar o intervalo de tempo que quiser nesta parte. Isto enviará o link para o usuário após este período de tempo.
- Agora clique em Pronto, salve as mudanças. Agora você pode deixar o Funil de Vendas Digital.
Agora, ao mover o Lead para esta etapa, será criada uma fatura automática e o status do Lead será alterado automaticamente quando o pagamento for concluído.

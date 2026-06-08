---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/br/recursos/integracoes/make-anteriormente-integromat-como-usar"
date: "2022-09-15"
---

Módulo é um nome geral para as etapas de seu cenário. O Make tem cinco tipos de módulos:
- Ações
- Gatilhos
- Buscas
- Agregadores
- Iteradores
Os dois últimos são destinados a cenários avançados.
O cenário é composto de vários módulos que decidem como os dados são transferidos ou transformados entre aplicativos ou serviços.
Ações – são o tipo mais comum de módulo.
- Um módulo de ação típico retorna apenas um único pacote, que é então passado para o próximo módulo para processamento.
- Os módulos de ação podem ser colocados no início, no meio ou no final de um cenário.
- Os cenários podem conter um número ilimitado de módulos de ação.
Por exemplo, você escolheu a ação "Criar um lead" na Kommo. Quando você cria um cenário, digamos, com o Twitter, ele navegará pelos possíveis leads de acordo com os eventos escolhidos e os transformará em cartões de lead em seu funil de vendas. Super prático, não é?
Módulos de gatilhos – iniciar o processo quando houver uma alteração em um determinado serviço. A alteração pode ser a criação de um novo registro, a exclusão de um registro, a atualização de um registro etc.
- Cada gatilho pode retornar zero, um ou mais pacotes, que são então passados para o próximo módulo para processamento.
- Os gatilhos podem ser colocados somente no início de um cenário.
- Cada cenário pode conter apenas um gatilho.
Por exemplo, posso escolher o gatilho Watch events e marcar a opção "The responsible user changed for the Lead" (O usuário responsável foi alterado para o lead). Quando o usuário responsável for alterado para um lead, seu cenário será iniciado.
Buscas – recupera os dados que correspondem aos parâmetros que você especificar.
- Um módulo de pesquisa típico retorna zero, um ou mais pacotes, que são então passados para o próximo módulo para processamento.
- Os módulos de pesquisa podem ser colocados no início, no meio ou no final de um cenário.
- Os cenários podem conter um número ilimitado de módulos de pesquisa.
Agregadores – são módulos que acumulam vários pacotes em um único pacote.
- Cada agregador retorna apenas um pacote, que é então passado para o próximo módulo para processamento adicional.
- Os agregadores só podem ser colocados no meio de um cenário.
- Os cenários podem conter um número ilimitado de agregadores.
Iteradores – são módulos que dividem as matrizes em vários pacotes separados.
- Cada iterador retorna um ou mais pacotes que são passados para o próximo módulo para processamento.
- Os iteradores só podem ser colocados no meio de um cenário.
- Os cenários podem conter um número ilimitado de iteradores.

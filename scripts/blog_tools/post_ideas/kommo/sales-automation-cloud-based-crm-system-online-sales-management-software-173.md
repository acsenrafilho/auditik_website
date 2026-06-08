---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/br/recursos/crm/importacao-avancado"
date: "2022-09-26"
---

Gerencie opções avançadas de importação
Tipos de campo durante a importação
-
Tipos de campos de data: Para importar qualquer tipo de campo de data, você precisará usar o seguinte formato de data: DD.MM.YYYY ou MM.DD.YYYYY. Caso contrário, não será importado. Se você planeja importar qualquer data, o arquivo deverá estar no formato .csv. -
Data de criação: Se a data de criação não estiver indicada no arquivo, será a data de sua importação. -
Aniversário: Se o formato da data estiver incorreto, o campo de aniversário conterá a seguinte data: 01.01.1970 -
Tipos de campo de seleção: Todas as opções selecionadas são sensíveis à capitalização e precisam ser soletradas corretamente, caso contrário, uma nova opção é criada. Você pode desmarcar a opção “Adicionar itens à lista automaticamente” para evitar isso. -
Multiseleção: Se você precisar importar algumas opções ao mesmo tempo, separe as opções por vírgulas: opção 1, opção 2, opção 3. -
Botão de rádio: Se a opção e -
Caixa de seleção: Para que a caixa possa ser marcada, digite o valor "Sim" na célula. Se você não precisa que a caixa seja marcada, então deixe esta célula vazia. -
Tipos de campos numéricos: Para estes tipos de campos (incluindo Venda), o valor deve ser um número inteiro. -
Endereço: Só pode haver um campo de tipo de endereço. Para importar este tipo de arquivo, divida o valor nas seguintes colunas: País, Região, Cidade, Código Postal, Endereço.
Importação de dados para diferentes funis de vendas e etapas
Os nomes devem ser escritos de forma idêntica ao nome do funil de vendas/etapa na Kommo. O nome 'funil de vendas' não é sensível à capitalização, mas se você escrever errado, os leads carregados vão para a primeira etapa do primeiro funil de vendas. O nome 'status do lead’ só aceita o formato 'primeira palavra maiúscula'. Por exemplo, 'Oferta feita' ou 'Contato inicial'. Se você acrescentar apenas as colunas 'Status de lead', os leads serão importados para o primeiro funil de vendas.
Como a Kommo lida com as duplicatas durante a importação?
Se duas linhas em seu arquivo forem absolutamente idênticas, a Kommo importará apenas uma linha. Se dois títulos de leads diferentes tiverem o mesmo contato e nome da empresa, dois leads separados serão importados com o mesmo contato e a mesma empresa anexada a eles. Os contatos com uma empresa e um lead diferentes são contados como contatos diferentes. Se dois contatos principais tiverem o mesmo nome de contato e nenhuma empresa, serão importados dois contatos principais diferentes com o mesmo contato: Se os contatos e leads são os mesmos e as empresas são diferentes, então nada será fundido.

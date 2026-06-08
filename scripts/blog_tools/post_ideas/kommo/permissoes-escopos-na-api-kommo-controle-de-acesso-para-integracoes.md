---
title: "Permissões & Escopos na API Kommo: Controle de Acesso para Integrações"
source: "https://pt-developers.kommo.com/docs/permiss%C3%B5es"
date: "2026-06-03"
---

O Scope (Lista de permissões) é um conjunto de ações em nome do usuário que está disponível para uma integração por meio do protocolo OAuth.
As permissões são categorizadas em dois grupos:
- Acesso aos dados da conta com base nos direitos do usuário. Todos os métodos da API são acessíveis, exceto aqueles que interagem com o Centro de Notificações.
- Centro de Notificações
A integração só pode ser instalada por administradores e autorizada por diferentes usuários. Devido a isso, existem limitações nos direitos de acesso aos dados, com base nas permissões e direitos de quem autorizou.
O administrador da conta tem a capacidade de revogar o acesso de qualquer integração instalada para qualquer usuário. Isso pode ser feito na seção de integrações dentro da janela modal da integração. Os usuários só podem revogar o acesso que eles próprios concederam em seu perfil. Caso o acesso precise ser restabelecido, será necessário solicitar permissão novamente aos administradores da conta e aos usuários.
A notificação sobre a revogação de acesso será enviada ao webhook (Webhook de notificação de acesso revogado) especificado ao criar a integração.
Se você alterou as permissões solicitadas pela sua integração, deve solicitar novamente aos usuários que já a habilitaram para concederem acesso.
Exemplo:
Ao criar uma integração, você não selecionou o acesso ao Centro de Notificações, e os usuários já concederam à sua integração um acesso com escopo limitado. Depois disso, você editou o escopo nas configurações da integração para permitir todos os direitos. Isso significa que os usuários que tinham o escopo limitado continuarão a operar nesse escopo. Para obter o novo escopo desses mesmos usuários, será necessário solicitar permissão novamente.

---
title: "Integração Privada Kommo: Criar & Configurar para Conta Única"
source: "https://pt-developers.kommo.com/docs/integra%C3%A7%C3%A3o-privada"
date: "2026-02-19"
---

Integrações privadas são utilizadas para fazer uma melhoria para apenas uma conta ou para adicionar um recurso que apenas uma empresa/conta necessita (por exemplo, um formulário para um site, integração com o software exclusivo do cliente, etc.).
☝️
Para criar uma integração, você precisa ter direitos de administrador da conta
A integração será atribuída a esta conta. Isso significa que qualquer um dos administradores desta conta poderão gerenciar a integração e terão acesso às suas chaves compartilhadas.
O cliente deve entender até que ponto as integrações dão acesso a dados da conta.
Qualquer integração deve ser registrada em uma conta para receber chaves de autorização, pois não podem existir chamadas de API anônimas.
Conta Kommo
Para desenvolver uma integração privada basta registrar uma conta no nosso site Kommo.com. Você pode usar uma conta teste ou sua própria conta de negócios.
Agora, quando você tem uma conta, vamos ver como uma integração pode afetá-la!
Instrumentos
Integrações privadas podem trabalhar com os seguintes instrumentos:
Criando uma integração privada
Esse tipo de integração pode ser desenvolvido em qualquer tipo de conta. Sinta-se à vontade para usar sua conta de negócios ou uma conta técnica para o desenvolvimento (ou até mesmo uma conta de teste).
👍
Integrações privadas não precisam passar por moderação!
Para criar uma integração, siga estas etapas:
Faça login como um administrador da conta.
Vá para Configurações → Integrações, clique no botão Criar integração e envie o formulário.
Se você usar uma conta técnica, deve escolher Privada para criar uma integração privada.
Após clicar no botão Criar integração você verá um formulário contendo as propriedades da integração.
🚧
Se você for usar um Token de Longa Duração, não digite nada no campo URL de Redirecionamento.
Propriedades de integração
Como você percebeu, você pode enviar um widget para a integração. Uma integração sem um widget pode ser usada apenas para obter as chaves necessárias para acessar a API, mas o widget é a parte que contém os detalhes de programação.
Agora salve a integração. O Kommo gerará e exibirá as chaves necessárias na aba Chaves e escopos. Você pode usar o Token de Longa Duração e/ou Código de autorização no processo de autorização, Chave Secreta e ID de Integração serão usados independentemente da conta em que será instalada. Se você enviar um widget, um Código Widget também será gerado.

---
title: "Tema Escuro no Kommo: Uso de Variáveis CSS & Integração de Estilo"
source: "https://pt-developers.kommo.com/docs/tema-escuro"
date: "2026-02-19"
---

Se você clicar no seu avatar de perfil localizado no canto superior esquerdo da tela, uma opção para escolher o tema da interface aparecerá no canto direito: claro ou escuro. Você pode selecionar um tema manualmente ou configurar a troca automática para ativar o tema escuro com base nas configurações do sistema operacional.
O tema escuro no Kommo permite aos usuários personalizar a interface de acordo com suas preferências. Para integrá-lo com sucesso, é essencial usar variáveis CSS pré-definidas e seguir regras específicas para garantir a consistência do design.
O tema escuro no Kommo depende do uso de variáveis declaradas em CSS. Essas variáveis permitem personalizar as cores e parâmetros de estilo da interface. Para acessar essas variáveis, você deve consultar o layout no Figma, onde elas estão descritas e demonstradas em detalhes.
Aqui usamos um campo de input como exemplo.
.input {
color: var(--palette-text-secondary-dark);
border: 1px solid var(--palette-border-default);
background-color: var(--palette-background-primary);
}
Ao desenvolver integrações com o tema escuro do Kommo, recomendamos seguir as seguintes regras:
- Utilize as variáveis fornecidas para garantir consistência e evitar conflitos, mas, se tiver cores corporativas, é possível usar variáveis personalizadas.
- Não sobrescreva variáveis predefinidas. Isso ajuda a manter a consistência do estilo e evita incompatibilidades com atualizações do sistema.
- Use variáveis apenas para elementos correspondentes (por exemplo, variáveis de texto devem ser aplicadas somente a elementos de texto)..
O suporte para temas claro e escuro é implementado via o atributo data
na tag HTML [data-color-scheme="dark"]
. O sistema utiliza variáveis de cores declaradas através de :root
. Você deve criar variáveis únicas incorporando o código do seu widget no nome da variável.
:root {
--example-code-widget-color-white: #ffffff;
--example-code-widget-color-anti-flash-white: #f2f2f2;
--example-code-widget-color-cultured: #f5f5f5;
--example-code-widget-color-onyx: #363b44;
--example-code-widget-color-dark-gunmetal: #0f2231;
--example-code-widget-color-spanish-gray: #92989b;
--example-code-widget-color-dark-silver: #6b6d72;
}
Ao definir variáveis para fundo e texto, use variáveis de cores existentes. Em casos especiais, é aceitável usar cores sem variáveis.
:root {
--example-code-widget-text-primary: var( --example-code-widget-color-onyx); /* texto */
--example-code-widget-background-default: var(--example-code-widget-color-cultured); /* fundo */
--example-code-widget-overlay-background-primary-600: rgba(255, 255, 255, 0.6); /* caso especial de fundo */
}
No tema escuro, você precisa usar o atributo data
.
:root[data-color-scheme="dark"] {
--example-code-widget-text-primary: var(--example-code-widget-color-anti-flash-white); /* texto */
--example-code-widget-background-default: var(--example-code-widget-color-dark-gunmetal); /* fundo */
--example-code-widget-overlay-background-primary-600: rgba(0, 0, 0, 0.6); /* caso especial para opacidade */
}

# Content Guidelines for Auditik Website

Guidelines for creating and managing content using TinaCMS.

## Blog Posts

### Creating a New Blog Post

1. Go to the website admin: `yoursite.com/admin`
2. Click `Blog Posts` in the left menu
3. Click `+ New Post`

### Blog Post Fields

| Field            | Description                           | Example                                      |
| ---------------- | ------------------------------------- | -------------------------------------------- |
| Title            | Main article title                    | `5 Sinais de Perda Auditiva`                 |
| Description      | SEO description, up to 160 characters | `Conheça os principais sinais...`            |
| Author           | Who wrote it                          | `Auditik Equipe` or your name                |
| Publication Date | Publish date                          | `2024-04-09`                                 |
| Topics           | One or more fixed article topics      | `Perda auditiva`, `Tecnologia`, `Manutenção` |
| Featured Image   | Hero image for article                | Upload JPG or PNG                            |
| Featured Post    | Show on homepage                      | Check if important article                   |
| Body             | Main article content                  | Write or paste Markdown                      |

### Fixed Blog Topics

Use only the topic values available in TinaCMS. The blog UI filters by these fixed topics:

- Perda auditiva e sinais de alerta
- Diagnóstico e avaliação auditiva
- Aparelhos auditivos Philips HearLink
- Tecnologia, IA e conectividade
- Adaptação, uso e manutenção
- Acessórios e carregamento
- Convênios e acesso ao tratamento
- Depoimentos e qualidade de vida
- Dúvidas frequentes e mitos
- Promoções e novidades da marca

### Writing Tips

- Use clear, simple Portuguese
- Break text into short paragraphs
- Include a call-to-action when relevant
- Write for people, not search engines
- Proofread before publishing

### Image Requirements

- Format: JPG or PNG
- Recommended size: 1200x630px for featured images
- File size: under 500KB
- Add alt text that describes the image

All images go into `public/images/`. TinaCMS uploads them automatically.

### Publishing Workflow

1. Draft the article in TinaCMS
2. Proofread and preview it
3. Click `Save & Publish`
4. Tina writes the markdown file into `content/blog/`
5. Git deploys the change when the commit reaches `main`

### What You Should Not Edit Manually

These items should be handled by developers:

- Header / navigation
- Footer layout
- Blog page layout templates
- Contact form structure
- Global styling system

## Clube de Beneficios (Convenios)

### Managing Partners

1. Go to website admin: yoursite.com/admin
2. Click Clube de Beneficios in the left menu
3. Click New and create one partner file per card
4. Save and publish

Each partner card is generated from one markdown file in content/convenios/.

### Required Partner Fields

| Field                           | Description                              | Example                                   |
| ------------------------------- | ---------------------------------------- | ----------------------------------------- |
| Nome do parceiro                | Full public partner name                 | Espaco Sorriso Auditivo                   |
| Slug da URL                     | Portuguese descriptive slug for route    | espaco-sorriso-auditivo                   |
| Descricao curta                 | Summary shown in card list               | Beneficio exclusivo para clientes Auditik |
| Endereco                        | Full address shown in card               | Av. Exemplo, 123 - Centro, Piracicaba/SP  |
| Telefone                        | Contact phone shown in card              | (19) 3333-1234                            |
| URL do Google Maps              | Maps link used for route/location button | https://maps.app.goo.gl/...               |
| Cidades                         | One or more supported cities             | piracicaba, americana                     |
| Area de atuacao                 | One or more controlled areas             | saude, tecnologia, bem-estar              |
| Tipo de beneficio               | Category used in filter                  | desconto, cashback                        |
| Perfil de cliente               | Audience category                        | idosos, familias, empresas                |
| Resumo do beneficio em destaque | Highlight text in detail page            | 15% de desconto na avaliacao inicial      |
| Detalhes completos do beneficio | Markdown body rendered in detail page    | Steps, conditions and rules               |

### Optional Fields

| Field                | Description                        | Example                        |
| -------------------- | ---------------------------------- | ------------------------------ |
| Parceiro em destaque | Pushes card to top and shows badge | true                           |
| Logo do parceiro     | Replaces automatic initials avatar | /images/partners/nome-logo.png |

### Card Rendering Rules

1. Card list page shows only summary info:
   address, phone, tags and short description.
2. Detailed benefit rules are shown only inside the partner detail page.
3. If logo is empty, the card uses an automatic initials avatar.
4. Google Maps URL enables:
   Ver no mapa link near address and Abrir rota no Google Maps action.

### Creating a New Card Fast

1. Duplicate content/convenios/.template.md
2. Rename file to your desired slug-name.md
3. Fill all required frontmatter fields
4. Write benefit details in markdown body
5. Publish and validate in /convenios and /convenios/slug

### Convenios Quality Checklist

1. Slug is unique and readable
2. Google Maps URL opens the exact partner location
3. Address and phone are complete and human readable
4. At least one city, area, benefit type and client profile are selected
5. Benefit summary is objective and clear
6. Markdown body includes activation steps and eligibility rules
7. Card and detail page links are working

## Content Best Practices

### SEO Titles

- Keep under 60 characters
- Include the main keyword
- Keep the title specific and useful

### SEO Descriptions

- Keep between 150 and 160 characters
- Summarize the article clearly
- Include a helpful call to action when appropriate

### URLs

- URLs are generated from the title
- Use hyphens instead of underscores
- Example: `5 Sinais de Perda Auditiva` → `/blog/5-sinais-de-perda-auditiva`

## Pre-Publishing Checklist

- Title is clear and compelling
- SEO description is written
- Featured image is uploaded and optimized
- Topics are selected from the fixed list
- Body content is spell-checked
- Links work correctly
- Author name is correct
- Publication date is correct
- Call to action is included where useful

## Help & Support

**TinaCMS Questions?**

- Review the TinaCMS docs at [tina.io](https://tina.io/)

**Content Questions?**

- Email: atendimento@auditik.com.br
- WhatsApp: (19) 3377-6941

**Technical Issues?**

- Report bugs in the repository
- Or contact the development team

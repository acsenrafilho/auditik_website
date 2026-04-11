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

## Insurance Partners (Convênios)

### Managing Insurance Partners

1. Go to website admin: `yoursite.com/admin`
2. Click `Insurance Partners` in the left menu
3. Click `+ New Partner` or edit an existing entry

### Partner Fields

| Field        | Description                         | Example                                |
| ------------ | ----------------------------------- | -------------------------------------- |
| Partner Name | Full name of the insurer or partner | `Unimed Piracicaba`                    |
| Description  | Brief overview                      | `Cobertura completa para aparelhos...` |
| Benefits     | What customers get                  | `Cobertura 100%, Consultas grátis`     |
| Coverage     | Which devices are covered           | `HearLink 100H, 500, 700`              |
| Contact Info | How to verify coverage              | `Central: 0800-123-4567`               |
| Logo         | Partner company logo                | Upload PNG or SVG                      |

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

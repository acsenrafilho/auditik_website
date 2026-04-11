import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        label: "Blog Posts",
        name: "blog",
        path: "content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description (SEO)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "date",
            label: "Publication Date",
            ui: {
              component: "datetime",
            },
          },
          {
            type: "string",
            list: true,
            name: "topics",
            label: "Topics",
            options: [
              {
                label: "Perda auditiva e sinais de alerta",
                value: "perda-auditiva",
              },
              {
                label: "Diagnóstico e avaliação auditiva",
                value: "diagnostico-avaliacao",
              },
              {
                label: "Aparelhos auditivos Philips HearLink",
                value: "aparelhos-philips-hearlink",
              },
              {
                label: "Tecnologia, IA e conectividade",
                value: "tecnologia-conectividade",
              },
              {
                label: "Adaptação, uso e manutenção",
                value: "adaptacao-manutencao",
              },
              {
                label: "Acessórios e carregamento",
                value: "acessorios-carregamento",
              },
              {
                label: "Convênios e acesso ao tratamento",
                value: "convenios-acesso",
              },
              {
                label: "Depoimentos e qualidade de vida",
                value: "depoimentos-qualidade-de-vida",
              },
              {
                label: "Dúvidas frequentes e mitos",
                value: "duvidas-frequentes",
              },
              {
                label: "Promoções e novidades da marca",
                value: "novidades-promocoes",
              },
            ],
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Post",
          },
          {
            type: "string",
            name: "body",
            label: "Body",
            isBody: true,
            ui: {
              component: "markdown",
            },
          },
        ],
      },
      {
        label: "Clube de Benefícios",
        name: "convenios",
        path: "content/convenios",
        format: "md",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Nome do parceiro",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug da URL",
            required: true,
            description:
              "Use formato descritivo em portugues, ex: farmacia-centro-piracicaba",
          },
          {
            type: "string",
            name: "description",
            label: "Descrição curta (listagem)",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "address",
            label: "Endereço",
            required: true,
          },
          {
            type: "string",
            name: "phone",
            label: "Telefone",
            required: true,
          },
          {
            type: "string",
            name: "googleMapsUrl",
            label: "URL do Google Maps",
            required: true,
            description:
              "Cole a URL do local no Google Maps para habilitar o botão de rota no card e no detalhe.",
          },
          {
            type: "image",
            name: "logo",
            label: "Logo do parceiro (opcional)",
          },
          {
            type: "string",
            list: true,
            name: "gallery",
            label: "Galeria manual (opcional)",
            description:
              "URLs de imagens para fallback quando o Google Maps nao disponibilizar fotos automaticamente.",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Parceiro em destaque",
          },
          {
            type: "string",
            list: true,
            name: "cities",
            label: "Cidades",
            required: true,
            options: [
              { label: "Piracicaba", value: "piracicaba" },
              { label: "Americana", value: "americana" },
              { label: "Campinas", value: "campinas" },
              { label: "Limeira", value: "limeira" },
              { label: "Sumaré", value: "sumare" },
            ],
          },
          {
            type: "string",
            list: true,
            name: "areas",
            label: "Área de atuação",
            required: true,
            options: [
              { label: "Saúde", value: "saude" },
              { label: "Tecnologia", value: "tecnologia" },
              {
                label: "Serviços Empresariais",
                value: "servicos-empresariais",
              },
              { label: "Alimentação", value: "alimentacao" },
              { label: "Serviços Pessoais", value: "servicos-pessoais" },
              { label: "Educação", value: "educacao" },
              { label: "Bem-estar", value: "bem-estar" },
            ],
          },
          {
            type: "string",
            list: true,
            name: "benefitTypes",
            label: "Tipo de benefício",
            required: true,
            options: [
              { label: "Desconto", value: "desconto" },
              { label: "Cashback", value: "cashback" },
              { label: "Serviço gratuito", value: "servico-gratuito" },
              { label: "Upgrade", value: "upgrade" },
              {
                label: "Benefício exclusivo",
                value: "beneficio-exclusivo",
              },
            ],
          },
          {
            type: "string",
            list: true,
            name: "clientProfiles",
            label: "Perfil de cliente",
            required: true,
            options: [
              { label: "Idosos", value: "idosos" },
              { label: "Famílias", value: "familias" },
              { label: "Estudantes", value: "estudantes" },
              { label: "Empresas", value: "empresas" },
              { label: "Público geral", value: "publico-geral" },
            ],
          },
          {
            type: "string",
            name: "benefitSummary",
            label: "Resumo do benefício em destaque",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "body",
            label: "Detalhes completos do benefício",
            isBody: true,
            ui: {
              component: "markdown",
            },
          },
        ],
      },
    ],
  },
});

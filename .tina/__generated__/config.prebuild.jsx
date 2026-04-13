// .tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
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
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description (SEO)",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "author",
            label: "Author"
          },
          {
            type: "string",
            name: "date",
            label: "Publication Date",
            ui: {
              component: "datetime"
            }
          },
          {
            type: "string",
            list: true,
            name: "topics",
            label: "Topics",
            options: [
              {
                label: "Perda auditiva e sinais de alerta",
                value: "perda-auditiva"
              },
              {
                label: "Diagn\xF3stico e avalia\xE7\xE3o auditiva",
                value: "diagnostico-avaliacao"
              },
              {
                label: "Aparelhos auditivos Philips HearLink",
                value: "aparelhos-philips-hearlink"
              },
              {
                label: "Tecnologia, IA e conectividade",
                value: "tecnologia-conectividade"
              },
              {
                label: "Adapta\xE7\xE3o, uso e manuten\xE7\xE3o",
                value: "adaptacao-manutencao"
              },
              {
                label: "Acess\xF3rios e carregamento",
                value: "acessorios-carregamento"
              },
              {
                label: "Conv\xEAnios e acesso ao tratamento",
                value: "convenios-acesso"
              },
              {
                label: "Depoimentos e qualidade de vida",
                value: "depoimentos-qualidade-de-vida"
              },
              {
                label: "D\xFAvidas frequentes e mitos",
                value: "duvidas-frequentes"
              },
              {
                label: "Promo\xE7\xF5es e novidades da marca",
                value: "novidades-promocoes"
              }
            ]
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image"
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Post"
          },
          {
            type: "string",
            name: "body",
            label: "Body",
            isBody: true,
            ui: {
              component: "markdown"
            }
          }
        ]
      },
      {
        label: "Clube de Benef\xEDcios",
        name: "convenios",
        path: "content/convenios",
        format: "md",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Nome do parceiro",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug da URL",
            required: true,
            description: "Use formato descritivo em portugues, ex: farmacia-centro-piracicaba"
          },
          {
            type: "string",
            name: "description",
            label: "Descri\xE7\xE3o curta (listagem)",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "address",
            label: "Endere\xE7o",
            required: true
          },
          {
            type: "string",
            name: "phone",
            label: "Telefone",
            required: true
          },
          {
            type: "string",
            name: "googleMapsUrl",
            label: "URL do Google Maps",
            required: true,
            description: "Cole a URL do local no Google Maps para habilitar o bot\xE3o de rota no card e no detalhe."
          },
          {
            type: "image",
            name: "logo",
            label: "Logo do parceiro (opcional)"
          },
          {
            type: "string",
            list: true,
            name: "gallery",
            label: "Galeria manual (opcional)",
            description: "URLs de imagens para fallback quando o Google Maps nao disponibilizar fotos automaticamente."
          },
          {
            type: "boolean",
            name: "featured",
            label: "Parceiro em destaque"
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
              { label: "Sumar\xE9", value: "sumare" }
            ]
          },
          {
            type: "string",
            list: true,
            name: "areas",
            label: "\xC1rea de atua\xE7\xE3o",
            required: true,
            options: [
              { label: "Sa\xFAde", value: "saude" },
              { label: "Tecnologia", value: "tecnologia" },
              {
                label: "Servi\xE7os Empresariais",
                value: "servicos-empresariais"
              },
              { label: "Alimenta\xE7\xE3o", value: "alimentacao" },
              { label: "Servi\xE7os Pessoais", value: "servicos-pessoais" },
              { label: "Educa\xE7\xE3o", value: "educacao" },
              { label: "Bem-estar", value: "bem-estar" }
            ]
          },
          {
            type: "string",
            list: true,
            name: "benefitTypes",
            label: "Tipo de benef\xEDcio",
            required: true,
            options: [
              { label: "Desconto", value: "desconto" },
              { label: "Cashback", value: "cashback" },
              { label: "Servi\xE7o gratuito", value: "servico-gratuito" },
              { label: "Upgrade", value: "upgrade" },
              {
                label: "Benef\xEDcio exclusivo",
                value: "beneficio-exclusivo"
              }
            ]
          },
          {
            type: "string",
            list: true,
            name: "clientProfiles",
            label: "Perfil de cliente",
            required: true,
            options: [
              { label: "Idosos", value: "idosos" },
              { label: "Fam\xEDlias", value: "familias" },
              { label: "Estudantes", value: "estudantes" },
              { label: "Empresas", value: "empresas" },
              { label: "P\xFAblico geral", value: "publico-geral" }
            ]
          },
          {
            type: "string",
            name: "benefitSummary",
            label: "Resumo do benef\xEDcio em destaque",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "body",
            label: "Detalhes completos do benef\xEDcio",
            isBody: true,
            ui: {
              component: "markdown"
            }
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};

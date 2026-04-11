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
        label: "Insurance Partners (Conv\xEAnios)",
        name: "convenios",
        path: "content/convenios",
        format: "md",
        fields: [
          {
            type: "object",
            list: true,
            name: "partners",
            label: "Insurance Partners",
            ui: {
              itemProps: (item) => {
                return { label: item?.name };
              }
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Partner Name",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "benefits",
                label: "Benefits (comma-separated)",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "coverage",
                label: "Coverage Details",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "contactInfo",
                label: "Contact Information"
              },
              {
                type: "image",
                name: "logo",
                label: "Partner Logo"
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};

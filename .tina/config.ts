import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputDir: "admin",
    publicDir: "public",
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
        format: "mdx",
        fields: [
          {
            type: "object",
            list: false,
            name: "frontmatter",
            label: "Front Matter",
            ui: {
              itemProps: (item: any) => {
                return { label: item?.title };
              },
            },
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
                name: "category",
                label: "Category",
                options: [
                  { label: "Saúde Auditiva", value: "saude-auditiva" },
                  { label: "Tecnologia", value: "tecnologia" },
                  { label: "Depoimentos", value: "depoimentos" },
                  { label: "Dicas", value: "dicas" },
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
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        label: "Insurance Partners (Convênios)",
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
              itemProps: (item: any) => {
                return { label: item?.name };
              },
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Partner Name",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "benefits",
                label: "Benefits (comma-separated)",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "coverage",
                label: "Coverage Details",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "contactInfo",
                label: "Contact Information",
              },
              {
                type: "image",
                name: "logo",
                label: "Partner Logo",
              },
            ],
          },
        ],
      },
    ],
  },
});

import { Html, Head, Main, NextScript } from 'next/document';
import { generateOrganizationSchema } from '@lib/schema';

export default function Document() {
  const schemaData = generateOrganizationSchema();

  return (
    <Html lang="pt-BR">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <body className="font-sans text-gray-800 bg-white antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

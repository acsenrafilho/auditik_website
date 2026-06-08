---
title: "Estrutura do Widget Kommo: Arquivos, Manifest.json & Pastas Obrigatórias"
source: "https://pt-developers.kommo.com/docs/estrutura-do-widget"
date: "2026-02-19"
---

Um widget representa a integração de interface de usuário e pode ser usado para personalizar e expandir a funcionalidade da Kommo, como exibir dados em áreas específicas, interagir com o usuário ou ajustar configurações por administradores.
Estruturalmente, um widget é um arquivo compactado contendo arquivos JavaScript, CSS e modelos Twig, que podem ser carregados no sistema. Ao conectar o widget, seus arquivos JS e layout serão carregados no navegador junto com a interface da Kommo, permitindo que o integrador interaja com o usuário, utilize a API da Kommo ou a API de seu próprio serviço diretamente na interface do Kommo.
Se você descompactar o widget.zip, verá os seguintes arquivos:
- Codificação: Todos os arquivos devem estar em codificação UTF-8 sem BOM.
- Antes de fazer o upload do widget pela primeira vez, você deve atualizar o código e a chave no arquivo manifest.json com os valores exclusivos que você gerou.
- Normalmente, em um arquivo compactado, há uma pasta de widget no nível raiz. No entanto, os arquivos devem já estar no nível raiz do arquivo.
- Se o manifest.json incorreto foi enviado inicialmente, será necessário gerar um novo código e chave, pois o anterior não será mais válido.

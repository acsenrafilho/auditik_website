---
title: "Limitações da API Kommo – regras de uso, limites de entidades"
source: "https://pt-developers.kommo.com/docs/limita%C3%A7%C3%B5es"
date: "2026-02-17"
---

Toda comunicação com a API ocorre de forma criptografada pelo protocolo SSL. Isso significa que todas as referências à API devem conter o protocolo HTTPS. É especialmente importante lembrar disso ao acessar nosso sistema através do JavaScript, particularmente ao se referir a recursos de terceiros, como ao acessar WebSockets. Dentro do sistema, os usuários estão sempre em uma conexão segura, e tentativas de acessar conteúdo HTTP serão bloqueadas ou resultarão em um aviso do navegador do usuário.
Token de Acesso, Token de Atualização, client_secret, ou Token de Longa Duração devem ser armazenados em um local seguro, pois esses dados são privados. No caso de um vazamento de dados, é essencial atualizar primeiro o client_secret da integração, seguido pelos Token de Acesso e Token de Atualização.
Todas as solicitações não devem ser feitas no domínio comumhttp://www.kommo.com
, mas no endereço exato da sua conta, por exemplo, https://subdomínio.kommo.com
.
Para trabalhar com nossa API, é necessário um dos seguintes protocolos criptográficos: TLS 1.1 ou TLS 1.2. A versão recomendada é TLS 1.2.
A biblioteca cURL suporta TLS 1.1 / 1.2, a partir da versão 7.34.0. Nos parâmetros da sessão cURL, você pode especificar explicitamente a versão do protocolo:
$curl=curl_init(); #Salva o descritor da sessão cURL.
curl_setopt($curl, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_2);
Recusamos completamente o suporte ao protocolo SSLv3, pois este protocolo é considerado vulnerável.
Existem mecanismos para limitar a atividade ao trabalhar com a API – não mais do que 7 solicitações por segundo.
No caso de atividade suspeita via API ou falha de integração, as solicitações do seu endereço IP serão restringidas. Por exemplo, se os mesmos dados forem solicitados várias vezes em um curto período, ou se houver uma iteração descontrolada através de todos os dados. Recomendamos o uso do cabeçalho If-Modified-Since ao trabalhar com listas de leads, contatos, empresas ou tarefas.
Código HTTP 429: no caso de exceder o número de solicitações – o código HTTP 429 será retornado.
Código HTTP 403: se as restrições forem repetidamente violadas, o endereço IP será bloqueado e qualquer código na API retornará o código HTTP 403 para qualquer solicitação.
- O número máximo de entidades retornadas (leads / contatos / empresas) não mais do que 250.
- O número máximo de entidades adicionadas/atualizadas não mais do que 250.
Para um desempenho de integração otimizado e para evitar erros, recomendamos adicionar/atualizar não mais do que 50. Se você receber um código HTTP 504, recomendamos reduzir o número de entidades adicionadas/atualizadas na solicitação e repetir a solicitação. - O número máximo de fontes por integração é 100.
- Você pode passar apenas 40 valores de campos personalizados por entidade adicionada ao realizar a adição complexa de um lead.
- O número máximo de Pipelines na conta é 50.
- Cada Pipeline pode ter no máximo 100 etapas incluindo as do sistema (Venda Perdida e Venda Ganha).
- O número de webhooks por conta é limitado a 100
- O número máximo de lists por conta é 10
- O armazenamento de arquivos é limitado a 10 GB em uma conta teste.

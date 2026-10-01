# Odontologia Horibe — versão restaurada

Site estático em HTML5, CSS3 e JavaScript vanilla. Sem dependências npm, React, Next.js, Tailwind, banco de dados ou backend.

## Abrir e hospedar

Abra index.html diretamente ou execute `node scripts/serve.mjs` para a prévia em http://127.0.0.1:3000. Nenhuma instalação é necessária.

Para hospedagem, copie index.html, css/, js/, assets/, robots.txt e sitemap.xml. Os caminhos relativos funcionam inclusive em subpastas. Ajuste as URLs absolutas de SEO ao domínio final. Não publique artifacts/, scripts/ ou documentação.

Comandos opcionais: `npm run lint` verifica arquivos, âncoras, schema, contatos e sintaxe JavaScript; `npm run build` copia somente os arquivos públicos para dist/. Esses scripts usam apenas Node nativo.

## Arquivos principais

- index.html: conteúdo completo, SEO e comentários CONFIRMAR.
- css/style.css: variáveis da marca e estilos organizados por seção.
- js/script.js: menu, header, IntersectionObserver e lightbox.
- assets/logo/: logo oficial e documentação de origem.
- assets/images/: pastas para clínica, equipe e tratamentos.
- PESQUISA.md: fontes, decisões e pendências.

## Conteúdo e contatos

Tudo é editável diretamente no HTML. O WhatsApp confirmado é (11) 95337-8357. Não foi presumido que aceite chamadas. Ao alterar contatos, atualize todos os links wa.me, a informação visível e o JSON-LD. Preserve a mensagem pré-preenchida. O verificador protege os dados desta entrega; ajuste suas expectativas se eles mudarem futuramente.

## Fotos e logo

Não há fotos reais de ambientes/profissional no material fornecido. As áreas coloridas são placeholders identificados. Veja assets/images/LEIA-ME.md para substituir cada área e ativar o lightbox. Use WebP/AVIF comprimidos, dimensões, alt e lazy loading nas fotos secundárias; use fetchpriority=high no hero. Adicione srcset somente quando existirem variantes reais.

A logo é a imagem original do Instagram, preservada sem alterações, em 150 × 150 px. Forneça SVG ou PNG maior para nitidez final. Não foram inventadas versões branca ou horizontal. A origem está em assets/logo/FONTE.md.

## SEO

Title, description, canonical, Open Graph com logo, favicon, idioma, sitemap e schema Dentist estão implementados. Atualize URLs em index.html, robots.txt e sitemap.xml ao mudar o domínio. O domínio atual corresponde ao Site reservado para revisão privada; o acesso é controlado pela hospedagem.

## Interações e acessibilidade

Navegação e CTAs funcionam sem JavaScript. O menu fecha por Escape, clique externo ou mudança de seção. Tratamentos usam details nativo. O lightbox usa dialog e é preparado para links data-lightbox de fotografias reais; placeholders não abrem. Reveals respeitam movimento reduzido. Fontes do sistema eliminam downloads de tipografia. O mapa usa lazy loading; Como chegar funciona independentemente do iframe. Não há formulários, rastreadores ou armazenamento de dados de pacientes.

## Preservação

Foram mantidos endereço e WhatsApp confirmados pelo usuário, nome do profissional, tratamentos documentados, fontes e mensagem de agendamento. O visual foi refeito com logo real e azul/turquesa da identidade observada.

As fontes, configurações e dependências anteriores foram arquivadas de forma reversível em artifacts/legacy-next/, fora da aplicação e da publicação. artifacts/versao-anterior-next.zip guarda as fontes iniciais. O novo site não importa nem executa esses arquivos.

## Pendências

Fotografias reais, logo em alta resolução, história e biografia aprovadas, formação, CRO, responsável técnico, horários, telefone de chamadas e demais tratamentos. Não foram inventadas avaliações, estatísticas ou durações de experiência.

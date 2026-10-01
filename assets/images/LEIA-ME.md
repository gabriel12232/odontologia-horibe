# Fotografias reais

Não há fotografias de ambientes ou profissionais no material entregue até agora. Os espaços coloridos no site estão explicitamente identificados como placeholders.

- `clinica/hero.webp`: horizontal, 1600 × 1200 ou maior.
- `clinica/recepcao.webp`: vertical, cerca de 1200 × 1400.
- `clinica/consultorio.webp`: horizontal, cerca de 1000 × 750.
- `clinica/detalhes.webp`: horizontal, cerca de 1000 × 650.
- `equipe/edson-horibe.webp`: vertical, cerca de 1000 × 1200.
- `tratamentos/`: reservado para imagens reais aprovadas, se desejado.

Esses arquivos são sugestões de nomes, não assets existentes. Comprima em WebP ou AVIF. Não amplie artificialmente fotos pequenas.

No `index.html`, localize o atributo `data-photo` e substitua apenas o bloco `.photo-placeholder` por uma imagem. Preserve o contêiner `.media-frame` para manter proporções e layout.

Exemplo para a recepção, com lightbox e link funcional mesmo sem JavaScript:

```html
<a href="assets/images/clinica/recepcao.webp" data-lightbox data-caption="Recepção da Odontologia Horibe" aria-label="Ampliar fotografia da recepção">
  <img src="assets/images/clinica/recepcao.webp" width="1200" height="1400" alt="Descreva o ambiente real da recepção" loading="lazy" decoding="async">
</a>
```

Quando houver variantes reais, adicione `srcset` e `sizes` com seus caminhos, sem apontar para arquivos inexistentes. Para o hero, use `fetchpriority="high"` sem lazy loading. Para as demais, use `loading="lazy"`. Depois remova “Fotografias reais em breve” quando todas as fotos estiverem preenchidas.

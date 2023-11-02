import { css } from '@emotion/react'

const ResetCSS = css`
  html, body,
  div,
  span,
  p,
  h1,h2,h3,h4,h5,h6,
  a,
  button,
  input,
  textarea,
  select,
  option,
  ul[class],
  ol[class],
  figure,
  blockquote,
  dl,
  dd,
  ul, 
  ol,
  li,
  th,
  td,
  thead,
  tbody,
  table,
  article, aside, footer, header, nav
  {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smooth: subpixel-antialiased;
    text-shadow: rgba(255, 255, 255, 0.16) 0px 0px 0px;
    text-rendering: optimizeSpeed;
    box-sizing: border-box;
    font-size: 100%;
    font-weight: 100;
  }

  strong, b {
    font-family: 700, sans-serif;
  }

  *::before,
  *::after {
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  html,
  body {
    font-family: 'Cabin', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body,
  html,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul[class],
  ol[class],
  figure,
  blockquote,
  dl,
  dd,
  span,
  ul, 
  li,
  ol {
    margin: 0;
    padding: 0;
  }

  ul[class],
  ol[class] {
    list-style: none;
  }
`

export default ResetCSS

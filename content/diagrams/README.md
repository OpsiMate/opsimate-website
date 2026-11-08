# Blog diagrams

Mermaid sources for the SVGs in `public/images`. They are rendered once, by hand, and
the SVG is committed: the site does not render Mermaid at build or request time (that
would need a headless browser inside the Vercel function that revalidates blog pages).

To re-render after editing a `.mmd`:

```sh
npx -p @mermaid-js/mermaid-cli mmdc -i content/diagrams/<name>.mmd -o public/images/<name>.svg -b white \
  -c <(echo '{"htmlLabels":false,"flowchart":{"htmlLabels":false,"wrappingWidth":260}}')
```

Keep `htmlLabels` off so labels are plain SVG text (no `foreignObject`), which renders
the same everywhere the SVG is used as an `<img>`. The white background is baked in so
the diagrams stay readable on the dark theme.

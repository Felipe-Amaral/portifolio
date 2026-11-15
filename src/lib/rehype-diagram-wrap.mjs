// Envolve cada diagrama Mermaid (img com SVG em data: URI, gerado pelo rehype-mermaid) numa
// <div class="diagram"> que rola na horizontal. Roda no build; sem JavaScript e sem estilo inline.
export default function rehypeDiagramWrap() {
  return (tree) => {
    wrapDiagrams(tree);
  };
}

function isDiagram(node) {
  return (
    node.type === 'element' &&
    node.tagName === 'img' &&
    typeof node.properties?.src === 'string' &&
    node.properties.src.startsWith('data:image/svg+xml')
  );
}

function wrapDiagrams(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (isDiagram(child)) {
      child.properties = { ...child.properties, className: ['diagram__img'] };
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['diagram'] },
        children: [child],
      };
    }
    wrapDiagrams(child);
    return child;
  });
}

// Envolve cada <table> do Markdown numa <div class="table-wrap"> para a tabela rolar na horizontal
// dentro do próprio wrapper, sem estourar a página. Roda no build; não gera JavaScript nem estilo inline.
export default function rehypeTableWrap() {
  return (tree) => {
    wrapTables(tree);
  };
}

function wrapTables(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (child.type === 'element' && child.tagName === 'table') {
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-wrap'] },
        children: [child],
      };
    }
    wrapTables(child);
    return child;
  });
}

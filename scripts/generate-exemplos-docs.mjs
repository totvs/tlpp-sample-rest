#!/usr/bin/env node
/**
 * Gera docs/exemplos/*.mdx a partir da árvore src/
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'docs/exemplos');

const CATEGORY_LABELS = {
  'primeiros-passos': 'Primeiros passos',
  configuracoes: 'Configurações',
  'verbs/delete': 'Verbos · DELETE',
  'verbs/get': 'Verbos · GET',
  'verbs/post': 'Verbos · POST',
  'verbs/put': 'Verbos · PUT',
  'verbs/patch': 'Verbos · PATCH',
  'orest/leitura-requisicao': 'oREST · leitura requisição',
  'orest/leitura-resposta': 'oREST · leitura resposta',
  'orest/escrita-resposta': 'oREST · escrita resposta',
  'orest/cabecalhos-resposta': 'oREST · cabeçalhos resposta',
  'orest/pool-servidor': 'oREST · pool e serviço',
  'orest/utilitarios': 'oREST · utilitários',
  callbacks: 'Callbacks',
  authorization: 'Authorization',
  'apis/admin': 'APIs administrativas',
};

const CATEGORY_ORDER = [
  'primeiros-passos',
  'configuracoes',
  'verbs/get',
  'verbs/post',
  'verbs/put',
  'verbs/patch',
  'verbs/delete',
  'orest/leitura-requisicao',
  'orest/leitura-resposta',
  'orest/escrita-resposta',
  'orest/cabecalhos-resposta',
  'orest/pool-servidor',
  'orest/utilitarios',
  'callbacks',
  'authorization',
  'apis/admin',
];

function slug(category) {
  return category.replace(/\//g, '-');
}

function srcPathToExemploRef(pathRel) {
  const withoutSrc = pathRel.replace(/^src\//, '');
  const dir = path.dirname(withoutSrc);
  const file = path.basename(withoutSrc);
  const folder = dir === '.' ? undefined : dir;
  return {file, folder};
}

function walkTlpp(dir, base = '') {
  const entries = [];
  for (const ent of fs.readdirSync(dir, {withFileTypes: true})) {
    const rel = base ? `${base}/${ent.name}` : ent.name;
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) entries.push(...walkTlpp(abs, rel));
    else if (ent.name.endsWith('.tlpp')) {
      entries.push({
        category: base.replace(/\\/g, '/'),
        file: ent.name,
        path: `src/${rel.replace(/\\/g, '/')}`,
      });
    }
  }
  return entries;
}

function pageMdx(category, files, position) {
  const label = CATEGORY_LABELS[category] ?? category;
  const rows = files
    .map((f) => {
      const {file, folder} = srcPathToExemploRef(f.path);
      const pathAttr = folder ? ` path="${folder}"` : '';
      return `| \`${file}\` | <ExemploRef repo="rest-samples" file="${file}"${pathAttr} /> |`;
    })
    .join('\n');

  return `---
title: "${label}"
sidebar_label: "${label}"
sidebar_position: ${position}
displayed_sidebar: restSidebar
---

import ExemploRef from '@site/src/components/ExemploRef';
import RepoLink from '@site/src/components/RepoLink';

# ${label}

Exemplos TLPP em <RepoLink id="rest-samples" /> (\`src/${category}/\`).

| Arquivo | Repositório |
|---------|-------------|
${rows}
`;
}

function main() {
  const manifest = walkTlpp(SRC);
  const byCategory = new Map();
  for (const entry of manifest) {
    if (!byCategory.has(entry.category)) byCategory.set(entry.category, []);
    byCategory.get(entry.category).push(entry);
  }

  fs.rmSync(OUT, {recursive: true, force: true});
  fs.mkdirSync(OUT, {recursive: true});

  const categories = [
    ...CATEGORY_ORDER.filter((c) => byCategory.has(c)),
    ...[...byCategory.keys()].filter((c) => !CATEGORY_ORDER.includes(c)).sort(),
  ];

  let pos = 2;
  for (const cat of categories) {
    const files = byCategory.get(cat).sort((a, b) => a.file.localeCompare(b.file));
    fs.writeFileSync(path.join(OUT, `${slug(cat)}.mdx`), pageMdx(cat, files, pos++), 'utf8');
  }

  const indexLinks = categories
    .map((cat) => {
      const label = CATEGORY_LABELS[cat] ?? cat;
      return `- [${label}](/docs/tlpp/rest/exemplos-repositorio/${slug(cat)})`;
    })
    .join('\n');

  fs.writeFileSync(
    path.join(OUT, 'index.mdx'),
    `---
title: Exemplos do repositório
sidebar_label: Visão geral
sidebar_position: 1
displayed_sidebar: restSidebar
---

import RepoLink from '@site/src/components/RepoLink';

# Exemplos TLPP (REST)

Código-fonte em <RepoLink id="rest-samples" />, organizado por tema em \`src/\`.

Use esta seção **depois** da trilha conceitual do menu REST — cada página lista arquivos \`.tlpp\` com link para o GitHub. A ordem espelha a documentação: primeiros passos → configurações → verbos HTTP → oREST → callbacks → auth → APIs admin.

## Categorias

${indexLinks}

## Como usar os exemplos

1. Leia a página conceitual correspondente no menu REST (ex.: [Leitura da requisição](/docs/tlpp/rest/objeto-orest/leitura-requisicao)).
2. Abra o arquivo \`.tlpp\` no repositório pelo link da tabela.
3. Compile no seu RPO e adapte ao seu \`appserver.ini\`.
`,
    'utf8',
  );

  fs.mkdirSync(path.join(ROOT, 'content-import'), {recursive: true});
  fs.writeFileSync(
    path.join(ROOT, 'content-import', 'exemplos-sidebar.json'),
    `${JSON.stringify(categories.map((c) => `tlpp/rest/exemplos-repositorio/${slug(c)}`), null, 2)}\n`,
    'utf8',
  );

  console.log(`generate-exemplos-docs: ${categories.length + 1} páginas, ${manifest.length} arquivos .tlpp`);
}

main();

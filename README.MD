# totvs/tlpp-sample-rest

Exemplos TLPP REST organizados por tema: oREST, verbos HTTP, configurações, callbacks e primeiros passos.

**Metadados, doc-generate e OpenAPI** ficam em [totvs/tlpp-sample-rest-documentation](https://github.com/totvs/tlpp-sample-rest-documentation).

## Estrutura `src/`

| Pasta | Conteúdo |
|-------|----------|
| `primeiros-passos/` | `rest_start`, função/classe, `load_urns` |
| `configuracoes/` | Annotations, `fInitService`, URNs sem annotation |
| `verbs/{get,post,put,patch,delete}/` | Exemplos por verbo HTTP |
| `orest/` | Leitura/escrita oREST, pool, cabeçalhos |
| `callbacks/` | User exits REST |
| `authorization/` | `onAuth` |
| `apis/admin/` | APIs administrativas |

Cada `.tlpp` contém apenas código de exemplo válido (sem narrativa do TDN).

## Atualizar páginas do hub

```bash
npm run docs:exemplos
```

Gera `docs/exemplos/*.mdx` a partir da árvore `src/`.

## Repositórios relacionados

| Repo | Papel |
|------|-------|
| [totvs/tlpp-sample-rest-documentation](https://github.com/totvs/tlpp-sample-rest-documentation) | Metadados, doc-generate, OpenAPI |
| [totvs/totvstec-doc](https://github.com/totvs/totvstec-doc) | Site de documentação |

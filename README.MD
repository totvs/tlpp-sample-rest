# tlpp-sample-rest

Exemplos TLPP de **REST** no AppServer — primeiros passos, verbos HTTP, objeto `oRest`, configurações, callbacks e autorização.

Cada arquivo `.tlpp` em `src/` é um exemplo autocontido, organizado por pasta.

## Estrutura `src/`

| Pasta | Conteúdo |
|-------|----------|
| `primeiros-passos/` | Inicialização do serviço REST, função/classe, `load_urns` |
| `configuracoes/` | Annotations, `fInitService`, URNs sem annotation |
| `verbs/{get,post,put,patch,delete}/` | Exemplos por verbo HTTP |
| `orest/` | Leitura/escrita com `oRest`, pool, cabeçalhos |
| `callbacks/` | User exits do ciclo de vida REST |
| `authorization/` | Autenticação (`onAuth`) |
| `apis/admin/` | APIs administrativas |

Metadados, **Doc Generate** e OpenAPI ficam em [tlpp-sample-rest-documentation](https://github.com/totvs/tlpp-sample-rest-documentation).

## Documentação

Conceitos, trilha de leitura e mapa dos exemplos:

**https://totvs.github.io/totvstec-doc/docs/tlpp/rest/**

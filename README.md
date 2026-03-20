# MDM System Server (Backend)

Este repositorio contem o backend do MDM.

## Como ver a documentacao da API

1. Inicie o servidor com Docker usando a imagem publicada no GitHub.
2. Com o container em execucao, abra:

`http://localhost:8000/docs/api`

Se precisar executar manualmente, use um comando no formato abaixo e ajuste a imagem:

```bash
docker run --rm -p 8000:8000 ghcr.io/<org>/<imagem>:<tag>
```


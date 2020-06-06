# :recycle: Ecoleta NodeJS API (Back-end)

## :information_source: Sobre

Esse é o código do back-end da aplicação criada no evento **Next Level Week** da **Rocketseat**. Para informações sobre a aplicação completa, veja o `README-pt-br.md` na pasta raíz do repositório.

## :flags: Futuro

Algumas funcionalidades que eu desejo adicionar no back-end não estão, ainda, nessa versão e, nessa seção, eu decidi listar cada uma dessas funcionalidades para uma ajuda mental para as próximas alterações no código.

### Enviar informações de erros para o front-end

Usando o `response.status(400)` ou outros códigos como resposta no *error handler*, o front-end em JavaScript não pode receber isso. No futuro eu quero mudar a forma de retornar as informações (em todas as rotas) para suportar o envio de erros como um parâmetro opcional nas informações enviadas com o código de retorno `200`.

### Adicionar suporte para autenticação e editar informações

Adicionar, no futuro, um campo de senha na página de cadastro e adicionar autenticação para suportar a edição de informações sobre cada ponto.

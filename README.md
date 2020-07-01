# :recycle: Ecoleta

Esse é o projeto **Ecoleta**, criado durante o evento **Next Level Week** criado pela **Rocketseat**. Primeiro, preciso deixar um agradecimento para a **Rocketseat** e para o **Diego** (da **Rocketseat**) por esse evento incrível.

<div align="center">
    <img src="images/preview/front.jpg" alt="pagina inicial do projeto web com react" />
</div>

<h2 align="center">
    <div style="display:flex">
        <img src="images/preview/mobile_front.jpeg" width="350px">
        <img src="images/preview/mobile_points.jpeg" style="margin-left:3px"  width="350px">
    </div>
    <div style="display:flex">
        <img src="images/preview/mobile_points_one.png" style="margin-top: 3px;" width="350px">
        <img src="images/preview/mobile_detail.jpeg" style="margin-left: 3px; margin-top: 3px;" width="350px">
    </div>
</h2>
<h2 align="center">
    <a href="https://www.youtube.com/watch?v=TtxGNdMHj3o">Ver Vídeo no YouTube</a>
</h2>

## :information_source: Sobre

Esse é o projeto **Ecoleta** criado no evento **Next Level Week** da **Rocketseat**. Esse repositório contém três projetos:

1 - Back-end em NodeJS (API) no diretório `/server`.

2 - Front-end em ReactJS no diretório `/web`.

3 - Aplicativo mobile com React-Native e Expo no diretório `/mobile`.

## :bookmark_tabs: Conteúdos

- [Ecoleta](#recycle-Ecoleta)
    - [Sobre](#information_source-Sobre)
    - [Conteúdos](#bookmark_tabs-Conteúdos)
    - [Pontos principais do evento para mim](#heart-Pontos-principais-do-evento-para-mim)
    - [Coisas que aprendi](#book-Coisas-que-aprendi)
    - [Funcionalidades Extra](#gem-Funcionalidades-Extra)
        - [Back-End](#pager-Back-End)
        - [Front-End](#computer-Front-End)
        - [Mobile](#iphone-Mobile)
    - [Como rodar](#floppy_disk-Como-rodar)
        - [1 - Clonar o repositório](#1---Clonar-o-repositório)
        - [2 - Instalar as dependências e rodar o back-end](#2---Instalar-as-dependências-e-rodar-o-back-end)
        - [3 - Mude o IP do localhost](#3---Mude-o-IP-do-localhost)
            - [Back-end](#Back-end)
            - [Front-end](#Front-end)
            - [Mobile](#Mobile)
        - [4 - Instalar dependências e rodar o front-end em ReactJS](#4---Instalar-dependências-e-rodar-o-front-end-em-ReactJS)
        - [5 - Instalar as dependências e rodar o aplicativo mobile](#5---Instalar-as-dependências-e-rodar-o-aplicativo-mobile)
    - [Futuro](#flags-Futuro)
        - [Enviar informações de erros para o front-end](#Enviar-informações-de-erros-para-o-front-end)
        - [(Mobile Only) Posição de inicialização do mapa](#Mobile-Only-Posição-de-inicialização-do-mapa)
        - [(Mobile Only) Criar pontos](#Mobile-Only-Criar-pontos)
    - [Criador](#nerd_face-Criador)

## :heart: Pontos principais do evento para mim

Um dos melhores pontos do evento **Next Level Week** foi o uso do **Typescript** em todas as aplicações (**NodeJS API**, **ReactJS** and **React-Native**). Isso foi uma boa introdução, para mim, ao **typescript**. Outro ponto bom foi o uso do **knex** no ambiente **Node** e, obviamente, toda a parte do **Node** pois sou um iniciante com ele, tendo mais familiaridade com o **ReactJS** e **React-Native**.

Outro ponto, interessante para mim, foi o uso do **expo** pois, com meu hardware levemente obsoleto (hahaha), só consigo executar aplicações mobile com o **expo** (Obrigado a toda a comunidade **expo**).

## :book: Coisas que aprendi

- Usar o **TypeScript**. Amei usar **TypeScript** pela primeira vez.

- Um pouco mais sobre "chamar" API's, pois no projeto foram utilizadas a API do IBGE e a API criada para o Back-end no projeto.

- Mais sobre os componentes, **useState** e **useEffect** no **React**.

- Upload de arquivos com o **NodeJS**.

- Usar mapas em projetos com o **ReactJS** e o **React-Native**.

- Um monte de outras coisas que eu gastaria muito tempo para listar...

## :gem: Funcionalidades Extra

Algumas funcionalidades da aplicação não foram desenvolvidas durante o **Next Level Week** e, portanto, criei algumas dessas funcionalidades para estudar e treinar. Aqui está uma lista com essas funcionalidades:

### :pager: Back-End

- Adicionado o limite de tamanho de arquivo para `1MB` no upload de arquivo.

- Alterado a funcionalidade de procurar pontos, deixando os items opcionais (Usado no front-end para criar a busca por estado e cidade na versão web).

- Criado um middleware para capturar os erros (Será usado no futuro para enviar informações sobre os erros do back-end para o front-end {Veja [isso na seção Futuro](#Enviar-informações-de-erros-para-o-front-end)}).

- Movido a parte de validação para um middleware para deixar o arquivo `routes.ts` mais limpo.

### :computer: Front-End

- Adicionado uma modal com informação de cadastro concluído (substituindo o `alert()` do projeto criado no vídeo da **Rocketseat**).

<div align="center">
    <img src="images/preview/complete.jpg" alt="pronto criado" />
</div>

- Adicionado validação no Front-end no formulário de criação de ponto de coleta (usando o pacote `yup`).

- A aplicação web foi deixada mais responsiva.

<div align="center">
    <img src="images/preview/scale.gif" alt="redimensionando a aplicação" />
</div>

- Foi criado uma página com busca por estado (UF) e cidade e adicionado suporte para mostrar a localização no mapa na aplicação web.

<div align="center">
    <img src="images/preview/webpoints.jpg" alt="lista de pontos no app web" />
</div>

<div align="center">
    <img src="images/preview/points_map.gif" alt="mostrando o ponto no mapa no app web" />
</div>

- Adicionada uma pequena página de erro 404 (Eu não gosto de deixar só uma página branca, como tinha ficado hahaha).

<div align="center">
    <img src="images/preview/404.jpg" alt="404 error page" />
</div>

- Adicionado limite de arquivos para 1MB no Front-end também.

<div align="center">
    <img src="images/preview/maxfilesize.gif" alt="max file size message" />
</div>

- Adicionado suporte para autenticação (com Json Web Token, JWT) permitindo a alteração de dados em pontos cadastrados.

<div align="center">
    <img src="images/preview/edit.gif" alt="editing information" />
</div>

### :iphone: Mobile

- Adicionado seleção de estado (UF) e cidade com suporte a API do IBGE.

- Adicionado um botão\link para abrir a localização em outros apps (por exemplo, no aplicativo **Uber**).

## :floppy_disk: Como rodar

A primeira coisa sobre rodar essa aplicação é que você precisa mudar o IP em todos os arquivos que utilizam o ip do servidor back-end, nos projetos `server`, `web` e `mobile` (Faça isso após o servidor back-end estar rodando).

### 1 - Clonar o repositório

```bash
git clone https://github.com/EduardoJM/Ecoleta.git
cd Ecoleta
```

### 2 - Instalar as dependências e rodar o back-end

A partir do diretório `Ecoleta`, vá para `server` e execute o comando `npm install`.

```bash
cd server
npm install
```

Depois de instalar as dependências, execute os comandos `knex:migrate` e `knex:seed` para criar o banco de dados `.sqlite`.

```bash
npm run knex:migrate
npm run knex:seed
```

Depois de criar o banco de dados, rode o script `dev` para executar o back-end.

```bash
npm run dev
```

### 3 - Mude o IP do localhost

Mude o IP do localhost para o seu IP de localhost nos arquivos:

#### Back-end

```
Ecoleta/server/src/controllers/ItemsController.ts
Ecoleta/server/src/controllers/PointsController.ts
```

#### Front-end

```
Ecoleta/web/src/services/api.ts
```

#### Mobile

```
Ecoleta/mobile/src/services/api.ts
```

### 4 - Instalar dependências e rodar o front-end em ReactJS

Do diretório `Ecoleta`, vá para `web` e rode o comando `npm install`. Depois de instalar as dependências, execute o script `start`.

```bash
cd web
npm install
npm start
```

### 5 - Instalar as dependências e rodar o aplicativo mobile

Do diretório `Ecoleta`, vá para `mobile` e rode o comando `npm install`. Depois de instalar as dependências, rode o script `start`.

```bash
cd mobile
npm install
npm start
```

E, agora, escaneie o QRCode do terminal no seu celular, com o aplicativo do expo.

## :flags: Futuro

Algumas funcionalidades que eu desejo adicionar nessa aplicação não estão, ainda, nessa versão e, nessa seção, eu decidi listar cada uma dessas funcionalidades para uma ajuda mental para as próximas alterações no código. Aqui as funcionalidades são listadas sem separação de back-end, front-end ou mobile. Isso é como se fosse uma lista To-Do.

### Enviar informações de erros para o front-end

Usando o `response.status(400)` ou outros códigos como resposta no *error handler*, o front-end em JavaScript não pode receber isso. No futuro eu quero mudar a forma de retornar as informações (em todas as rotas) para suportar o envio de erros como um parâmetro opcional nas informações enviadas com o código de retorno `200`.

### (Mobile Only) Posição de inicialização do mapa

No futuro, eu quero inicializar o mapa na cidade e estado selecionado e não na localização do celular. Isso porque não faz sentido para uma pessoa procurando um ponto em outra cidade e a visualização do mapa inicializar na cidade em que ela está.

### (Mobile Only) Criar pontos

Adicionar suporte para criar pontos no aplicativo para celular.

## :nerd_face: Criador

### Eduardo Oliveira

- GitHub: [@EduardoJM](https://github.com/eduardojm/)
- LinkedIn: [/in/edujso](https://www.linkedin.com/in/edujso)
- Instagram: [@edu.js.o](https://www.instagram.com/edu.js.o/)
- Online: [eduardojm.github.io](https://eduardojm.github.io/) - Brazilian Portuguese and
- Online: [eduardojm.github.io/en](https://eduardojm.github.io/en/) - English

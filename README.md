[Ver o Leia-Me em Português](README-pt-br.md)

# :recycle: Ecoleta

This is the **Ecoleta** project, created along the **Next Level Week** event made by **Rocketseat**. First, I need to add some thanks to **Rocketseat** and to **Diego** (from the **Rocketseat**) for this awesome event.

<div align="center">
    <img src="images/preview/front.jpg" alt="home page of web react app" />
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
    <a href="https://www.youtube.com/watch?v=TtxGNdMHj3o">View Youtube Video (Speaking in Brazilian Portuguese)</a>
</h2>

## :information_source: About

This is the **Ecoleta** project created in the **Next Level Week** event made by **Rocketseat**. This repository contains three projects:

1 - NodeJS back-end API, in the `/server` path.

2 - ReactJS web front-end, in the `/web` path.

3 - React-Native with expo mobile app, in the `/mobile` path.

## :bookmark_tabs: Readme Contents

- [Ecoleta](#recycle-Ecoleta)
    - [About](#information_source-About)
    - [Readme Contents](#bookmark_tabs-Readme-Contents)
    - [Best Points in the Event to Me](#heart-Best-Points-in-the-Event-to-Me)
    - [Things i Learned](#book-Things-i-Learned)
    - [Extra Features](#gem-Extra-Features)
        - [Back-End](#pager-Back-End)
        - [Front-End](#computer-Front-End)
        - [Mobile](#iphone-Mobile)
    - [How to run](#floppy_disk-How-to-run)
        - [1 - Clone the repository](#1-Clone-the-repository)
        - [2 - Install dependencies and run node back-end](#2-Install-dependencies-and-run-node-back-end)
        - [3 - Change the localhost IP](#3-Change-the-localhost-IP)
            - [Back-end](#Back-end)
            - [Front-end](#Front-end)
            - [Mobile](#Mobile)
        - [4 - Install dependencies and run ReacJS front-end](#4-Install-dependencies-and-run-ReacJS-front-end)
        - [5 - Install dependencies and run mobile React-Native app](#5-Install-dependencies-and-run-mobile-React-Native-app)
    - [Future](#flags-Future)
        - [Send errors informations from back-end for front-end](#Send-errors-informations-from-back-end-for-front-end)
        - [Add support to authentication and edit informations](#Add-support-to-authentication-and-edit-informations)
        - [(Mobile Only) Change the Map Initialization position](#Mobile-Only-Change-the-Map-Initialization-position)
        - [(Mobile Only) Create Point](#Mobile-Only-Create-Point)
    - [Creator](#nerd_face-Creator)

## :heart: Best Points in the Event to Me

One of the best points in the **Next Level Week** event is the use of the **Typescript** in all applications (**NodeJS API**, **ReactJS App** and **React-Native App**). This is an good starting information for me in **typescript**. Other good point is the use of the **knex** package in node and, obvious, the **Node** part of the event, because i'm a beginner in the **Node** with a little bit more familiarity with the **ReactJS** and **React-Native**.

Other point, interesting to me is the use of **expo** because, with my oldest hardware i can run mobile apps only because **expo** (Thanks for all **expo** community).

## :book: Things i Learned

- Using **TypeScript**. I loved to use **TypeScript** for the first time.

- A little bit more about calling API's, because in this project we use the IBGE state and city API and the API created in the first part of the project.

- More about components, **useState** and **useEffect** on the **React**.

- File upload in **NodeJS**.

- Using maps in **ReactJS** and **React-Native** projects.

- A lot of other things that I would spend a lot of time listing...

## :gem: Extra Features

Some features of the apps is not developed in the **Next Level Week** and, some of these features is created by me, for studying and training. Here is an list of this extra features:

### :pager: Back-End

- Setted the limitation of `1MB` image size in file upload.

- Made the search points including items optional (used this for the Front-end points search by state and city).

- Created error handler middlewares (it will be used in the future for send errors from back-end to front-end {see [this in Future section](#Send-errors-informations-from-back-end-for-front-end)}).

- Moved validations to an middleware to clean the `routes.ts` file.

### :computer: Front-End

- Added an modal with success registration (replacing the `alert()` from the project created in the **Rocketseat** video).

<div align="center">
    <img src="images/preview/complete.jpg" alt="point creation complete" />
</div>

- Added Front-end side validation in the create point form (using the `yup` package).

- Make the front-end application more responsive.

<div align="center">
    <img src="images/preview/scale.gif" alt="rescaling web application" />
</div>

- Created an point search for state (UF) city and add support for showing the point in the map in front-end web application.

<div align="center">
    <img src="images/preview/webpoints.jpg" alt="point list in web app" />
</div>

<div align="center">
    <img src="images/preview/points_map.gif" alt="showing the point in map at web" />
</div>

- Added an tiny 404 page (This is created because i not like the app white screen in not-found routes).

<div align="center">
    <img src="images/preview/404.jpg" alt="404 error page" />
</div>

- Added limitation for 1MB images in front-end page

<div align="center">
    <img src="images/preview/maxfilesize.gif" alt="max file size message" />
</div>

### :iphone: Mobile

- Added state (UF) and city selector with IBGE API support:

- Added an button\link to open the map location with external apps (e.g. opening in **Uber** app).

## :floppy_disk: How to run

The first thing about run this app you need know is: you need to change the IP in all files using the back-end server ip in `server`, `web` and `mobile` projects (make this, after the back-end server started).

### 1 - Clone the repository

```bash
git clone https://github.com/EduardoJM/Ecoleta.git
cd Ecoleta
```

### 2 - Install dependencies and run node back-end

From the `Ecoleta` root folder, go to the `server` path and run the `npm install` command.

```bash
cd server
npm install
```

After installing dependencies, run the `knex:migrate` and the `knex:seed` npm scripts to create `.sqlite` database.

```bash
npm run knex:migrate
npm run knex:seed
```

After creating database, run the `dev` npm script to execute the devlopment server.

```bash
npm run dev
```

And, now, the server is started.

### 3 - Change the localhost IP

Change the localhost IP to your localhost IP in those files:

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

### 4 - Install dependencies and run ReacJS front-end

From the `Ecoleta` root folder, go to the `web` path and run the `npm install` command. After the install of dependencies, run the `start` npm script.

```bash
cd web
npm install
npm start
```

### 5 - Install dependencies and run mobile React-Native app

From the `Ecoleta` root folder, go to the `mobile` path and run the `npm install` command. After the install of dependencies, run the `start` npm script.

```bash
cd mobile
npm install
npm start
```

Now, scan the QRCode from the terminal to your mobile phone expo application.

## :flags: Future

Some features, that i want to add to this project was not in this version and, in this section, i decided to list each of this features for a mental helper for next changes in this code. Here, this features are listed without separation of back-end, front-end or mobile. This is like an To-Do list.

### Send errors informations from back-end for front-end

Using the `response.status(400)` or other codes, in back-end, as response in error handlers, the JavaScript front-end can't receive this (Network error). In the future i want to change the information return (in all routes) to support sending errors as optionally data information and send all as `200` status code.

### Add support to authentication and edit informations

Add, in the future, password field in create point form and add authentication support to edit information.

### (Mobile Only) Change the Map Initialization position

In the future, i want to initialize the map in the selected state and city and not in the phone location. This is because not make sense for a people locating a point in other city and the map visualization initialize in your city. I need an API (or an json database to read locally) to get the map coordinates for the city or state.

### (Mobile Only) Create Point

Add support to create point in the mobile application.

## :nerd_face: Creator

### Eduardo Oliveira

- GitHub: [@EduardoJM](https://github.com/eduardojm/)
- LinkedIn: [/in/edujso](https://www.linkedin.com/in/edujso)
- Instagram: [@edu.js.o](https://www.instagram.com/edu.js.o/)
- Online: [eduardojm.github.io](https://eduardojm.github.io/) - Brazilian Portuguese and
- Online: [eduardojm.github.io/en](https://eduardojm.github.io/en/) - English

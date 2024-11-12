<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Revisar el documento .txt que tiene el script de la base de datos

## Compile and run the project

```bash
# inicializar prisma ORM
$ npx prisma init

# trae los campos de la base de datos al codigo para poder las tablasy manipular la data

$ npx prisma db pull

# generar el cliente para poder hacer las peticiones
$ npx prisma generate

# ejecutar el siguiente script para cargar automaticamente datos en la base de datos
$ npm run prisma:seed

si al ejecutar este comando te da algun error puedes ejecutar este otro

$ DATABASE_URL=postgresql://postgres:12345@localhost:5432/postgres npm run prisma:seed

# watch mode
$ npm run start:dev
```

## Prueba de los servicios

NOTA: recuerda cambiar los ids con los generados en tu base de datos

# GET ALL - Obtiene todos los pedidos asociados a un idBusiness

```
curl -X GET "http://localhost:8080/productos/pedidos/all?idBusiness=10" -H "Content-Type: application/json" -H "ip: 192.168.1.1" -H "dominio: example.com" -H "usuario: johndoe" -H "proceso: classy.all()"
```

puedes agregar mas query parameters como los siguientes:

http://localhost:8080/productos/pedidos/all?filters[precio]=2000&id=42a8de81-da3e-430d-a97b-9c750e65787e&idBusiness=10

# POST - Servicio para crear un nuevo pedido

```
curl --location 'http://localhost:8080/productos/pedidos/add' --header 'Content-Type: application/json' --header 'ip: 192.168.1.1' --header 'dominio: example.com' --header 'usuario: johndoe' --header 'proceso: classy.add()' --data '{
    "producto": "6efc6527-837e-4289-99dc-5174fbb5a8c2",
    "DatosUsuario": "2349ac48-671b-4591-8edc-137adc68956a",
    "comentario": "HOLA COMENTARIOS",
    "idMedioPago": "35bb0bc9-e021-47e6-9085-6e673e3ae99f",
    "idEstado": "05b0afa2-868c-46fc-83e2-88d631c3fae5",
    "cantidad":2
}'
```

# DELETE

```
curl -X DELETE "http://localhost:8080/productos/pedidos/delete?id=61a8660a-7a06-4ae5-b96f-6ba7b732b9da" \
-H "Content-Type: application/json" \
-H "ip: 192.168.1.1" \
-H "dominio: example.com" \
-H "usuario: johndoe" \
-H "proceso: classy.delete()"
```


# UPDATE

```
curl -X PATCH "http://localhost:8080/productos/pedidos/update?id=6e8a00f8-9a24-4661-98ee-3751960d349c" -H "Content-Type: application/json" -H "ip: 192.168.1.1" -H "dominio: example.com" -H "usuario: johndoe" -H "proceso: classy.update()" --data '{
  "comentario": "comentario"
}'
```

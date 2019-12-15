# 11Forward

### Overview
11Forward is a instagram-inspired single-page application, that allows users to share images.
Registered users can upload, update and delete photos, like other users' photos and leave comments under a given photo. Photos can be pulbic or private, and each user can subscribe to another user profile un order to see their private photos. The user can also edin their profiles and delete them

### Installation 

#### Backend

- After cloning the repository, navigate to the `server` folder. Run `npm install`.

```sh
$ npm install
```

  Create a database in MySQL workbench and name it (for example '11forward'). 
  Create a `.env` file with the following info:
```sh
PORT=3000
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=`your database username`
DB_PASSWORD=`your database password`
DB_DATABASE_NAME=`your database name`
JWT_SECRET=`your jwt secred word`
JWT_EXPIRE_TIME=3600
IMGUR_ID=Client-ID 7084d3c72f8fab9
```
- In order to fill the database with preseeded info, create `ormcongif.json` file with the following info:

```sh
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "your database username",
    "password": "your database password",
    "database": "your database name",
    "synchronize": true,
    "logging": false,
    "entities": [
      "src/data/entities/**/*.ts"
    ],
    "migrations": [
      "src/data/migration/**/*.ts"
    ],
    "cli": {
      "entitiesDir": "src/data/entities",
      "migrationsDir": "src/data/migration"
    }
  }
```
Seed the data with the following command:
```sh
npm run seed
```

- Run the server with the following command:

```sh
npm run start
```
#### Frontend

- Access folder `client` and install the necessary packages:
```sh
npm install
```
- Run the client:

```sh
ng serve -o
```
##### Optional

- You can receive detailed info about the backend endpoints by Swagger. First run the server in `client` folder:


```sh
npm run start
```
And access the following route in your browser:

```sh
http://localhost:3000/api
```

- You can run tests in `client` folder with the following command:

```sh
ng test
```


### Technologies used:
- [NestJS](https://nestjs.com/) framework used for the backed
- [Angular](https://angular.io/) famework used for the frontend
- [TypeORM](https://typeorm.io) TypeScript based ORM for database manipulation

### License:
The project was licensed under MIT license
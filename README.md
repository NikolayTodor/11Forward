# 11Forward

by:
Nikolay Todorov
Petar Atanasov

### Overview
11Forward is a instagram-inspired single-page application directed at Sci-Fi fans, that allows users to share images.
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

- You can receive detailed info about the backend endpoints by Swagger. First run the server in `server` folder:

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

### What can you do with 11forward

- You can upload images with titles and descriptions into posts. The image is hosted on Imgur and cropped into a square form with an image cropper. There are restrictions on image size and file-type.
- Your posts can be public (for everyone to see) or private (visible only to you and your followers).
- You can update the titles, descriptions and/or accessibility of your posts, but not the images.
- You can delete your posts, thus deleting the comments and likes related to them.
- You can browse the list of all users and browse through their profiles.
- You can follow other users (and gain access to their private posts) or unfollow them.
- Through your own profile you can see a list of whom you follow and all those who follow you. It also has an 'Add pic' functionality, allowing you to create posts just like from the home page.
- You can comment on the posts visible to you and update your comments at any time.
- You can like posts and comments. If you click 'like' again, you remove your like.
- You can update any part of your user profile at any time, including your avatar.
- You can delete your user profile, thus deleting all your posts, comments and likes.

- You can browse through the available public posts and their comments even when you're not logged in. You need to be logged in for every other functionality though.
- You can use 11forward on your phone, tablet or PC. The design is responsive.

### Technologies used:
- [NestJS](https://nestjs.com/) framework used for the backend
- [Angular](https://angular.io/) framework used for the frontend
- [TypeORM](https://typeorm.io) TypeScript based ORM for database manipulation

### License:
The project was licensed under MIT license

16.12.2019
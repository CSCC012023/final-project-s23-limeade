## Motivation

## Installation

0. Make sure you have Node.js, npm, Angular CLI, MongoDB installed as per the online documentation.

1. Open a terminal window and run the following commands to clone the repository:

```shell
$ git clone https://github.com/CSCC012023/final-project-s23-limeade.git  
$ cd [into created directory]
```
 
2. Run the following commands to start the backend server:

```shell
$ cd backend

$ npm install
```

Then create a `.env` file exactly like the `.env.example`.

```shell
$ node server.js
```

3. Open a new terminal window and run the following commands to configure the frontend:

```shell
$ cd frontend

$ npm install

$ ng generate environments
```

Then edit `./src/environments/environment.development.ts` just like the example file `./src/environments/environment.development.ts.example` 

Run the following command to start the frontend:

```shell
$ ng serve       
```

Then the app should be ready to go on http://localhost:4200!

## Contribution

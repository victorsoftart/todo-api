# Todolist Node API Example

This is a todolist api example build with node.js, mongodb.

## Project setup
```sh
npm install
```

### Compiles and hot-reloads for development
```sh
npm run pm2start
```

## MongoDB setup
install AMPPS
```sh
https://ampps.com/download
```
install MongoDB
```sh
http://localhost/ampps/index.php?act=ampps_apps
```
install RockMongo
```sh
http://localhost/ampps/index.php?act=ampps_apps#!act=listsoftwares&cat=dbtools

Admin Username: admin
Admin Password: pass

RockMongo installed at :
http://127.0.0.1/mongo
```

## API END POINT
```sh
- Get todo list
GET: handle/todos

- Add new todo
POST: handle/todos/add

- Update todo
POST: handle/todos/update

- Delete todo
DELETE: handle/todos/delete/:id

- Complete todo
PUT: handle/todos/complete/:id
```

## License

[MIT](http://opensource.org/licenses/MIT)

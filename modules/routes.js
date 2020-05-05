var mongoose = require('mongoose');
mongoose.connect(mongoConnectionString, {useMongoClient: true});
var db = mongoose.connection;
db.on('error', function(err){
  console.log('DB connection failed with error:' + JSON.stringify(err));
});
db.once('open', function(){
  console.log('Connected to TodoDB on Localhost.');
});
  
//var usersCtrl = require('./controllers/users.js');
//var storyCtrl = require('./controllers/story.js');
//var feedsCtrl = require('./controllers/feeds.js');
var todosCtrl = require('./controllers/todos.js');

module.exports = function(router) {
  // middleware to use for all requests
	router.use(function(req, res, next) {
		// do logging
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
  
  //Todos Endpoints
  router.route('/todos').get(todosCtrl.getTodos);
  router.route('/todos/add').post(todosCtrl.addTodo);
  router.route('/todos/update').post(todosCtrl.updateTodo);
  router.route('/todos/delete/:id').delete(todosCtrl.deleteTodo);
  router.route('/todos/complete/:id').put(todosCtrl.completeTodo);
};
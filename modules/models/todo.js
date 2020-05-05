var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = require('mongodb').ObjectID;
var Q         = require('q');

var todoSchema = new Schema({
	title:    { type: String, default: '' },
	project:  { type: String, default: '' },
	done:     { type: Boolean, default: 0 },
	created_at: { type: Date }
}, {collection: 'todo'});

var Todo = mongoose.model('Todo', todoSchema);

var self = module.exports = {
  modelName: Todo,
	getAll: function() {
    console.log('get all data>>>')
		var deferred = Q.defer();
		Todo.find({}, function(err, docs) {
			if (err) {
				deferred.reject('Error while getting todo');
			}
			else {
				if (docs) {
					deferred.resolve(docs);
				} else {
					deferred.reject('No existing todo');
				}
			}
		});
		return deferred.promise;
	},
  getByID: function(id) {
		var deferred = Q.defer();
		Todo.findById(id, function(err, docs) {
			if (err) {
				deferred.reject('Error while getting Todo');
			}
			else {
				if (docs) {
					deferred.resolve(docs);
				} else {
					deferred.reject('No existing Todo');
				}
			}
		});
		return deferred.promise;
	},
  save: function(todo) {
    var deferred = Q.defer();
		var newTodo = new Todo(todo);
    newTodo.save(function(err, docs) {
      console.log('save err>>>', err)
      console.log('save data>>>', docs)
      if(err) {
        deferred.reject('Error while adding new todo');
      }
      deferred.resolve(docs);
    });
    return deferred.promise;
	},
  update: function(todo) {
    console.log('update todo>>>')
		var deferred = Q.defer();
    var id = todo.id;
    var updateObject = {
      title: todo.title,
      project: todo.project,
      done: todo.done
    };
		Todo.update({_id  : ObjectId(id)}, {$set: updateObject}, function(err, docs) {
      console.log('err>>>', err);
      console.log('update docs>>>', docs);
			if (err) {
				deferred.reject('Error while complete todo');
			}
			deferred.resolve(docs);
		});
		return deferred.promise;
	},
  delete: function(id) {
    console.log('delete data id>>>'+id)
		var deferred = Q.defer();
		Todo.findByIdAndRemove(id, function(err, docs) {
      console.log('err>>>', err);
			if (err) {
				deferred.reject('Error while deleting todo');
			}
			deferred.resolve('Successful deletion');
		});
		return deferred.promise;
	},
  complete: function(id) {
    console.log('complete data id>>>'+id)
		var deferred = Q.defer();
    var updateObject = {done : true};
		Todo.update({_id  : ObjectId(id)}, {$set: updateObject}, function(err, docs) {
      console.log('err>>>', err);
      console.log('complete docs>>>', docs);
			if (err) {
				deferred.reject('Error while complete todo');
			}
			deferred.resolve('Successful complete');
		});
		return deferred.promise;
	},
  done: function(id) {
    console.log('done data id>>>'+id)
		var deferred = Q.defer();
    var updateObject = {done : true};
		Todo.findByIdAndUpdate(id, updateObject, function(err, docs) {
      console.log('err>>>', err);
			if (err) {
				deferred.reject('Error while done todo');
			}
			deferred.resolve('Successful done');
		});
		return deferred.promise;
	},
  reverse: function(id) {
    var deferred = Q.defer();
		Todo.findById(id, function(err, docs) {
			if (err) {
				deferred.reject('Error while getting Todo');
			}
      console.log("reverse docs>>>", docs)
      docs.done = !docs.done;
      docs.save(function(err1, docs1) {
        console.log('save err1>>>', err1)
        console.log('save data1>>>', docs1)
        if(err1) {
          deferred.reject('Error while reverse todo');
        }
        deferred.resolve(docs1);
      });
		});
		return deferred.promise;
	},
};
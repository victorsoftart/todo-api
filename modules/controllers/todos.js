var express = require('express');
var todoModel = require('../models/todo.js');
/**
 * Get todo list
 *
 * Endpoint: handle/todos
 * Method: GET
 **/
exports.getTodos = function(req, res) {
  console.log('get todos api>>>')
	todoModel.getAll().then(function(response) {
    console.log("model result>>>", response);
    return res.json({success: true, data: response});
  }, function(err) {
    console.log(err);
    return res.json({success: false, message: "Error while getting todo"});
  });
}
/**
 * Add new todo
 *
 * Endpoint: handle/todos/add
 * Method: POST
 * Request body: {title:"Todo", project:"project", done:false}
**/
exports.addTodo = function(req, res) {
  console.log("req>>>", req.body);
  /*var created_at = new Date();
  var todo = {
    title: "Todo " + created_at,
    project: "Project",
    done: false
  };*/
  var todo = req.body;
  todoModel.save(todo).then(function(response) {
    console.log("model result>>>", response);
    return res.json({success: true, data: response});
  }, function(err) {
    console.log(err);
    return res.json({success: false, message: 'Error while adding todo'});
  });
}
/**
 * Update todo
 *
 * Endpoint: handle/todos/update
 * Method: POST
 * Request body: {id:"5eb17085cbfa9b25887a1e38", title:"Todo", project:"project", done:false}
**/
exports.updateTodo = function(req, res) {
  console.log("req>>>", req.body);
  var todo = req.body;
  todoModel.update(todo).then(function(response) {
    console.log("model result>>>", response);
    return res.json({success: true, data: response});
  }, function(err) {
    console.log(err);
    return res.json({success: false, message: 'Error while adding todo'});
  });
}
/**
 * Delete todo
 *
 * Endpoint: handle/todos/delete/:id
 * Method: delete
**/
exports.deleteTodo = function(req, res) {
  var id = req.params.id;
  todoModel.delete(id).then(function(response) {
    console.log("model result>>>", response);
    return res.json({success: true, data: response});
  }, function(err) {
    console.log(err);
    return res.json({success: false, message: 'Error while deleting todo'});
  });
}
/**
 * Complete todo
 *
 * Endpoint: handle/todos/complete/:id
 * Method: put
**/
exports.completeTodo = function(req, res) {
  console.log("req>>>", req.params);
  var id = req.params.id;
  todoModel.complete(id).then(function(response) {
    console.log("model result>>>", response);
    return res.json({success: true, data: response});
  }, function(err) {
    console.log(err);
    return res.json({success: false, message: 'Error while deleting todo'});
  });
}
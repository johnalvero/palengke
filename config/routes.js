
module.exports.routes = {


  '/': {
    view: 'home/index'
  },

  'post /users': {
    controller : "Users",
    action : "create"
  },

  'put /users/:user_id': {
    controller : "Users",
    action : "update"
  },
  
  'delete /users/:user_id': {
    controller : "Users",
    action : "destroy"
  },

  'get /users/:user_id': {
    controller : "Users",
    action : "details"
  },

// Products

  'post /products': {
    controller : "Products",
    action : "create"
  },


  'get /products': {
    controller : "Products",
    action : "getAll"
  },

  'get /products/:product_id': {
    controller : "Products",
    action : "get"
  },  





  'put /products/:product_id': {
    controller : "Products",
    action : "update"
  }, 

  'delete /products/:product_id': {
    controller : "Products",
    action : "destroy"
  }, 

};

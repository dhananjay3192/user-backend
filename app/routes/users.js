const router = require("express").Router();
const users = require('../controllers/user')

module.exports = (app) => {
    const baseUrl = '/api'

    router.get('/users', users.getAllUsers)
    router.get('/users/:id', users.getUser)
    router.post('/users/add', users.addUser)
    router.put('/users/update/:id', users.updateUser)
    router.delete('/users/delete/:id', users.deleteUser)
  
    app.use(baseUrl, router);
  };
  
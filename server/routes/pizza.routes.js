const PizzaController = require('../controllers/pizza.controller');  //Import the code from Code Block 1
module.exports = (app) => {

    app.get('/api/pizzas', PizzaController.getAllPizzas);
    app.post('/api/pizzas', PizzaController.createPizza);
    app.delete('/api/pizzas/:id', PizzaController.deletePizza);
    app.patch('/api/pizzas/:id', PizzaController.updatePizza);
    
    
}


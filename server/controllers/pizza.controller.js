const Pizza = require('../models/pizza.model');  

module.exports.createPizza = (request, response) => {
    const { pizzas, sizes, notes } = request.body;
    Pizza.create({
        pizzas,
        sizes,
        notes
    })
        .then(pizza => response.json(pizza))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllPizzas = (request, response) => {
    Pizza.find({})
        .then(pizzas => response.json(pizzas))
        .catch(err => response.json(err));
}


module.exports.deletePizza = (request, response) => {
    Pizza.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

module.exports.updatePizza = (request, response) => {
    Pizza.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedPizza => response.json(updatedPizza))
        .catch(err => response.json(err))
}




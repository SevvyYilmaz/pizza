const mongoose = require('mongoose');
const PizzaSchema = new mongoose.Schema({
    pizzas: { type: String },
    sizes: { type: String},
    notes: { type: String,
    maxLength: [25, "Notes must contain max 25 characters"]
    },
    delivered: { type: Boolean, default: false }
    
}, { timestamps: true });
module.exports = mongoose.model('Product', PizzaSchema);


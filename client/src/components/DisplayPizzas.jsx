import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayPizzas = ({ pizzas, setPizzas }) => {
    const [showDelivered, setShowDelivered] = useState(true);

    const toggleDelivered = (id, delivered) => {
        axios
            .patch(`http://localhost:8000/api/pizzas/${id}`, { delivered: !delivered })
            .then(res => {
                const updatedPizzas = pizzas.map(pizza => {
                    if (pizza._id === id) {
                        return { ...pizza, delivered: !delivered };
                    }
                    return pizza;
                });
                setPizzas(updatedPizzas);
            })
            .catch(err => console.log(err));
    };

    const deletePizza = id => {
        axios
            .delete(`http://localhost:8000/api/pizzas/${id}`)
            .then(res => {
                setPizzas(pizzas.filter(pizza => pizza._id !== id));
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/pizzas')
            .then(res => {
                setPizzas(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleToggleDeliveredPizzas = () => {
        setShowDelivered(!showDelivered);
    };

    const filteredPizzas = showDelivered ? pizzas : pizzas.filter(pizza => !pizza.delivered);

    return (
        <div>
            <h1>Pizza Order</h1>
            <a href="/new">Order a Pizza</a>
            <p>Find Stores In Your Area</p>
            <button onClick={handleToggleDeliveredPizzas}>
                {showDelivered ? 'Hide Delivered Pizzas' : 'Show Delivered Pizzas'}
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Delivery Time</th>
                        <th>Pizza</th>
                        <th>Size</th>
                        <th>Delivered</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPizzas.map((pizza, idx) => (
                        <tr key={idx}>
                            <td>{pizza.deliveryTime}</td>
                            <td>{pizza.pizzas}</td>
                            <td>{pizza.sizes}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={pizza.delivered}
                                    onChange={() => toggleDelivered(pizza._id, pizza.delivered)}
                                />
                                {pizza.delivered ? 'True' : 'False'}
                            </td>
                            <td>
                                <button onClick={() => deletePizza(pizza._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayPizzas;

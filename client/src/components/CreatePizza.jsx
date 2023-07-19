import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'


const CreatePizza = () => {
    const [formData, setFormData] = useState({
        pizzas: 'Pepperoni',
        sizes: 'Single',
        notes: ''
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})


    const handleChange = (event) => {
        console.log(formData)
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8000/api/pizzas', formData)
            .then(res => {
                console.log(res)
                console.log(formData)
                navigate('/')
                setFormData({
                    pizzas: '',
                    sizes: '',
                    notes: ''
                })

            }
            )
            .catch(err => {console.log(err)
            setErrors(err.response.data.errors)
            }
        )

    }


    return (
        <div>
            <h1>{formData.sizes} {formData.pizzas}</h1>
            <a href="/">Go back Home</a>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="pizzas">Pizzas:</label>
                    <select name="pizzas" id="pizzas" value={formData.pizzas} onChange={handleChange}>
                        <option value="pepperoni">Pepperoni</option>
                        <option value="cheese">Cheese</option>
                        <option value="combination">Combination</option>
                        <option value="phillycheesestake">Philly Cheese Steak</option>
                        <option value="hawaiian">Hawaiian</option>
                        <option value="veggie">Veggie</option>
                    </select>
                    {errors.pizzas ? <p>{errors.pizzas.message}</p> : ""}
                </div>

                <div>
                    <label htmlFor="sizes">Sizes:</label>
                    <select name="sizes" id="sizes" value={formData.sizes} onChange={handleChange}>
                        <option value="single">Single</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                    {errors.sizes ? <p>{errors.sizes.message}</p> : ""}
                </div>
                <div>
                    <label htmlFor="notes">Notes:</label>
                    <textarea name="notes" rows ="10" cols= "30" value={formData.notes} onChange={handleChange}/>
                    {errors.notes ? <p>{errors.notes.message}</p> : ""}
                </div>

                <button type='submit'>Order Now</button>


            </form>
        </div>
    )
}

export default CreatePizza
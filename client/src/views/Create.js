import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Create = () => {
    const [store, setStore] = useState('')
    const [number, setNumber] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const [errorList, setErrorList] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`http://localhost:8000/api/shops/new`, { store, number, isOpen })
            .then(res => {
                const createdShop = res.data
                navigate(`/shops/${createdShop._id}`)
            })
            .catch(error => {
                console.log(error.response.data.errors)
                const errorRespondData = error.response.data.errors
                const tempErrorArray = []
                for (const eachKey in errorRespondData) {
                    tempErrorArray.push(errorRespondData[eachKey].message)
                }
                setErrorList(tempErrorArray)
            })
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1 className="p-2">Store Finder</h1>
                <Link className='p-2 btn btn-outline-warning text-black me-2 my-auto' to='/'>Go back home</Link>
            </div>
            <p>add a new store!</p>
            <form style={{border: "solid"}}  className='form p-3' onSubmit={handleSubmit}>
                <div>
                    <label>Store Name: </label>
                    <input style={{border: "solid"}}  type="text" name="store" value={store} className='form-control'
                        onChange={event => setStore(event.target.value)} />
                </div>
                <div>
                    <label>Store Number: </label>
                    <input style={{border: "solid"}}  type="number" name="number" value={number} className='form-control'
                        onChange={event => setNumber(event.target.value)} />
                </div>
                <div>
                    <input type="checkbox" name="isOpen" checked={isOpen}
                        onChange={event => setIsOpen(event.target.checked)} />
                        <label className='ms-2'>Open?: </label>
                </div>
                <button className='btn btn-outline-success me-2 text-black' type="submit">Add a store!</button>
                {
                    errorList.map((eachError, idx) => (
                        <p className='text-danger' key={idx}>{eachError}</p>
                    ))
                }
            </form>
        </div>
    )
}

export default Create

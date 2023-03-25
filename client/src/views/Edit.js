import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

const Edit = () => {
    const [store, setStore] = useState('')
    const [number, setNumber] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const [errorList, setErrorList] = useState([])

    const { _id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shops/${_id}`)
            .then(res => {
                const shop = res.data
                console.log(res)
                setStore(shop.store)
                setNumber(shop.number)
                setIsOpen(shop.isOpen)
            })
            .catch(error => console.log(error))
    }, [_id])


    const handleSubmit = (event) => {
        event.preventDefault()
        axios.put(`http://localhost:8000/api/shops/${_id}/update`, { store, number, isOpen })
            .then(res => navigate(`/shops/${_id}`))
            .catch(error => {
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
                        <p>Edit this store!</p>
            <form style={{border: "solid"}} className='form p-3' onSubmit={handleSubmit}>
                <div>
                    <label>Store Name: </label>
                    <input style={{border: "solid"}} type="text" name="store" value={store} className='form-control'
                        onChange={event => setStore(event.target.value)} />
                </div>
                <div>
                    <label>Store Number: </label>
                    <input style={{border: "solid"}} type="number" name="number" value={number} className='form-control'
                        onChange={event => setNumber(event.target.value)} />
                </div>
                <div>
                    <input type="checkbox" name="isOpen" checked={isOpen}
                        onChange={event => setIsOpen(event.target.checked)} />
                        <label className='ms-2'>Open: </label>
                </div>
                <button className='btn btn-outline-success me-2 text-black mt-2' type="submit">Edit Store</button>
                {
                    errorList.map((eachError, idx) => (
                        <p className='text-danger' key={idx}>{eachError}</p>
                    ))
                }
            </form>
        </div>
    )
}

export default Edit

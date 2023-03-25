import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from "axios"

const Dashboard = () => {
    const [shopList, SetShopList] = useState([])
    const [shop, setShop] = useState(null)

    const { _id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shops`)
            .then(res => {
                SetShopList(res.data)
            })
            .catch(error => console.log(error))
    }, [])


    const handleDelete = (deleteId=>{
        axios.delete(`http://localhost:8000/api/shops/${deleteId}`)
            .then(res=>{
                const filteredList = shopList.filter((eachShop)=>eachShop._id !== deleteId)
                const mapSort1 = new Map([...filteredList.entries()].sort((a, b) => b[1] - a[1]));
console.log(mapSort1);
                SetShopList(filteredList)
            })
            .catch(error=>console.log(error))
    })

    return (
        <div>

            <h1>Store Finder</h1>
            <p>Find stores in your area!</p>

            <table style={{border: "solid"}} className='table table-striped'>
                <thead>
                    <tr>
                        <th style={{borderRight: "solid"}} className="bg-secondary">Store</th>
                        <th style={{borderRight: "solid"}} className="bg-secondary">Store Number</th>
                        <th style={{borderRight: "solid"}} className="bg-secondary">Open</th>
                        <th style={{borderRight: "solid"}} className="bg-secondary">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        shopList.map((eachShop, idx) => (
                            <tr  key={idx}>
                                <td style={{borderRight: "solid"}} > <Link to={`/shops/${eachShop._id}`}>{eachShop.store} </Link></td>
                                <td style={{borderRight: "solid"}}> {eachShop.number}</td>
                                <td style={{borderRight: "solid"}}>  {eachShop.isOpen ? "True" : "False"}</td>

                            
                        
                                 <td>{eachShop.isOpen &&<button className='btn btn-outline-danger text-black' onClick={() => handleDelete(eachShop._id)}>Delete</button>}</td> 

                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <p><Link className='btn btn-outline-primary text-black' to="/shops/new"> Cant find your store?</Link></p>

        </div>
    )
}

export default Dashboard

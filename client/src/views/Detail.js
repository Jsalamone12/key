import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams} from 'react-router-dom'

const Detail = () => {
    const [shop, setShop] = useState(null)

    const { _id } = useParams()


    useEffect(() => {
        axios.get(`http://localhost:8000/api/shops/${_id}`)
            .then(res => setShop(res.data))
            .catch(error => console.log(error))
    }, [_id])


    return (
        <div>
            {
                shop ?
                    <div className='container'>
                        <div className="d-flex justify-content-between">
                            <h1 style={{marginBottom: "15px"}} className="p-2">Store Finder</h1>
                            <Link className='p-2 btn btn-outline-warning text-black me-2 my-auto' to='/'>Go back home</Link>
                        </div>

                        <h2>{shop.store}</h2>
                        <h2>Store Number: {shop.number}</h2>
                        <h2>{shop.isOpen ? "Open" : "Closed"}</h2>
                        <footer className=''>
                            <Link style={{marginTop: "250px"}} className=' btn btn-outline-warning text-black me-2' to={`/shops/${_id}/update`}>Edit store details</Link>
                        </footer>
                    </div> :
                    <h1>loading...</h1>
            }

        </div>
    )
}

export default Detail

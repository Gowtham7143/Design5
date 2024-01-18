import React, { useState, useEffect } from 'react'

const URL = 'https://fakestoreapi.com/products/category/'
const Home = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ status: false, message: '' })

    useEffect(() => {
        const fetchData = () => {
            // console.log(URL + category)
            setLoading(true)
            fetch('https://fakestoreapi.com/products')
                .then(res => res.json())
                .then(json => {
                    console.log(json)
                    setProducts(json)
                }).catch(err => {
                    console.log(err)
                    setError({ status: true, message: err.message })
                })
            setLoading(false)
        };
        fetchData();
    }, [])

    const handleSearch = () => {
        // console.log(URL + category)
        if (category) {
            setLoading(true)
            fetch(URL + category)
                .then(res => res.json())
                .then(json => {
                    console.log(json)
                    setProducts(json)
                }).catch(err => {
                    console.log(err)
                    setError({ status: true, message: err.message })
                })
            setLoading(false)
        }
        else {
            setLoading(true)
            fetch('https://fakestoreapi.com/products')
                .then(res => res.json())
                .then(json => {
                    console.log(json)
                    setProducts(json)
                }).catch(err => {
                    console.log(err)
                    setError({ status: true, message: err.message })
                })
            setLoading(false)
        }
    };
    return (
        <div className="flex flex-col items-center space-y-4 bg-gray-400">
            <div className="flex items-center m-2">
                <input
                    type="text"
                    placeholder="Search"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button className="bg-blue-500 text-white px-4 py-2 search-bar-button" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {loading && !error.status && <h1>Loading...</h1>}

            {!loading && !error.status && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                    {products.map((product) => (
                        <div key={product.id} className="border p-4 bg-gray-200 rounded-lg m-2 h-90">
                            <img src={product.image} alt={product.title} className="mb-2 w-100 h-40 object-cover rounded-t-lg" />
                            <div>
                                <p className="info-name text-lg font-bold mb-2 truncate">{product.title}</p>
                                <p className="info-price">${product.price}</p>
                                <p className="info-rating">
                                    {product.rating.rate} Stars ({product.rating.count})
                                </p>
                                <div className="flex items-center justify-center mt-2">
                                    <button className="bg-blue-500 text-white px-4 py-2 m-2">Add to Cart</button>
                                    <button className="bg-blue-500 text-white px-4 py-2 m-2">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}

export default Home

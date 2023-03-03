import React, { useEffect, useState } from "react";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch("products.json")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    useEffect( () => {
        const storedCart = getStoredCart()
        const saveCart = [];
        for(const id in storedCart) {
            const addedProduct = products.find(product => product.id === id)
            if(addedProduct) {
                const quentity = storedCart[id]
                addedProduct.quentity = quentity;
                saveCart.push(addedProduct)
            }
        }
        setCart(saveCart)
    }, [products])

    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id)
        if(!exists) {
            selectedProduct.quentity = 1;
            newCart = [...cart, selectedProduct]
        }
        else {
            const rest = cart.filter(product => product.id !== selectedProduct.id)
            exists.quentity = exists.quentity +1;
            newCart = [...rest, exists]
        }
        setCart(newCart);
        addToDb(selectedProduct.id);
    };

    return (
        <div className="shop-container">
            <div className="products-container">
                {products.map((product) => (
                    <Product 
                        key={product.id} 
                        product={product} 
                        handleAddToCart={handleAddToCart} />
                ))}
            </div>
            <div className="cart-container">
                <Cart cart={cart}/>
            </div>
        </div>
    );
};

export default Shop;

import React from "react";
import "./Product.css";

const Product = (props) => {
    const { handleAddToCart, product } = props;
    const { name, img, price, seller, ratings } = product;

    return (
        <div className="product">
            <img src={img} alt="" />

            <div className="product-info">
                <p className="product-name">{name}</p>
                <p>Price: ${price}</p>
                
                <div className="inner-product-infor">
                    <p>seller: {seller}</p>
                    <p>ratings: {ratings} stars</p>
                </div>
            </div>
            <button onClick={() => handleAddToCart(product)} className="btn-cart">
                <p>Add To Cart</p>
            </button>
        </div>
    );
};

export default Product;

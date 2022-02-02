import React from "react";

const ProductGridItem = ({ name, image, price, description }) => {
    return (
        <div className="product-grid-item center" id="product-grid-item">
            <div className="product-grid-item_name">{name}</div>
            <div className="product-grid-item_image">
                <img class="product-grid-image" src={image} alt={description}/></div>
            <div className="product-grid-item_price">{price}</div>
        </div>
    )
}

export default ProductGridItem;
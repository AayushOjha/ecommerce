import React from 'react';
import data from './../data';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {data.products.map((product) => {
          return (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <div className="imageCointainer">
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </Link>
              <div className="productInfo">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>{product.price}</strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

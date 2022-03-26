import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: false,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await axios.get('http://localhost:5002/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
        console.log(response.data);
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);

  if (loading) {
    console.log(products);
    return (
      <div>
        <h1>Products</h1>
        <div className="products">
          {products.map((product) => {
            console.log('dekha dekhani');
            return (
              <div className="product" key={product.slug}>
                {console.log('maa na chudaaee')}
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
  return <h1>something</h1>;
}

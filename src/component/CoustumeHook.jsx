import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('http://localhost:5000/api/user/allproducts')
        setProducts(resp.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return { products, setProducts };
};

export default useFetchProducts;

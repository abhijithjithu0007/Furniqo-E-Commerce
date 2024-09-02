import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { cartContext } from './CartContext';


const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setMyPro } = useContext(cartContext)
  
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


  const addToCart = async (id, price) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/user/addtocart', {
        productId: id,
        quantity: 1,
        price: price
      }, { withCredentials: true });
      setMyPro(data.products)
      toast.success("Added To Cart", { position: 'top-right' });
    } catch (error) {
      console.log(error);
    }
  };

  return { products, setProducts, addToCart };
};

export default useFetchProducts;

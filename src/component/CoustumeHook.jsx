import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { cartContext } from '../Context/CartContext';
import { useLoad } from '../Context/LoadingContext';
import axiosInstance from '../axiosInstance';


const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const { setMyPro } = useContext(cartContext)
  const {startLoad,stopLoad} = useLoad(useContext)
  
  useEffect(() => {
    const fetchData = async () => {
      startLoad()
      try {
        const resp = await axiosInstance.get(`/api/user/allproducts`)
        setProducts(resp.data)
      } catch (error) {
        console.log(error);
      }finally{
        stopLoad()
      }
    };

    fetchData();
  }, []);


  const addToCart = async (id, price) => {
    startLoad()
    try {
      const { data } = await axiosInstance.post(`/api/user/addtocart`, {
        productId: id,
        quantity: 1,
        price: price
      }, { withCredentials: true });
      setMyPro(data.products)
      toast.success("Added To Cart", { position: 'top-right' });
    } catch (error) {
      console.log(error);
    }finally{
      stopLoad()
    }
  };

  return { products, setProducts, addToCart };
};

export default useFetchProducts;

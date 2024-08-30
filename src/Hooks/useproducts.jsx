import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useproducts() {

    


    function getprodects() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
      }
      let productinfo = useQuery({
        queryKey: ["recentproduct"],
        queryFn: getprodects,
        select:(data)=>data.data.data,
        // staleTime: 10000,
        // retry:7,
        // retryDelay:6000,
        // refetchIntervalInBackground:true,
      });
    

return productinfo

}


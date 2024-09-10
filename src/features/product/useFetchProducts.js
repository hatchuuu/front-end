//Bukan React Function Component karena tidak mereturn sebuah component, hanya logic
//INI ADALAH HOOKS

import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query"

export const UseFetchProducts = ({onError}) => {

  //ekspor universal dari useQuery tersebut, 
  //sehingga dapat mengakses semua methodenya
  return useQuery({
      //queryFn itu untuk fetching data
      queryFn: async () => {
        const productResponse = await axiosInstance.get("/products");
        // setProducts(productResponse.data);
        return productResponse.data;
      },
      //caching
      queryKey: ["fetch.products"],
      onError
    })
}
import axiosInstance from "@/lib/axios";
import {useMutation} from "@tanstack/react-query"

export const useDeleteProduct = ({onSuccess}) => {
return useMutation({
    mutationFn: async (id) => {
        try {
            const productResponse = await axiosInstance.delete(`/products/${id}`);
            return productResponse;
        } catch (error) {
            console.log(error);
        }
    },
    onSuccess
  })
}
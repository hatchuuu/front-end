import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditProduct = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async (body) => {
            try {
                const productResponse = await axiosInstance.patch(`/products/${body.id}`, body);
                return productResponse;
            } catch (error) {
                console.log(error);
            }
        }, onSuccess
    })
}
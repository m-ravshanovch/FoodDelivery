import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import { useServiceAuth } from "./useServiceAuth";
export const useQueryServiceAuth = () => {
  const queryClient = useQueryClient();

  const useNotifications = () =>
    useQuery({
      queryKey: ["notifications"],
      queryFn: async () => {
        const response = await useServiceAuth.getNotifications();
        return response.data;
      },
    });
//   const useCategories = () =>
//     useQuery({
//       queryKey: ["categories"],
//       queryFn: async () => {
//         const response = await useService.getAllCategories();
//         return response.data;
//       },
//     });


  const useCreateOrder = () =>
    useMutation({
      mutationFn: async (payload: any) => {
        const response =
          await useServiceAuth.createOrder(payload);

        return response.data;
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
      },
    });

    
  const useCreateRestaurant = () =>
    useMutation({
      mutationFn: async (payload: any) => {
        const response =
          await useServiceAuth.createRestaurant(payload);

        return response.data;
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["restaurants"],
        });
      },
    });


  return {
    useNotifications,
    useCreateOrder,
    useCreateRestaurant
    // useCategories
  };
};
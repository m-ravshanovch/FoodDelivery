import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import { computed } from "vue";
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
  const useOrders = () =>
    useQuery({
      queryKey: ["orders"],
      queryFn: async () => {
        const response = await useServiceAuth.getAllOrders();
        return response.data;
      },
    });
  const useAvailableOrders = () =>
    useQuery({
      queryKey: ["availableOrders"],
      queryFn: async () => {
        const response = await useServiceAuth.getAvailableOrders();
        return response.data;
      },
    });
  const useGetMyOrdersByCustomerId = (customer_id:number) =>
    useQuery({
      queryKey: ["orders"],
      enabled: computed(() => customer_id !== null),
      queryFn: async () => {
        const response = await useServiceAuth.getAllOrdersByCustomerId(customer_id);
        return response.data;
      },
    });
  const useOrdersByRestaurantId = (restaurantId: string) =>
    useQuery({
      queryKey: ["orders"],
      queryFn: async () => {
        const response = await useServiceAuth.getAllOrdersByRestaurantId(restaurantId);
        return response.data;
      },
    });
  const useMyInformation = () =>
    useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const response = await useServiceAuth.getMyInformation();
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
  const useCreateCategoryByResturant = () =>
    useMutation({
      mutationFn: async (payload: any) => {
        const response =
          await useServiceAuth.createCategoriesByRestaurant(payload);

        return response.data;
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["categoriesByRestaurantId"],
        });
      },
    });
  const useCreateProduct = () =>
    useMutation({
      mutationFn: async (payload: any) => {
        const response =
          await useServiceAuth.createProduct(payload);

        return response.data;
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["categoriesByRestaurantId"],
        });
      },
    });

  const useDeleteCategory = () =>
    useMutation({
      mutationFn: async (id: number) => {
        const response = await useServiceAuth.deleteCategory(id);
        return response.data;
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["categoriesByRestaurantId"],
        });
      },
    });
  const useDeleteRestaurant = () =>
    useMutation({
      mutationFn: async (uuid: string) => {
        const response = await useServiceAuth.deleteRestaurant(uuid);
        return response.data;
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["restaurants"],
        });
      },
    });
  const useActivateUser = () =>
    useMutation({
      mutationFn: (id: number) => useServiceAuth.makeUserActiveById(id),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
    });
  const useChangeOrderStatus = () =>
    useMutation({
      mutationFn: ({ status, id }: { status: string; id: string }) =>
        useServiceAuth.changeStatusOrder(status, id),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
      },
    });
  const useGetOrderByCourier = () =>
    useMutation({
      mutationFn: (payload:any) =>
        useServiceAuth.getOrderByCurier(payload),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
      },
    });



  return {
    useNotifications,
    useCreateOrder,
    useCreateRestaurant,
    useCreateCategoryByResturant,
    useDeleteCategory,
    useCreateProduct,
    useOrders,
    useActivateUser,
    useDeleteRestaurant,
    useOrdersByRestaurantId,
    useChangeOrderStatus,
    useAvailableOrders,
    useMyInformation,
    useGetOrderByCourier,
    useGetMyOrdersByCustomerId
    // useCategories
  };
};
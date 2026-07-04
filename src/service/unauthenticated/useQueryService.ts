import { useQuery } from "@tanstack/vue-query";
import { computed, type Ref } from "vue";
import { useService } from "./useService";

export const useQueryService = () => {
  const useRestaurants = () =>
    useQuery({
      queryKey: ["restaurants"],
      queryFn: async () => {
        const response = await useService.getAllResturants();
        return response.data;
      },
    });

  const useRestaurantById = (uuid: string) =>
    useQuery({
      queryKey: ["restaurant", uuid],

      enabled: computed(() => uuid.trim() !== ""),

      queryFn: async () => {
        const response = await useService.getResturantById(uuid);
        return response.data;
      },
    });

  const useCategories = () =>
    useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        const response = await useService.getAllCategories();
        return response.data;
      },
    });

  const useProductsByRestaurantId = (restaurant_id: string) =>
    useQuery({
      queryKey: ["products", restaurant_id],
      queryFn: async () => {
        const response =
          await useService.getAllProductsByResturantId(restaurant_id);

        return response.data;
      },
    });

  const useAds = () =>
    useQuery({
      queryKey: ["ads"],
      queryFn: async () => {
        const response = await useService.getAllAdvertize();
        return response.data;
      },
    });

  const useCategoriesByRestaurantId = (restaurant_id: string) =>
    useQuery({
      queryKey: ["categoriesByRestaurantId", restaurant_id],
      queryFn: async () => {
        const response =
          await useService.getCategoriesByResturantId(restaurant_id);

        return response.data;
      },
    });
  const useRestaurantsByOwnerId = (owner_id: number) =>
    useQuery({
      queryKey: ["restaurantByOwnerId", owner_id],
      queryFn: async () => {
        const response =
          await useService.getRestaurantsByOwnerId(owner_id);

        return response.data;
      },
    });

  const useRestaurantsByCategory = (category: Ref<string>) =>
    useQuery({
      queryKey: ["restaurantsByCategory", category],

      enabled: computed(() => category.value !== ""),

      queryFn: async () => {
        const response = await useService.getResturantByCategory(
          category.value
        );

        return response.data;
      },

      retry: false,
    });
  const useAllProductsByCategoryAndRestaurantId = (category: Ref<string>, restaurant_id: string) =>
    useQuery({
      queryKey: ["productsByCategoryAndRestaurantId", category, restaurant_id],

      enabled: computed(() => category.value !== "" && restaurant_id !== ""),

      queryFn: async () => {
        const response = await useService.getAllProductsByCategoryAndRestaurantId(
          restaurant_id,
          category.value
        );

        return response.data;
      },

      retry: false,
    });

  return {
    useRestaurants,
    useCategories,
    useProductsByRestaurantId,
    useRestaurantById,
    useAds,
    useCategoriesByRestaurantId,
    useRestaurantsByCategory,
    useAllProductsByCategoryAndRestaurantId,
    useRestaurantsByOwnerId
  };
};
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRestaurantStore = defineStore("restaurant", () => {
  const restaurantId = ref(
    localStorage.getItem("restaurantId") || ""
  );

  function setRestaurantId(id: string) {
    restaurantId.value = id;
    localStorage.setItem("restaurantId", id);
  }

  function clearRestaurantId() {
    restaurantId.value = "";
    localStorage.removeItem("restaurantId");
  }

  return {
    restaurantId,
    setRestaurantId,
    clearRestaurantId,
  };
});
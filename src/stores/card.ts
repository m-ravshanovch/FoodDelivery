import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

interface CartItem {
  category: number;
  delivery_time: string;
  description: string;
  discount: string;
  discount_status: string;
  id: number;
  img_product: string;
  name: string;
  new_price: string;
  price: string;
  promotion: string;
  quantity: number;
}

export const useCartStore = defineStore("cart", () => {
  const cart = ref<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  watch(
    cart,
    (newCart) => {
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    { deep: true }
  );

  function addToCart(product: Omit<CartItem, "quantity">) {
    const item = cart.value.find((i) => i.id === product.id);

    if (item) {
      item.quantity++;
      return;
    }

    cart.value.push({
      ...product,
      quantity: 1,
    });
  }

  function increase(id: number) {
    const item = cart.value.find((i) => i.id === id);

    if (item) {
      item.quantity++;
    }
  }

  function decrease(id: number) {
    const item = cart.value.find((i) => i.id === id);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
      removeItem(id);
    }
  }

  function quantity(id: number) {
    return cart.value.find((i) => i.id === id)?.quantity ?? 0;
  }

  const totalItems = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalPrice = computed(() =>
    cart.value.reduce((sum, item) => {
      const price =
        item.new_price && item.new_price !== ""
          ? Number(item.new_price)
          : Number(item.price);

      return sum + price * item.quantity;
    }, 0)
  );

  function removeItem(id: number) {
    cart.value = cart.value.filter((i) => i.id !== id);
  }

  function clearCart() {
    cart.value = [];
    localStorage.removeItem("cart");
  }

  return {
    cart,
    addToCart,
    increase,
    decrease,
    quantity,
    totalItems,
    totalPrice,
    removeItem,
    clearCart,
  };
});
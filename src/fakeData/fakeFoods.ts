export interface Food {
  id: number;
  restaurantUniqueId: string;
  name: string;
  price: string;
  newPrice: string | null;
  discount: string | null;
  status: boolean;
  promotion: string | null;
  image: string;
  description: string;
  deliveryTime: string;
}

const fastFoodMenu = [
  "Big Burger",
  "Cheeseburger",
  "Double Burger",
  "Chicken Burger",
  "Spicy Burger",
  "Classic Lavash",
  "Chicken Lavash",
  "Cheese Lavash",
  "Beef Donar",
  "Chicken Donar",
  "Hot Dog",
  "Cheese Hot Dog",
  "Club Sandwich",
  "Chicken Sandwich",
  "French Fries",
  "Country Potatoes",
  "Chicken Nuggets",
  "Caesar Salad",
  "Coleslaw",
  "Combo Meal",
];

const chickenMenu = [
  "Chicken Bucket",
  "Spicy Chicken Bucket",
  "Original Chicken",
  "Crispy Wings",
  "Hot Wings",
  "Chicken Strips",
  "Chicken Nuggets",
  "Twister",
  "Spicy Twister",
  "Chicken Burger",
  "Zinger Burger",
  "Double Zinger",
  "Chicken Box",
  "Family Box",
  "French Fries",
  "Potato Wedges",
  "Corn Cup",
  "Coleslaw",
  "Chicken Salad",
  "Chicken Combo",
];

const pizzaMenu = [
  "Pepperoni Pizza",
  "Margherita Pizza",
  "Four Cheese Pizza",
  "Chicken Pizza",
  "BBQ Chicken Pizza",
  "Meat Lovers Pizza",
  "Vegetable Pizza",
  "Mushroom Pizza",
  "Hawaiian Pizza",
  "Mexican Pizza",
  "Supreme Pizza",
  "Cheese Pizza",
  "Sausage Pizza",
  "Tuna Pizza",
  "Spinach Pizza",
  "Pizza Bread",
  "Garlic Bread",
  "Chicken Wings",
  "Caesar Salad",
  "Pizza Combo",
];

const streetFoodMenu = [
  "Street Burger",
  "Double Street Burger",
  "Smash Burger",
  "Chicken Burger",
  "Steak Sandwich",
  "Chicken Sandwich",
  "Beef Wrap",
  "Chicken Wrap",
  "Beef Taco",
  "Chicken Taco",
  "Loaded Fries",
  "Cheese Fries",
  "Onion Rings",
  "Chicken Wings",
  "Chicken Nuggets",
  "Hot Dog",
  "Quesadilla",
  "Caesar Salad",
  "Greek Salad",
  "Street Combo",
];

const burgerMenu = [
  "Classic Burger",
  "Cheeseburger",
  "Double Cheeseburger",
  "Triple Burger",
  "Bacon Burger",
  "Mushroom Burger",
  "BBQ Burger",
  "Spicy Burger",
  "Chicken Burger",
  "Fish Burger",
  "Whopper Burger",
  "Junior Burger",
  "Breakfast Burger",
  "Chicken Wrap",
  "Chicken Nuggets",
  "French Fries",
  "Cheese Fries",
  "Onion Rings",
  "Garden Salad",
  "Burger Combo",
];

const menus = {
  fastFood: fastFoodMenu,
  chicken: chickenMenu,
  pizza: pizzaMenu,
  streetFood: streetFoodMenu,
  burger: burgerMenu,
};

type MenuType = keyof typeof menus;

const restaurants: Array<{
  uniqueId: string;
  name: string;
  deliveryTime: string;
  menu: MenuType;
}> = [
  { uniqueId: "maxway", name: "Max Way", deliveryTime: "25 min", menu: "fastFood" },
  { uniqueId: "evos", name: "Evos", deliveryTime: "20 min", menu: "fastFood" },
  { uniqueId: "oqtepa", name: "Oqtepa", deliveryTime: "22 min", menu: "fastFood" },
  { uniqueId: "kfc", name: "KFC", deliveryTime: "30 min", menu: "chicken" },
  { uniqueId: "bellissimo", name: "Bellissimo", deliveryTime: "35 min", menu: "pizza" },
  { uniqueId: "lesailes", name: "Les Ailes", deliveryTime: "25 min", menu: "chicken" },
  { uniqueId: "feedup", name: "Feed Up", deliveryTime: "20 min", menu: "streetFood" },
  { uniqueId: "street77", name: "Street 77", deliveryTime: "25 min", menu: "streetFood" },
  { uniqueId: "burgerking", name: "Burger King", deliveryTime: "30 min", menu: "burger" },
  { uniqueId: "mcdonalds", name: "McDonald's", deliveryTime: "30 min", menu: "burger" },
];

const foodImages = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  "https://images.unsplash.com/photo-1529006557810-274b9b2fc783",
  "https://images.unsplash.com/photo-1550547660-d9450f859349",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
  "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58",
];

const formatPrice = (price: number) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const foods: Food[] = restaurants.flatMap((restaurant, restaurantIndex) =>
  menus[restaurant.menu].map((foodName, foodIndex) => {
    const promotionCount = restaurantIndex % 2 === 0 ? 2 : 1;
    const promotions = ["1+1", "Free drink"];
    const promotion = foodIndex < promotionCount ? promotions[foodIndex] : null;
    const price = 18000 + foodIndex * 2500 + restaurantIndex * 500;
    const discountPercentage = 10 + (foodIndex % 4) * 5;
    const newPrice = promotion
      ? Math.round(price * (1 - discountPercentage / 100))
      : null;

    return {
      id: restaurantIndex * 20 + foodIndex + 1,
      restaurantUniqueId: restaurant.uniqueId,
      name: foodName,
      price: formatPrice(price),
      newPrice: newPrice === null ? null : formatPrice(newPrice),
      discount: promotion ? `${discountPercentage}%` : null,
      status: Boolean(promotion),
      promotion,
      image: foodImages[(restaurantIndex + foodIndex) % foodImages.length],
      description: `${restaurant.name}'s fresh ${foodName.toLowerCase()}`,
      deliveryTime: restaurant.deliveryTime,
    };
  }),
);

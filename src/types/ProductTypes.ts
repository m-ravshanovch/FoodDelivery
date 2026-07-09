export interface createProdcut {
  category: number;
  restaurant_uuid?: string | null;

  name: string;
  description?: string | null;

  price: string;
  new_price?: string | null;
  discount?: string | null;

  discount_status?: boolean;

  promotion?: string | null;

  img_product?: File | null;

  delivery_time?: string | null;
}
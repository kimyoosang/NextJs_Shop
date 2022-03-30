export interface CartItem {
  id: number;
  product: {
    id: string;
    title: string;
    price: number;
  };
  quantity: number;
}

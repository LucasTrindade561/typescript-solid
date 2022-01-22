import { CartItem } from './cart-item';

export interface ShoppingCartProtocol {
  addItem(item: CartItem): void;
  removeItem(index: number): void;
  items: Readonly<CartItem[]>;
  total(): number;
  totalWithDiscount(): number;
  isEmpty(): boolean;
  clear(): void;
}

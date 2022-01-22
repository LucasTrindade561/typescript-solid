import { CartItem } from './interfaces/cart-item';

export class ShoppingCart {
  private readonly _items: CartItem[] = [];

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  //como é readonly, dá só para ver oq tem dentro do array, não dá para modificar(get)
  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  total(): number {
    return +this._items // + = converte para um number
      .reduce((total, next) => total + next.price, 0)
      .toFixed(2);
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  clear(): void {
    console.log('Carrinho de compra foi limpo.');
    this._items.length = 0;
  }
}

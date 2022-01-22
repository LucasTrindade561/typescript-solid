// Single Responsibility Principle --> classe deve ter apenas uma responsabilidade
/*
 Tipos de single responsibility
  mensageria, persistencia(salvar os dados no banco), regra de negocio, a validação(em alguns casos)
*/

type CartItem = { name: string; price: number };
type OrderStatus = 'open' | 'closed';

export class ShoppingCartLegacy {
  private readonly _items: CartItem[] = [];
  private _orderStatus: OrderStatus = 'open';

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

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  total(): number {
    return +this._items // + = converte para um number
      .reduce((total, next) => total + next.price, 0)
      .toFixed(2);
  }

  checkout(): void {
    if (this.isEmpty()) {
      this.sendMessage('Seu carrinho esta vazio.');
      return;
    }

    this._orderStatus = 'closed';
    this.sendMessage(
      `Seu pedido com um total de ${this.total()} foi recebido.`,
    );
    this.saveOrder();
    this.clear();
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  sendMessage(msg: string): void {
    console.log('Mensagem enviada:', msg);
  }

  saveOrder(): void {
    console.log('Pedido salvo com sucesso.');
  }

  clear(): void {
    console.log('Carrinho de compra foi limpo.');
    this._items.length = 0;
  }
}

const shoppingCart = new ShoppingCartLegacy();
shoppingCart.addItem({ name: 'Shirt', price: 100 });
shoppingCart.addItem({ name: 'Paint', price: 99 });
shoppingCart.addItem({ name: 'Shoes', price: 300.59 });
// shoppingCart.clear();

console.log(shoppingCart.orderStatus);
console.log(shoppingCart.items);
console.log(shoppingCart.total());
shoppingCart.checkout();
console.log(shoppingCart.orderStatus);

import { OrderStatus } from './interfaces/order-status';
import { ShoppingCart } from './shopping-cart';
import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  // Aqui no construtor esta ocorrendo uma ingencao de dependecia
  constructor(
    private readonly cart: ShoppingCart,
    private readonly massaging: Messaging,
    private readonly persistency: Persistency,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      this.massaging.sendMessage('Seu carrinho esta vazio.');
      return;
    }

    this._orderStatus = 'closed';
    this.massaging.sendMessage(
      `Seu pedido com um total de ${this.cart.total()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
  }
}

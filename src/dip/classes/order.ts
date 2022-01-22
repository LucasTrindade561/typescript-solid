import { OrderStatus } from './interfaces/order-status';
import { CustomerOrder } from './interfaces/customer-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { PersistencyProtocol } from './interfaces/persistency-protocol';

// Aqui botamos protocol, pq n queremos que order dependa da classe concretas
// Fazendo assim que order não seja dependente de alguem
export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly massaging: MessagingProtocol,
    private readonly persistency: PersistencyProtocol,
    private readonly customer: CustomerOrder, //uma abstração
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
      `Seu pedido com um total de ${this.cart.totalWithDiscount()} foi recebido.`,
    );

    this.persistency.saveOrder();
    this.cart.clear();
    console.log(
      'O cliente é: ',
      this.customer.getName(),
      this.customer.getIDN(),
    );
  }
}

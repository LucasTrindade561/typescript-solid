/*
  Dependency Inversion Principle
  Modulos de alto nivel nao podem depender de modulos de baixo nivel. Ambos devem depender de abstracoes.
  Dependa de abstrações, não de implementações.
  Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.

  Classes de baixo nível são classes que executam tarefas(os detalhes).
  Classes de alto nível são classes que executam tarefas de baixo nível (interfaces).

  Muito fazer para testes
*/

import { Messaging } from './services/messaging';
import { Order } from './classes/order';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import {
  FiftyPercentDiscount,
  TenPercentDiscount,
  NoDiscount,
} from './classes/discount';
import { EnterpriseCustomer, IndividualCustomer } from './classes/custumer';
import { MessagingProtocol } from './classes/interfaces/messaging-protocol';

const fiftyPercentDiscount = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
// const noDiscount = new NoDiscount(); // injecao de depencia
const shoppingCart = new ShoppingCart(fiftyPercentDiscount);
const messaging = new Messaging();
const persistency = new Persistency();

const individualCustomer = new IndividualCustomer(
  'Lucas',
  'Trindade',
  '111.111.111-11',
);

const enterpriseCustomer = new EnterpriseCustomer(
  'NH enterprise',
  '928192818928128',
);

// // classe que finge fazer alguma coisa, usada para testes
// class MessagingMock implements MessagingProtocol {
//   sendMessage(): void {
//     console.log('The massage was sent successfully to Mock');
//   }
// }

// const messagingMock = new MessagingMock();

const order = new Order(
  shoppingCart,
  messaging,
  persistency,
  enterpriseCustomer,
);

shoppingCart.addItem(new Product('Shirt', 100));
shoppingCart.addItem(new Product('Paint', 99));
shoppingCart.addItem(new Product('Shoes', 300.59));

// shoppingCart.clear();

console.log(order.orderStatus);
console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
order.checkout();
console.log(order.orderStatus);

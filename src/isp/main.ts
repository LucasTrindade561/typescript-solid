/*
Interface segregation principle --> serve para qualquer protocolo
os clientes nao devem ser forcados a depender de types, interfaces ou
membros abstratos que não utilizam
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

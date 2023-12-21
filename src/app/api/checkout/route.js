import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {


  mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;


  let stripeLineItems = [];
  let cart = []
  for (const cartProduct of cartProducts) {

    const productInfo = await Product.findById(cartProduct._id);
    if (productInfo) {

      let productPrice = productInfo.price;
      const [l, w, t] = cartProduct.dimensions

      productPrice = parseFloat(productPrice) * l * w * t;

      const productName = cartProduct.species;

      stripeLineItems.push({
        quantity: 1,
        price_data: {
          currency: 'INR',
          product_data: {
            name: productName,
          },
          unit_amount: productPrice *100,
        },
      });

      cart.push(

        {
          species: cartProduct.species,
          cut: cartProduct.cut,
          measurement: cartProduct.measurement,
          dimensions: cartProduct.dimensions,
          price: productPrice,
          _id: productInfo._id

        }
      )
    }
    

  }
  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts: cart,
    paid: false,
  });

const successUrl = `${process.env.NEXTAUTH_URL}/orders/${orderDoc._id.toString()}?clear-cart=1`;
const cancelUrl = `${process.env.NEXTAUTH_URL}/cart?canceled=1`;

const stripeSession = await stripe.checkout.sessions.create({
  line_items: stripeLineItems,
  mode: 'payment',
  customer_email: userEmail,
  success_url: successUrl,
  cancel_url: cancelUrl,
  metadata: { orderId: orderDoc._id.toString() },
  payment_intent_data: {
    metadata: { orderId: orderDoc._id.toString() },
  },
  shipping_options: [
    {
      shipping_rate_data: {
        display_name: 'Delivery fee',
        type: 'fixed_amount',
        fixed_amount: { amount: 2000 *100, currency: 'INR' },
      },
    }
  ],
});
await Order.updateOne({_id:orderDoc._id}, {paid:true});


  return Response.json(stripeSession.url);
}
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0;
  items.forEach(element => {
    total+=element.attributes.price * element.qty;
  });  

  return total;
};

export default async function handler(req, res) {
  const { items,email } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      automatic_payment_methods: {
        enabled: false,
      },
      receipt_email: email,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      total:calculateOrderAmount(items),
    });

  } catch (error) {
    res.send({error:error.message})
  }
};
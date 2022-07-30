import React,{useEffect,useState} from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Link from "next/link";
import { checkoutStepsNames } from "../../globals/variables";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_ROOT_URL || 'http://localhost:3000'}/checkout/confirmation`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div className="mt-[3rem] lg:px-[3rem]">
        <div className="">
          <PaymentForm 
            handleSubmit={handleSubmit} 
            isLoading={isLoading} 
            stripe={stripe}
            elements={elements}
            message={message}
          />
        </div>
    </div>
  );
}


function PaymentForm({handleSubmit,isLoading,stripe,elements,message}) {
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <div className="mt-[2rem] text-[#df1b41]">
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </div>
        <div className='mt-[3rem] flex justify-between sm:items-center pb-[4rem] flex-col sm:flex-row'>
          <Link href={`/checkout?step=${checkoutStepsNames[1]}`}>
              <a>
                  <button type='button' className='flex items-center gap-2 text-titles'>
                      <span className='block w-[.5rem] h-[.5rem] border-b-2 border-titles border-l-2 rotate-45 translate-y-[.08rem]'></span>
                      Return to shipping
                  </button>
              </a>
          </Link>
          
          <button disabled={isLoading || !stripe || !elements} id="submit" 
            className={`px-[2rem] min-w-[130px] bg-titles mt-[2rem]  sm:mt-[0] rounded-[.4rem] py-[1.3rem] font-[500] text-[white] transition-[background-color] duration-[400ms] h-[70px] ${isLoading ? 'opacity-[0.8]' : 'hover:bg-[black]'}`}>              
            <div id="button-text">
              {isLoading ? <div className="lds-dual-ring"></div> : "Pay now"}
            </div>
          </button>
        </div>        
      </form>
  ) 
}
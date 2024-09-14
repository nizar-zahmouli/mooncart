import { useDispatch } from "react-redux"
import { clearCart } from "../../redux/slice/cartSlice"
import StripeCheckout from "react-stripe-checkout"

export const CheckoutForm = ({total, handlePaymentSuccess}) => {
    const dispatch = useDispatch()
    
    const handleToken = (token) => {
        handlePaymentSuccess()
        dispatch(clearCart())

    }
   return (
       <>
           <StripeCheckout 
               token={handleToken}
               stripeKey=""
               amount={total * 100}
               name="Gorkoder Ecommerce Website"
               email="name@gmail.com"
               description="Payment test using stripe Ecommerce"

           >
               <button className="w-full bg-gray-200 py-3.5 my-3 font-medium">
               Pay ${total.toFixed(2)}	
               </button>   
          </StripeCheckout>
       </>
   )
 }
 
import { IoCartOutline, IoCloseOutline, IoHeartOutline } from "react-icons/io5";
import { Badges, BodyOne, Title } from "../common/CustomComponents";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartActions,
  clearCart,
  selectTotalPrice,
  selectTotalQuantity,
} from "../../redux/slice/cartSlice";
import { NavLink } from "react-router-dom";
import { CheckoutForm } from "./CheckoutForm";

export const ModelCart = () => {
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  const cartItem = useSelector((state) => state.cart.itemList);

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflowX = "hidden";
  };
  const closeModal = () => {
    setIsClosing(true);
    document.body.style.overflowX = "auto";
    setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
    }, 300);
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

    // handlePaymentSuccess
    const handlePaymentSuccess = () => {
        console.log('##########');
        console.log('Payment Success');
        console.log('###########');

        clearCart()

    }

  return (
    <>
      <button className="relative z-20" onClick={openModal}>
        <IoHeartOutline size={23} />
        <div className="absolute -top-2 -right-1.5">
          <Badges color="bg-primary-green">0</Badges>
        </div>
      </button>
      <button className="relative z-20" onClick={openModal}>
        <IoCartOutline size={23} />
        <div className="absolute -top-2 -right-1.5">
          <Badges color="bg-primary-green">{totalQuantity}</Badges>
        </div>
      </button>

      {isOpen && (
        <>
          <div className="cartoverlay" onClick={closeModal}></div>
          <div
            className={`cartmodel p-16 text-primary ${
              isClosing ? "closing" : ""
            }`}
          >
            <div className="flex justify-between gap-5">
              <button
                className={`flex items-center gap-2 font-meduim ${
                  activeTab === "cart" ? "text-primary" : ""
                }`}
                onClick={() => handleTabChange("cart")}
              >
                Shopping Cart
                <span className="w-7 h-7 text-[11px] font-normal rounded-full text-white grid place-content-center bg-primary">
                  {totalQuantity}
                </span>
              </button>
              <button
                className={`flex items-center gap-2 font-meduim ${
                  activeTab === "wishlist" ? "text-primary" : ""
                }`}
                onClick={() => handleTabChange("cart")}
              >
                Wishlist
                <span className="w-7 h-7 text-[11px] font-normal rounded-full text-white grid place-content-center bg-primary">
                  0
                </span>
              </button>
            </div>
            <div className="line-container">
              <div
                className={`line ${activeTab === "cart" ? "active" : ""}`}
              ></div>
              <div
                className={`line ${activeTab === "wishlist" ? "active" : ""}`}
              ></div>
            </div>
            {activeTab == "cart" ? (
              <>
                {cartItem.map((item) => (
                  <CartProduct
                    key={item.id}
                    id={item.id}
                    cover={item.cover}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                  />
                ))}
                {/*  */}
                <div className="total flex items-center justify-between mt-10">
                  <Title level={6}>SubTotal:</Title>
                  <Title level={4}>{totalPrice.toFixed(2)}</Title>
                </div>
                <div className="chekout">
                  <button className="chekout">
                    <CheckoutForm
                      total={totalPrice}
                      handlePaymentSuccess={handlePaymentSuccess}
                    />
                  </button>
                  <NavLink to={"/cart"}>
                    <button className="primary-btn w-full capitalize">
                      view cart
                    </button>
                  </NavLink>
                </div>
              </>
            ) : (
              <>Show product</>
            )}
          </div>
        </>
      )}
    </>
  );
};

// CartProduct
export const CartProduct = ({ id, cover, name, price, quantity }) => {
  const dispatch = useDispatch();

  const removeCartItems = () => {
    //  to do list
    dispatch(CartActions.removeFromAllCart(id));
  };

  return (
    <>
      <div className="mt-5 border-b-2 border-gray-200 pb-5">
        <div className="flex items-center gap-5">
          <div className="images w-20 h-20">
            {cover?.slice(0, 1).map((images, i) => (
              <img
                src={images?.image}
                alt=""
                key={i}
                className="w-full h-full object-cover"
              />
            ))}
          </div>
          <div className="deatils w-1/2 ">
            <BodyOne>{name}</BodyOne>
            <p className="text-primary-green">
              {quantity} x ${price?.toFixed(2)}
            </p>
          </div>
          <button className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full text-primary">
            <IoCloseOutline size={25} onClick={removeCartItems} />
          </button>
        </div>
      </div>
    </>
  );
};

import { Fragment, useContext } from "react";
import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";

const CheckoutPage = () => {
  const { cartTotalPrice, cartItems } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item, i) => (
        <CheckoutItem key={item.id} item={item} />
      ))}

      <p style={{ color: "red" }}>
        *Please use the following test credit card for payments*
      </p>
      <span className="total">TOTAL: ${cartTotalPrice}</span>
    </div>
  );
};

export default CheckoutPage;

import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { empty_cart_item } from "../../actions";
import { useMemo } from "react";

const Carts = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.productReducer.carts);
  const grand_total = useMemo(() => {
    return carts.reduce((arr, cur) => arr += (cur.price * cur.quantity) ,0);
  },[carts]);
  const userId = JSON.parse(localStorage.getItem('result'))?.result._id;
  const empty_cart = (userid) => {
    if (carts.length === 0) {
      alert("No item in the cart");
      return;
    }

    dispatch(empty_cart_item(userid));
  };

   const canEmptyCart = carts.length > 0; // Check if cart is not empty

  return (
    <div className="carts" style={{ marginBottom: "20px" }}>
      <div
        className="cart_container"
      >
        <div className="title">
          <h1>Cart</h1>
        </div>
        {carts.length === 0 ? (
          <div>No item in the cart yet...........</div>
        ) : (
          <div
            className="display_carts"
          >
            {carts?.map((product, index) => {
              return <Cart product={product} key={index} />;
            })}
          </div>
        )}
        <div className="load_more">
          <button style={{ opacity: carts.length === 0 ? '0.5' : '1' }} onClick={() => empty_cart(userId)} disabled={!canEmptyCart}>empty cart</button>
        </div>
        <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '20px',
                border: '1px solid black',
                padding: '25px 0'
            }} className="proceed_to_checkout">
          <div className="total" style={{ marginBottom: '10px' }}>
            <h2>Grand Total: <span style={{color: 'darkred'}}>${grand_total}/-</span></h2>
          </div>
          <div style={{ display: 'flex', columnGap: '10px' }}>
            <Link style={{
                display: 'block',
                background: 'orange',
                textDecoration: 'none',
                color: 'floralwhite',
                padding: '10px 25px',
                borderRadius: '5px',
                textTransform: 'capitalize'
            }} to="/shop">continue shopping</Link>
            <Link
              style={{
                display: "block",
                background: "purple",
                textDecoration: "none",
                color: "floralwhite",
                padding: "10px 20px",
                borderRadius: "5px",
                textTransform: "capitalize",
                opacity: carts.length === 0 ? '0.5' : '1'
              }}
              to={carts.length > 0 && "/checkout"}
              aria-disabled={carts.length === 0}
            >
              proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;

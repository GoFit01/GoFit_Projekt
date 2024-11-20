import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { clearCart } from "../redux/cartRedux";
import { userRequest } from "../requestMethods"; // Frissítjük a token kezelését

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const history = useHistory();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    history.push("/");
  };

  useEffect(() => {
    if (currentUser) {
      // Ha van aktuális felhasználó, akkor állítsuk be a token-t az Axios fejlécébe
      userRequest.defaults.headers.Authorization = `Bearer ${currentUser.accessToken}`;
    }

    // Más logika itt
  }, [currentUser]); // Csak akkor fut le, ha a currentUser változik

  useEffect(() => {
    

    // Ellenőrizze, hogy a token helyesen van-e beállítva
    console.log("Current User:", currentUser);
    console.log("Token in userRequest:", userRequest.defaults.headers.Authorization);

    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        console.log("Order response:", res.data);
        setOrderId(res.data._id);
      } catch (err) {
        console.log("Error creating order:", err);
      }
    };

    if (data) {
      createOrder();
    }
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `A rendelésed sikeres! A rendelés azonositod : ${orderId} `
        : ``}

      <button onClick={handleDelete} style={{ padding: 10, marginTop: 20 }}>
        Menjünk a főoldalra
      </button>
    </div>
  );
};

export default Success;
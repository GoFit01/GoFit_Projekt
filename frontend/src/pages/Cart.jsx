import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartRedux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const KEY = "pk_test_51Q8gHHE0Esp4B2xrgdSNPaGgO0Q7gzgWPWxzyYgO9QGJr8FX8OPdguVwVJr876FYqYU3Uo2HWzKCnZYLXUoWhlP600K4RbQXYg";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({
    flexDirection: "column",       
    gap: "10px",                   
    alignItems: "center"           
  })}
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;


const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;


const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Empty = styled.h1`
  font-weight: 600;
  text-align: center;
  font-size: 45px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total*100,
        });
        
        history.replace("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history, cart]);





  const handleDelete = () => {
    dispatch(clearCart());
  };



  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>KOSÁR</Title>
        <Top>
          <Link to="webshop">
          <TopButton>VÁSÁRLÁS FOLYTATÁSA</TopButton>
          </Link>
          <TopButton onClick={handleDelete} type="filled">
            KOSÁR TÖRLÉSE
          </TopButton>
        </Top>
        <Bottom>
          <Info >
          <Empty style={cart.total !== 0 ? { display: "none" } : {}}>
              A kosár üres!
            </Empty>

            {cart.products.map((product) => (
  <Product key={product._id}>
    <ProductDetail>
      <Image src={product.img} />
      <Details>
        <ProductName>
          <b>Termék neve:</b> {product.title}
        </ProductName>
        <ProductId>
          <b>Termék azonosító:</b> {product._id}
        </ProductId>
        {product.title.toLowerCase().includes("edzésterv") ? null : (
          <ProductSize>
            <b>Választott mennyiség:</b> {product.quantitygram}
          </ProductSize>
        )}
      </Details>
    </ProductDetail>
    <PriceDetail>
      <ProductAmountContainer>
        <ProductAmount>{product.quantity}</ProductAmount>
      </ProductAmountContainer>
      <ProductPrice>
        {product.price * product.quantity} Ft
      </ProductPrice>
    </PriceDetail>
  </Product>
))}
            
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>RENDELÉS ÖSSZEGZÉSE</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>TERMÉKEK ÁRA</SummaryItemText>
              <SummaryItemPrice>{cart.total} Ft</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>SZÁLLITÁSI DIJ</SummaryItemText>
              <SummaryItemPrice>0 Ft</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>TELJES ÁR</SummaryItemText>
              <SummaryItemPrice>{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="GOFIT"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLLgR7yJ9Vk2hxKMTzEHSUHDK4IirV-s7tOtpJ9w9PEqtz-lO3mXscpxuwrfU3DYAHRpE&usqp=CAU"
              billingAddress
              shippingAddress
              description={`A végösszeg ${cart.total} Ft`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button style={cart.total === 0 ? { display: "none" } : {}}>
                MEGRENDELÉS
              </Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;

import styled from "styled-components";
import { mobile } from "../responsive"; 
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh; 
  position: relative;
  
  ${mobile({ height: "40vh" })} 
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${mobile({ height: "100%", objectFit: "cover" })} 
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);  
`;

const Title = styled.h1`
  color: white;  
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);  
  
  ${mobile({ fontSize: "24px" })} 
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  opacity: 0.9;  
  
  &:hover {
    opacity: 1;  
    background-color: darkgray;
    color: white;
  }

  ${mobile({ padding: "8px", fontSize: "14px" })} 
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} alt={item.title} />
        <Info>
          <Title>{item.title}</Title>
          <Button>Vásárlás</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;

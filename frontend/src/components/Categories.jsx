import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  flex-wrap: wrap; 

  @media only screen and (max-width: 1200px) {
    padding: 10px;
  }

  @media only screen and (max-width: 768px) {
    padding: 5px;
    flex-direction: column; 
    align-items: center; 
  }
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;

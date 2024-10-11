import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  return (
    <Container>
    <Announcement />
      <Navbar />
      <FilterContainer>
        <Filter>
          <FilterText>Termék szűrése:</FilterText>
          <Select>
            <Option disabled selected>
              Íz
            </Option>
            <Option>Csokis</Option>
            <Option>Vaniliás</Option>
            <Option>Epres</Option>
            <Option>Áfonyás</Option>
            <Option>Narancsos</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Méret
            </Option>
            <Option>250g</Option>
            <Option>500g</Option>
            <Option>1000g</Option>
            <Option>2000g</Option>
            <Option>5000g</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Rendezés:</FilterText>
          <Select>
            <Option selected>Legújabb</Option>
            <Option>Legdrágább elöl</Option>
            <Option>Legolcsóbb elöl</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Contact />
      <Footer />
    </Container>
  );
};

export default ProductList;

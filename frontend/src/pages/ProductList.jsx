import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

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
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    if (value === "Márka" || value === "Fehérje tipusa") {
      // Reset the filters when the default option is selected
      const newFilters = { ...filters };
      if (e.target.name === "brand") {
        delete newFilters.brand; // Remove the 'brand' filter to show all products
      }
      if (e.target.name === "type") {
        delete newFilters.type; // Remove the 'type' filter to show all products
      }
      setFilters(newFilters);
    } else {
      setFilters({
        ...filters,
        [e.target.name]: value,
      });
    }
  };


  return (
    <Container>
    <Announcement />
      <Navbar />
      <FilterContainer>
        <Filter>
          <FilterText>Termék szűrése:</FilterText>
          <Select name="brand" onChange={handleFilters}>
            <Option  selected>
              Márka
            </Option>
            <Option>Biotech</Option>
            <Option>Scitec</Option>
            <Option>MyProtein</Option>
            <Option>GymBeam</Option>
            <Option>GoFit</Option>
          </Select>
          <Select name="type" onChange={handleFilters}>
            <Option selected>
              Fehérje tipusa
            </Option>
            <Option>Állati eredetü</Option>
            <Option>tejsavó alapú</Option>
            <Option>Vegán</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Rendezés:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option selected>Legújabb</Option>
            <Option value="asc">Legdrágább elöl</Option>
            <Option value="desc">Legolcsóbb elöl</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Contact />
      <Footer />
    </Container>
  );
};

export default ProductList;

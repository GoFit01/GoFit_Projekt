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
    if (value === "Márka" || value === "Fehérje tipusa" || value === "Kreatin tipusa" || value === "Vitamin tipusa") {
   
      const newFilters = { ...filters };
      if (e.target.name === "brand") {
        delete newFilters.brand;
      }
      if (e.target.name === "type") {
        delete newFilters.type;
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
            <Option value="Márka" selected>
              Márka
            </Option>
            <Option value="Biotech">Biotech</Option>
            <Option value="Scitec">Scitec</Option>
            <Option value="MyProtein">MyProtein</Option>
            <Option value="GymBeam">GymBeam</Option>
            <Option value="GoFit">GoFit</Option>
          </Select>

          
          {cat === "feherje" && (
            <Select name="type" onChange={handleFilters}>
              <Option value="Fehérje tipusa" selected>
                Fehérje tipusa
              </Option>
              <Option value="Állati eredetü">Állati eredetü</Option>
              <Option value="tejsavó alapú">Tejsavó alapú</Option>
              <Option value="Vegán">Vegán</Option>
            </Select>
          )}

          {cat === "kreatin" && (
            <Select name="type" onChange={handleFilters}>
              <Option value="Kreatin tipusa" selected>
                Kreatin tipusa
              </Option>
              <Option value="Monohidrát">Monohidrát</Option>
              <Option value="Kapszula">Kapszula</Option>
            </Select>
          )}

          {cat === "vitamin" && (
            <Select name="type" onChange={handleFilters}>
              <Option value="Vitamin tipusa" selected>
                Vitamin tipusa
              </Option>
              <Option value="D3">D3</Option>
              <Option value="Multivitamin">Multivitamin</Option>
              <Option value="Kollagen">Kollagén</Option>
            </Select>
          )}
        </Filter>

       
        <Filter>
          <FilterText>Rendezés:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest" selected>
              Legújabb
            </Option>
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

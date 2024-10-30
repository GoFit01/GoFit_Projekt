import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined, Menu, KeyboardArrowDown } from "@material-ui/icons";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Logout } from "../redux/apiCalls";

const jumpEffect = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); 
  }
  100% {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  height: 60px;
  position: relative;
  @media only screen and (max-width: 768px) {
    height: 50px;
  }
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  @media only screen and (max-width: 768px) {
    padding: 10px 0px;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Profile = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin-right: 25px; 
  margin-left: 15px; 
  a {
    color: black;
    text-decoration: none;
    padding: 10px;
    display: flex;
    align-items: center;
  }

  a:hover {
    color: teal; /* Hover szín */
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  display: inline-block;
  margin: 0;
  color: black;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
  }

  &:hover {
    animation: ${jumpEffect} 0.3s ease;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  position: relative;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 768px) {
    display: none;
  }

  a {
    color: black;
    text-decoration: none;
    padding: 10px;
    display: flex;
    align-items: center;
  }

  a:hover {
    color: teal; 
  }

  &:hover > div {
    display: flex;
  }
`;

const DropdownMenu = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid lightgray;
  z-index: 100;

  a {
    padding: 10px 20px;
    text-align: left;
    text-decoration: none;
    color: black;
    transition: background-color 0.3s;
  }

  a:hover {
    background-color: #f1f1f1;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const DropdownMenuMobile = styled(DropdownMenu)`
  display: ${(props) => (props.open ? "flex" : "none")}; 
  width: 100vw; 
  left: 0; 
  top: 50px; 
  border: none; 
  background-color: white; 
  position: absolute; 
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const history = useHistory();
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);

  };

  const handleLogout = (e) => {
    localStorage.clear();
    Logout(dispatch);
    history.push("/");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Profile>
            <Link to="/profile">PROFIL</Link> 
          </Profile>
        </Left>
        <Center>
          <Link style={{ textDecoration: "none" }} to="/">
            <Logo>GOFIT</Logo>
          </Link>
        </Center>
        <Right>
          <HamburgerMenu onClick={handleMenuClick}>
            <Menu style={{ fontSize: "24px" }} />
          </HamburgerMenu>
          <MenuItem>
            <Link>
              EDZÉS
              <KeyboardArrowDown style={{ fontSize: "16px", marginLeft: "5px" }} />
            </Link>
            <DropdownMenu>
              <Link to="/edzestervek">EDZÉSTERVEK</Link>
              <Link to="/taplalkozas">TÁPLÁLKOZÁS</Link>
              <Link to="/webshop">WEBSHOP</Link>
            </DropdownMenu>
          </MenuItem>
          <Link style={{ textDecoration: "none" }} to={"/register"}>
            <MenuItem style={user ? { display: "none" } : {}}>
              REGISZTRÁCIÓ
            </MenuItem>
          </Link>
          <Link style={{ textDecoration: "none" }} to={"/login"}>
            <MenuItem style={user ? { display: "none" } : {}}>
              BEJELENTKEZÉS
            </MenuItem>
          </Link>

          <MenuItem
            style={!user ? { display: "none" } : {}}
            onClick={(e) => handleLogout(e)}
          >
            KIJELENTKEZÉS
          </MenuItem>
          <MenuItem>
            <Link to="/cart">
            <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
      <DropdownMenuMobile open={menuOpen}>
        <Link to="/edzestervek" onClick={handleMenuClick}>
          EDZÉSTERVEK
        </Link>
        <Link to="/taplalkozas" onClick={handleMenuClick}>
          TÁPLÁLKOZÁS
        </Link>
        <Link to="/webshop" onClick={handleMenuClick}>
          WEBSHOP
        </Link>
        <Link to="/login" onClick={handleMenuClick}>
          BEJELENTKEZÉS
        </Link>
        <Link to="/register" onClick={handleMenuClick}>
          REGISZTRÁCIÓ
        </Link>     
        <Link to="/cart" onClick={handleMenuClick}>
          KOSÁR
        </Link>
      </DropdownMenuMobile>
    </Container>
  );
};

export default Navbar;

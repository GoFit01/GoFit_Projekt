import styled from "styled-components";
import { mobile } from "../responsive"; 
import { Link as RouterLink } from "react-router-dom"; 

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://mrwallpaper.com/images/hd/caption-embracing-fitness-state-of-the-art-4k-gym-53wcvwc2088az4xx.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({
    width: "100vw", 
    height: "100vh",
    padding: "10px", 
  })}
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center; 

  ${mobile({
    width: "85%", 
    padding: "15px",
    borderRadius: "10px",
  })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center; 

  ${mobile({ fontSize: "20px" })} 
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px; 
  ${mobile({
    minWidth: "80%", 
    margin: "10px 0", 
    padding: "8px",
  })}
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  text-align: center; 
  ${mobile({ fontSize: "11px" })} 
`;

const Button = styled.button`
  width: 50%; 
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background-color: darkcyan;
  }

  ${mobile({
    width: "60%", 
    padding: "12px", 
    fontSize: "14px",
  })}
`;

const StyledLink = styled(RouterLink)`
  margin-top: 10px;
  font-size: 14px;
  text-decoration: underline;
  color: teal;
  cursor: pointer;

  ${mobile({ fontSize: "12px" })}
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>REGISZTRÁCIÓ</Title>
        <Form>
          <Input placeholder="vezetéknév" />
          <Input placeholder="keresztnév" />
          <Input placeholder="felhasználónév" />
          <Input placeholder="email" />
          <Input placeholder="jelszó" />
          <Input placeholder="jelszó megerősítése" />
          
          <Agreement>
            A fiók létrehozásával hozzájárulok személyes adataim feldolgozásához.
            <b> ADATKEZELÉSI TÁJÉKOZATÓ</b>
          </Agreement>
          
          <Button>REGISZTÁCIÓ</Button>
        </Form>
        <StyledLink to="/">VISSZA A FŐOLDALRA</StyledLink>
      </Wrapper>
    </Container>
  );
};

export default Register;
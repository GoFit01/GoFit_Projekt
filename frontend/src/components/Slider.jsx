import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 65vh; 
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100%; 
  display: flex;
  flex-direction: row; 
  align-items: center;
  background-color: #${(props) => props.bg};

  @media (max-width: 538px) { 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
  }
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 100%;
  max-width: 700px; 
  height: 100%;
  max-height: 500px; 
`;

const Image = styled.img`
  width: 100%; 
  height: 100%; 
  object-fit: contain; 
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 20px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  width: 100%; 
`;

const Title = styled.h1`
  font-size: 3rem; 
  text-align: center; 
  @media (max-width: 768px) { 
    font-size: 2rem; 
  }
`;

const Desc = styled.p`
  margin: 20px 0px; 
  font-size: 1rem; 
  font-weight: 500;
  letter-spacing: 1px; 
  text-align: center; 
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1rem; 
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} alt={item.title} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Link to="edzestervek">
                <Button>
                  UGRÁS AZ EDZÉSSEKHEZ
                </Button>
              </Link>       
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;

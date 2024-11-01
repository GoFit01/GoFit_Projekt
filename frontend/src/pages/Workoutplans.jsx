import React, { useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Wrapper = styled.div`

`;
const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: teal;
  font-size: 32px;
  margin-bottom: 20px;
`;

const PlanList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const PlanContainer = styled.div`
  width: 250px;
  border: 2px solid ${(props) => (props.selected ? "teal" : "#ddd")};
  padding: 20px;
  border-radius: 8px;
  background-color: ${(props) => (props.selected ? "#e0f7fa" : "white")};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const PlanImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

const PlanTitle = styled.h2`
  font-size: 20px;
  color: teal;
  margin: 10px 0;
`;

const PlanDescription = styled.p`
  font-size: 14px;
  color: #555;
  text-align: center;
`;

const PlanPrice = styled.p`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
`;

const AddToCartButton = styled.button`
  padding: 10px 20px;
  background-color: teal;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkcyan;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-width: 80%;
`;

const CloseButton = styled.button`
  background-color: teal;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  align-self: flex-end;

  &:hover {
    background-color: darkcyan;
  }
`;

const InfoButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: darkcyan;
  }
`;

const WorkoutPlans = () => {
  
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  
  const plans = [
    {
      id: 1,
      title: "Alap edzésterv",
      description: "Egyszerű gyakorlatok a mindennapokra.",
      price: "5000 Ft",
      img: "https://www.nourishmovelove.com/wp-content/uploads/2023/12/BeginnerWorkoutPlanHero.jpg",
      detailedInfo: "Ez az alap edzésterv segít az általános fitnesz szinten tartásában...",
    },
    {
      id: 2,
      title: "Haladó edzésterv",
      description: "Intenzív gyakorlatok haladóknak.",
      price: "7000 Ft",
      img: "https://www.nourishmovelove.com/wp-content/uploads/2022/04/4WeekChallenge2.jpg",
      detailedInfo: "Ez az edzésterv ideális haladó edzők számára...",
    },
    {
      id: 3,
      title: "Személyre szabott edzésterv",
      description: "Személyre szabott gyakorlatok.",
      price: "10000 Ft",
      img: "https://www.nourishmovelove.com/wp-content/uploads/2022/04/4WeekChallenge3.jpg",
      detailedInfo: "Ez a személyre szabott edzésterv teljesen a te igényeidhez igazodik...",
    },
  ];

  
  const handleAddToCart = () => {
    const selectedItems = plans.filter((plan) => selectedPlans.includes(plan.id));
    alert(`Kosárhoz adva: ${selectedItems.map((item) => item.title).join(", ")}`);
  };

  
  const togglePlanSelection = (id) => {
    setSelectedPlans((prev) =>
      prev.includes(id) ? prev.filter((planId) => planId !== id) : [...prev, id]
    );
  };

  
  const handleInfoClick = (plan) => {
    setModalContent(plan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Wrapper>
    <Announcement/>
    <Navbar/>
    <Container>
      <Title>Válassz edzéstervet</Title>
      <PlanList>
        {plans.map((plan) => (
          <PlanContainer
            key={plan.id}
            onClick={() => togglePlanSelection(plan.id)}
            selected={selectedPlans.includes(plan.id)}
          >
            <PlanImage src={plan.img} alt={plan.title} />
            <PlanTitle>{plan.title}</PlanTitle>
            <PlanDescription>{plan.description}</PlanDescription>
            <PlanPrice>{plan.price}</PlanPrice>
            <InfoButton onClick={(e) => { e.stopPropagation(); handleInfoClick(plan); }}>Info</InfoButton>
          </PlanContainer>
        ))}
      </PlanList>
      <ButtonContainer>
        <AddToCartButton onClick={handleAddToCart}>Kosárhoz adás</AddToCartButton>
      </ButtonContainer>

      {showModal && (
        <ModalBackground>
          <ModalContainer>
            <CloseButton onClick={closeModal}>Bezár</CloseButton>
            <h2>{modalContent.title}</h2>
            <p>{modalContent.detailedInfo}</p>
          </ModalContainer>
        </ModalBackground>
      )}
    </Container>
    <Footer/>
    </Wrapper>
  );
};

export default WorkoutPlans;
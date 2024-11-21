import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import axios from "axios";
import Modal from "../components/Modal"; 

const Wrapper = styled.div``;
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

const InfoButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  align-self: center;

  &:hover {
    background-color: darkcyan;
  }
`;

const WorkoutPlans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [quantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getWorkoutPlans = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/workoutPlans");
        setPlans(res.data);
      } catch (err) {
        console.error("Error fetching workout plans:", err);
      }
    };
    getWorkoutPlans();
  }, []);

  const handleAddToCart = () => {
    selectedPlans.forEach((planId) => {
      const selectedPlan = plans.find((plan) => plan._id === planId);
      dispatch(addProduct({ ...selectedPlan, quantity }));
    });
  };

  const togglePlanSelection = (id) => {
    setSelectedPlans((prev) =>
      prev.includes(id) ? prev.filter((planId) => planId !== id) : [...prev, id]
    );
  };

  const handleInfoClick = (plan) => {
    
    const description = plan.desc || "Részletes leírás nem elérhető.";
    
    setModalContent({
      title: plan.title,
      detailedInfo: description,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Wrapper>
      <Announcement />
      <Navbar />
      <Container>
        <Title>Válassz edzéstervet</Title>
        <PlanList>
          {plans.map((plan) => (
            <PlanContainer
              key={plan._id}
              onClick={() => togglePlanSelection(plan._id)}
              selected={selectedPlans.includes(plan._id)}
            >
              <PlanImage src={plan.img} alt={plan.title} />
              <PlanTitle>{plan.title}</PlanTitle>
              <PlanDescription>{plan.description}</PlanDescription>
              <PlanPrice>{plan.price} Ft</PlanPrice>
              <InfoButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleInfoClick(plan);
                }}
              >
                Info
              </InfoButton>
            </PlanContainer>
          ))}
        </PlanList>
        <ButtonContainer>
          <AddToCartButton onClick={handleAddToCart}>Kosárhoz adás</AddToCartButton>
        </ButtonContainer>

        {showModal && (
          <Modal
            title = {modalContent.title}
            message={modalContent.detailedInfo}
            onClose={closeModal}
          />
        )}
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default WorkoutPlans;

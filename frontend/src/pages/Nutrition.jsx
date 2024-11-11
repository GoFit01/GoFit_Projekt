import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 40px;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center; /* Cím középre igazítása */
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  justify-content: center; /* Kártyák középre igazítása */
  margin-top: 20px;

  @media (max-width: 770px) {
    justify-content: center; /* Kártyák középre igazítása kisebb képernyőkön */
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Subtitle = styled.h2`
  color: #1f2937;
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
`;

const NutritionInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const InfoItem = styled.div`
  font-size: 1.2rem;
  color: #374151;
  margin: 10px 0;
`;

const Section = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  color: white;
  padding: 20px;
  text-align: center;
  margin: 30px 0;
  position: relative;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6); /* Sötétebb háttér */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const SectionContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const SectionText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

const InfoButton = styled.button`
  padding: 12px 20px;
  background-color: teal;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkcyan;
  }
`;

// Modális stílusok
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  color: #1f2937;
  margin-bottom: 15px;
`;

const ModalText = styled.p`
  font-size: 1rem;
  color: #4b5563;
`;

const ExampleList = styled.ul`
  margin: 20px 0;
  font-size: 1rem;
  color: #333;
`;

const Nutrition = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [calorieNeeds, setCalorieNeeds] = useState({
    maintenance: 0,
    weightLoss: 0,
    weightGain: 0,
  });
  const [macros, setMacros] = useState({
    maintenance: { protein: 0, carbs: 0, fats: 0 },
    weightLoss: { protein: 0, carbs: 0, fats: 0 },
    weightGain: { protein: 0, carbs: 0, fats: 0 },
  });

  const [showModal, setShowModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const nutritionData = {
    protein: {
      title: "Fehérjék",
      description: `A fehérjék elengedhetetlenek az izomtömeg fenntartásához, az immunrendszer megfelelő működéséhez, és a sejtregenerációhoz. Fehérjét fogyassz edzés után, hogy támogasd az izmaid regenerálódását és növekedését.`,
      examples: ["Csirkemell", "Tojás", "Lazac", "Pulyka", "Görög joghurt", "Tehéntúró", "Lencse", "Tofu", "Fekete bab", "Földimogyoró"],
    },
    carbs: {
      title: "Szénhidrátok",
      description: `A szénhidrátok a legfontosabb energiaforrások, amelyek segítenek fenntartani a fizikai aktivitást. Az egészséges szénhidrátok, mint a komplex szénhidrátok, lassan szabadítanak fel energiát.`,
      examples: ["Barna rizs", "Quinoa", "Édesburgonya", "Teljes kiőrlésű kenyér", "Zabpehely", "Kuszkusz", "Gyümölcsök (alma, banán)", "Zöldségek (répa, brokkoli)", "Borsó", "Sült batáta"],
    },
    fats: {
      title: "Zsírok",
      description: `Az egészséges zsírok elősegítik a hormonális egyensúlyt, támogatják az agy működését, és segítenek a zsírban oldódó vitaminok felszívódásában. Az omega-3 zsírsavak különösen fontosak.`,
      examples: ["Olívaolaj", "Avokádó", "Mandula", "Dió", "Lenmag", "Chia mag", "Lazac", "Makréla", "Kókuszolaj", "Szezámolaj"],
    },
  };

  useEffect(() => {
    if (user) {
      const { weight, height, gender } = user;
      const bmr =
        gender === "male"
          ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * 30
          : 447.6 + 9.2 * weight + 3.1 * height - 4.3 * 30;

      const maintenanceCalories = bmr * 1.55;
      setCalorieNeeds({
        maintenance: Math.round(maintenanceCalories),
        weightLoss: Math.round(maintenanceCalories * 0.8),
        weightGain: Math.round(maintenanceCalories * 1.2),
      });

      setMacros({
        maintenance: { protein: weight * 2, carbs: weight * 3, fats: weight * 0.8 },
        weightLoss: { protein: weight * 2.2, carbs: weight * 2, fats: weight * 0.6 },
        weightGain: { protein: weight * 2.5, carbs: weight * 4, fats: weight * 1.0 },
      });
    }
  }, [user]);

  const openModal = (section) => {
    setCurrentSection(section);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentSection(null);
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <Container>
        <Title>Táplálkozási Ajánlások</Title>
        <CardContainer>
          <Card>
            <Subtitle>Súlytartáshoz</Subtitle>
            <NutritionInfo>
              <InfoItem>Kalória: {calorieNeeds.maintenance} kcal/nap</InfoItem>
              <InfoItem>Fehérje: {macros.maintenance.protein} g</InfoItem>
              <InfoItem>Szénhidrát: {macros.maintenance.carbs} g</InfoItem>
              <InfoItem>Zsír: {macros.maintenance.fats} g</InfoItem>
            </NutritionInfo>
          </Card>
          <Card>
            <Subtitle>Fogyáshoz</Subtitle>
            <NutritionInfo>
              <InfoItem>Kalória: {calorieNeeds.weightLoss} kcal/nap</InfoItem>
              <InfoItem>Fehérje: {macros.weightLoss.protein} g</InfoItem>
              <InfoItem>Szénhidrát: {macros.weightLoss.carbs} g</InfoItem>
              <InfoItem>Zsír: {macros.weightLoss.fats} g</InfoItem>
            </NutritionInfo>
          </Card>
          <Card>
            <Subtitle>Tömegnöveléshez</Subtitle>
            <NutritionInfo>
              <InfoItem>Kalória: {calorieNeeds.weightGain} kcal/nap</InfoItem>
              <InfoItem>Fehérje: {macros.weightGain.protein} g</InfoItem>
              <InfoItem>Szénhidrát: {macros.weightGain.carbs} g</InfoItem>
              <InfoItem>Zsír: {macros.weightGain.fats} g</InfoItem>
            </NutritionInfo>
          </Card>
        </CardContainer>

        {/* Fehérjék szekció */}
        <Section style={{ backgroundImage: "url('https://content.dhhs.vic.gov.au/sites/default/files/2022-01/protein_0.jpg')" }}>
          <Overlay />
          <SectionContent>
            <SectionTitle>Fehérjék</SectionTitle>
            <SectionText>A fehérje alapvető szerepet játszik az izomnövekedés és a regeneráció terén.</SectionText>
            <InfoButton onClick={() => openModal("protein")}>Bővebb információ</InfoButton>
          </SectionContent>
        </Section>

        {/* Szénhidrátok szekció */}
        <Section style={{ backgroundImage: "url('https://www.mindpumpmedia.com/hubfs/shutterstock_731206732.png')" }}>
          <Overlay />
          <SectionContent>
            <SectionTitle>Szénhidrátok</SectionTitle>
            <SectionText>A szénhidrátok az energia fő forrásai, amelyek támogatják a teljesítményt és az állóképességet.</SectionText>
            <InfoButton onClick={() => openModal("carbs")}>Bővebb információ</InfoButton>
          </SectionContent>
        </Section>

        {/* Zsírok szekció */}
        <Section style={{ backgroundImage: "url('https://images.healthshots.com/healthshots/en/uploads/2023/09/02111527/fats-1-1600x900.jpg')" }}>
          <Overlay />
          <SectionContent>
            <SectionTitle>Zsírok</SectionTitle>
            <SectionText>Az egészséges zsírok nélkülözhetetlenek a hormonális egyensúly fenntartásához és a szív egészségéhez.</SectionText>
            <InfoButton onClick={() => openModal("fats")}>Bővebb információ</InfoButton>
          </SectionContent>
        </Section>
      </Container>

      {/* Modális ablak */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>X</CloseButton>
            <ModalTitle>{nutritionData[currentSection].title}</ModalTitle>
            <ModalText>{nutritionData[currentSection].description}</ModalText>
            <h4>Tipikus ételek:</h4>
            <ExampleList>
              {nutritionData[currentSection].examples.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ExampleList>
          </ModalContent>
        </ModalOverlay>
      )}
      <Footer />
    </>
  );
};

export default Nutrition;

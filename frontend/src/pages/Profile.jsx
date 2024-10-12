import React, { useState } from "react";
import styled from "styled-components";
import { AccountCircle } from "@material-ui/icons";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px;
  background-color: #f5f5f5; /* Egységes háttérszín */

  @media (max-width: 768px) {
    padding: 20px;
    margin: 0 20px; /* Margó az oldal széleitől 768px alatt */
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: teal;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ProfileFormContainer = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px; /* Maximális szélesség beállítása */
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px;
    width: 100%; /* A konténer szélessége kisebb képernyőkön */
  }
`;

const ProfileIcon = styled(AccountCircle)`
  font-size: 80px !important; /* Nagyobb méret a profilképhez */
  color: teal;
  margin-bottom: 20px;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%; /* A form teljes szélessége kitöltve */
`;

const FormItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 100%; /* A FormItem szélessége 100% */
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: black;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid lightgray;
  width: 100%; /* Szélesség 100% */
  box-sizing: border-box; /* Biztosítja, hogy a padding beleszámít a szélességbe */
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid lightgray;
  width: 100%; /* Ugyanakkora szélesség, mint az Input */
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: teal;
  color: white;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px; /* Margin a gomb fölött */

  &:hover {
    background-color: darkcyan;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Teszt Felhasználó",
    email: "teszt@felhasznalo.com",
    password: "",
    weight: "",
    height: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profileData);
    alert("Profil adatokat sikeresen frissítetted!");
  };

  return (
    <>
      <Announcement/>
      <Navbar />
      <Container>
        <Title>Profil Adataid</Title>
        <ProfileFormContainer>
          <ProfileIcon />
          <ProfileForm onSubmit={handleSubmit}>
            <FormItem>
              <Label>Név</Label>
              <Input
                type="text"
                name="name"
                value={profileData.name}
                disabled
              />
            </FormItem>
            <FormItem>
              <Label>E-mail</Label>
              <Input
                type="email"
                name="email"
                value={profileData.email}
                disabled
              />
            </FormItem>
            <FormItem>
              <Label>Testsúly (kg)</Label>
              <Input
                type="number"
                name="weight"
                value={profileData.weight}
                onChange={handleInputChange}
                placeholder="Add meg a testsúlyod"
                required
              />
            </FormItem>
            <FormItem>
              <Label>Magasság (cm)</Label>
              <Input
                type="number"
                name="height"
                value={profileData.height}
                onChange={handleInputChange}
                placeholder="Add meg a magasságod"
                required
              />
            </FormItem>
            <FormItem>
              <Label>Nem</Label>
              <Select
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Válaszd ki</option>
                <option value="male">Férfi</option>
                <option value="female">Nő</option>
                <option value="other">Egyéb</option>
              </Select>
            </FormItem>
            <Button type="submit">Adatok mentése</Button>
          </ProfileForm>
        </ProfileFormContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;

const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "E-mail cím szükséges!" });
  }

  try {
    
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // E-mail tartalma
    const mailOptions = {
      from: "your-email@gmail.com", // Feladó
      to: email, // Címzett
      subject: "Kapcsolatfelvétel - Gofit",
      text: `
      Kedves ${email.split('@')[0]}!
      
      Köszönjük, hogy feliratkoztál a GoFit hírlevelére! Örömmel értesítünk a legfrissebb hírekről, termékekről és szolgáltatásainkról. Célunk, hogy támogassunk az egészséges és aktív életmódod kialakításában.
      
      Ha bármilyen kérdésed van, fordulj hozzánk bizalommal az alábbi e-mail címen: gofitgpt@gmail.com.
      
      Sportos üdvözlettel,  
      A GoFit Csapata
        `,
      };


    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "E-mail sikeresen elküldve!" });
  } catch (error) {
    console.error("Hiba az e-mail küldésekor:", error);
    res.status(500).json({ message: "Nem sikerült elküldeni az e-mailt." });
  }
});

module.exports = router;

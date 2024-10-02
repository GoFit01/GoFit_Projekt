const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB csatlakozás sikeresen megtörtént!"))
  .catch((err) => {
    console.log(err);
  });


  app.use(cors());


  app.listen(process.env.PORT || 5000, () => {
    console.log("Backend szerver fut!");
  });
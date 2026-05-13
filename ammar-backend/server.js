const app = require("./app");
const sequelize = require("./config/db");

const PORT = 3000;

sequelize.sync()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
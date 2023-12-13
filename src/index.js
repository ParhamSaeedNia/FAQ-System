const app = require("./app");
const config = require("../config/server.config");
require("./utils/database");

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

# FAQ-System
After cloning the repo, run "npm i"

Your connection to DB is handled in "src/utils/database.js" based on configuratinos set in "config/database.config.js"

Your server configs is in "config/server.config.js"

Use "nodemon index.js" to run your server. You should see "Server is running on port 3000" and "Connected to MySQL database" messages in terminal.(You can install nodemon by "npm i nodemon" command)

Create database tables with sql codes located in "scripts/createDatabaseTables.sql"

You can add some mock data to your tables using the codes in "scripts/populateSampleData.sql"

---------------------------------

All user-specific endpoints are located in routes/userRoutes.js (all of these endpoints starts with "/user".)

All admin-specific endpoints are located in routes/adminRoutes.js (all of these endpoints starts with "/admin")

Auth middlewares(for admin routes) are not implemented ideally as it differs based on various projects.

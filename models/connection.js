const mongoose = require("mongoose")

const connectionString = "mongodb+srv://ericnoblot:32oiYHvIUbmbeISu@cluster0.e4l2f8n.mongodb.net/SAVE"

mongoose.connect(connectionString, {connectTimeoutMS: 2000})
.then(() => console.log("Database connected"))
.catch((error) => console.log(error))
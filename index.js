const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./Routes/userRoute");
const productRouter = require("./Routes/productRoute");
const cartRouter = require("./Routes/cartRoute");
const orderRouter = require("./Routes/orderRoute");
dotenv.config();
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("DB Connection Established"))
  .catch((err) => {
    console.log(err);
  });
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.listen(process.env.PORT || 5000, () => {
  console.log("Listening on Port 5000");
});

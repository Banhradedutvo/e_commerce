const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const categoryRoute = require("./routers/category");
const productRoute = require("./routers/product");
const authRoute = require("./routers/auth");
const userRoute = require("./routers/user");
const cartRoute = require("./routers/cart");
const productInCartRoute = require("./routers/productInCart");
const companyRoute = require("./routers/company");
const blogRoute = require("./routers/blog");
const commentRoute = require("./routers/comment");
const repCommentRoute = require("./routers/repComment");
const bannerRoute = require("./routers/banner");
const voucherRoute = require("./routers/voucher");
// const session = require("express-session");

dotenv.config();
// app.use(session({ resave: true, secret: "123456", saveUninitialized: true }));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("common"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected."))
  .catch((err) => console.log(err, "connect fail."));

// mongoose
//   .connect(
//     "mongodb+srv://admin:admin@gearshopfinal.isqkpz2.mongodb.net/?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("db connected."))
//   .catch((err) => console.log(err, "connect fail."));

app.get("/", (req, res) => {
  res.send("upload file");
});

// ! ROUTE

app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/productInCart", productInCartRoute);
app.use("/api/company", companyRoute);
app.use("/api/blog", blogRoute);
app.use("/api/comment", commentRoute);
app.use("/api/repcomment", repCommentRoute);
app.use("/api/banner", bannerRoute);
app.use("/api/voucher", voucherRoute);

// ? authentication : xac thuc
// ? authorization : phan quyen
app.listen(process.env.POST || 8000, () => {
  console.log(`Example app listening on port 8000`);
});

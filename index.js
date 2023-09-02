const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
app.use(express.json());
const cookieParser = require("cookie-parser");
const path = require("path");

//ROUTES
const registerRoute = require("./Routes/POST/registerRoute");
const loginRoute = require("./Routes/POST/loginRoute");
const getAllUsersRoute = require("./Routes/GET/getAllUsersRoute");
const getUserRoute = require("./Routes/GET/getUserRoute");
const addFriendsRoute = require("./Routes/PATCH/addFriendsRoute");
const removeFriendsRoute = require("./Routes/PATCH/removeFriendsRoute");
const refreshTokenRoute = require("./Routes/POST/refreshTokenRoute");
const addPostRoute = require("./Routes/POST/addPostRoute");
const getAllPostsRoute = require("./Routes/GET/getAllPostsRoute");
const uploadProfilePictureRoute = require("./Routes/POST/uploadProfilePictureRoute");
const getOtherUserRoute = require("./Routes/GET/getOtherUserRoute");
const getYourPostsRoute = require("./Routes/GET/getYourPostsRoute");
const getUserPostRoute = require("./Routes/GET/getUserPostRoute");
const getUserPostCountRoute = require("./Routes/GET/getUserPostCountRoute");
const editUsernameRoute = require("./Routes/PATCH/editUsernameRoute");
const deleteAccountRoute = require("./Routes/DELETE/deleteAccountRoute");
const deletePostRoute = require("./Routes/DELETE/deletePostRoute");
const likePostRoute = require("./Routes/PATCH/likePostRoute");
const addCommentRoute = require("./Routes/PATCH/addCommentRoute");
const getCommentsRoute = require("./Routes/GET/getCommentsRoute");
const getPostLikesRoute = require("./Routes/GET/getPostLikesRoute");
const reportPostRoute = require("./Routes/POST/reportPostRoute");
const savePostRoute = require("./Routes/PATCH/savePostRoute");
const getSavedPostsRoute = require("./Routes/GET/getSavedPostsRoute");
const getOtherUserPostCountRoute = require("./Routes/GET/getOtherUserPostCountRoute");

const corsOptions = {
  origin: "https://main--soft-queijadas-a8cf6f.netlify.app",
  credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  "/User_Mult_Images",
  express.static(path.join(__dirname, "User_Mult_Images"))
);

app.use(
  "/Post_Mult_Images",
  express.static(path.join(__dirname, "Post_Mult_Images"))
);

const URI = process.env.URI_CONNECTION_STRING;
const PORT = process.env.PORT || 5001;

mongoose
  .connect(URI)
  .then(console.log("SUCCESS DB CONNECT"))
  .then(
    app.listen(PORT, function (err) {
      if (err) console.log("Error in server setup");
      console.log("Server listening on Port", PORT);
    })
  );

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/getAllUsers", getAllUsersRoute);
app.use("/getUser", getUserRoute);
app.use("/addFriends", addFriendsRoute);
app.use("/removeFriends", removeFriendsRoute);
app.use("/refresh", refreshTokenRoute);
app.use("/addPost", addPostRoute);
app.use("/getAllPosts", getAllPostsRoute);
app.use("/uploadProfilePic", uploadProfilePictureRoute);
app.use("/getOtherUser", getOtherUserRoute);
app.use("/getYourPosts", getYourPostsRoute);
app.use("/getUserPost", getUserPostRoute);
app.use("/getUserPostCount", getUserPostCountRoute);
app.use("/edit/editUsername", editUsernameRoute);
app.use("/deleteAccount", deleteAccountRoute);
app.use("/deletePost", deletePostRoute);
app.use("/likePost", likePostRoute);
app.use("/addComment", addCommentRoute);
app.use("/getComments", getCommentsRoute);
app.use("/getLikes", getPostLikesRoute);
app.use("/report", reportPostRoute);
app.use("/savePost", savePostRoute);
app.use("/getSavedPosts", getSavedPostsRoute);
app.use("/getOtherUserPostCount", getOtherUserPostCountRoute);

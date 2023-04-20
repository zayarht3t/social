const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const userRoute = require("./routes/users");
const commentRoute= require("./routes/comment");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const multer = require("multer");
const uuidv4 = require('uuid');
const upload = multer({dest: "public/images"});
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

  app.use(
    cors(
      {
      origin: "http://localhost:3000",
      credentials: true,
    }
    )
  );

  
app.use(cookieParser());
app.use(express.json());
const fileStorge = multer.diskStorage({
  destination: (req, file, cb)=>{
      cb(null, 'public/images');
  },
  filename: (req, file, cb)=>{
      // cb(null, file.originalname);
     cb(null, uuidv4.v4() + "-" +file.originalname);
  }
});

const fileFilter = (req, file, cb)=>{
  if(
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'video/mp4'
  ){
      cb(null, true);
  } else{
      cb(null, false);
  }
}



  



app.use("/public/images",express.static(require('path').join(__dirname,'public/images')))


app.use('/api/upload', multer({storage: fileStorge, fileFilter: fileFilter}).single('file'),(req,res,next)=>{
  try {
    console.log(req.file)
    res.status(200).json(req.file.path)
  } catch (error) {
    next(error)
  }
});






app.use('/api/auth',authRoute);
app.use("/api/posts",postRoute);
app.use("/api/users",userRoute);
app.use("/api/comments",commentRoute)



mongoose.connect(
    "mongodb+srv://root:root@cluster0.ewrfz6j.mongodb.net/social?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(result=>{
        console.log("server is connected");
        const server = app.listen(8000);
        const io = require("./socket").init(server);

        io.on("connection",(socket)=>{
          console.log("socket connection ready!")
        })
    })
    .catch(error=>{
        console.log(error);
    })


app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});



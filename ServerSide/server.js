const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./Database/database")
const router = require("./Routes/authRoute")
const Productrouter = require("./Routes/products")
const editprofiledataRouter = require("./Routes/editProfileRoute")
const wishlistrouter = require('./Routes/wishlistroute')
const mailrouter = require("./Routes/mailRoute")
const multer = require('multer')
const path = require('path')

dotenv.config()

//instanciating express
const app = express()

// enable middlewares
app.use(cors())
app.use(express.json())

const PORT = 4000 || process.env.PORT

//running on serverside
app.get("/", (req, res) => {
    res.json({
        message: "Server is running on the webpage"
    })
})

//calling DB
connectDB()

//calling router
app.use('/api', mailrouter)
app.use('/api/products/wishlist', wishlistrouter)
app.use('/api/userprofile', editprofiledataRouter)
app.use('/api', router)
app.use('/api/products', Productrouter)


//Multer storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: true,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})

// server port
app.listen(PORT, () => {
    console.log("Server is running at port: 4000")
})


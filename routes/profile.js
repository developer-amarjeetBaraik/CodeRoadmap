import express, { Router } from "express";
import path from 'path'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import auth from "../middleware/auth.js";
import connectDB from "../connectDB.js";
import serveStaticFile from "../app.js";
import jwt from 'jsonwebtoken'
import contentInfo from "../module/contentModule.js";
import fs from 'fs'
// import allCollection from "../middleware/parseRoadmap.js";

const router = Router()
const app = express()

app.use(express.static(path.join('public')))
app.use(bodyParser.json());
app.use(cookieParser())



// Createing function to add roadmap content in database
function createRoadmap(identifierEmail) {
    fs.readFile('./javascript.json', async (err, data) => {
        await contentInfo.updateOne({ email: identifierEmail }, {
            $push: {
                collections: [JSON.parse(data)]
            }
        })
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}


connectDB() ? console.log('DB connected in your profile') : ''
router.get('/', (req, res) => {
    res.redirect('/log-in')
})

//send user profile page to user
router.get('/:slug', auth, (req, res) => {
    // res.json({message: 'testing...'})
    res.sendFile(path.join(serveStaticFile(), 'public', 'collections.html'))
})

//send all collection to list on DOM
router.post('/collection-details', (req, res) => {

    const token = req.cookies.token
    const identifierEmail = jwt.decode(token).email
    contentInfo.find({ email: identifierEmail })
        .then(data => {
            res.json(data)
        })
        .catch(err => console.log(err))
    // res.send('this is your collections')
})

//create new collection
router.post('/create-collection', (req, res) => {
    const token = req.cookies.token
    const identifierEmail = jwt.decode(token).email
    createRoadmap(identifierEmail)
    res.send('your collection created')
})

export default router
import express from 'express'
import { Router } from 'express'
import path, { dirname } from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import SignupInfo from '../module/signupInfoModule.js'
import jwt from 'jsonwebtoken'
import checkCookieAvailabel from '../middleware/checkCookieAvailable.js'
import connectDB from '../connectDB.js'

const router = Router()
const app = express()

const maindir = process.env.MAIN_DIRECTORY;

app.use(bodyParser.json())

app.use(express.static(path.join(maindir, "public")))


router.get('/', checkCookieAvailabel, (req, res) => {
    if (req.cookies.token) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(maindir, "public", "login.html"))
        connectDB() ? console.log('DB connected in login page') : ''  //loging if DB is connected
    }
})

app.use(cookieParser());
router.post('/', (req, res) => {
    const { email, password } = req.body;
    SignupInfo.findOne({ email: email }, { uniqueId: 1, email: 1, password: 1, _id: 0 })
        .then(data => {
            if (data.password === password) {
                const tokan = jwt.sign({ id: data.uniqueId, email: data.email }, process.env.JWT_SECRET_KEY)
                res.cookie('token', tokan, { httpOnly: true });
                res.redirect(`/profile/${data.uniqueId}`)
            }
            else {
                res.json({ 'message': 'wrong password' })
            }
        }).catch(err => {
            res.json({ 'message': 'user not found' })
        })

})

export default router
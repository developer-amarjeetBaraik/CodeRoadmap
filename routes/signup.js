import express, { response } from 'express'
import { Router } from 'express'
import bodyParser from 'body-parser'
import path, { dirname } from 'path'
import { generateFromEmail, generateUsername } from "unique-username-generator";
import SignupInfo from '../module/signupInfoModule.js'
import contentInfo from '../module/contentModule.js';
import checkCookieAvailabel from '../middleware/checkCookieAvailable.js'
import connectDB from '../connectDB.js'

const maindir = process.env.MAIN_DIRECTORY

const router = Router()
const app = express()

app.use(bodyParser.json())


app.use(express.static(path.join(maindir, "public")))

router.get('/', checkCookieAvailabel, (req, res) => {
    if (req.cookies.token) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(maindir, "public", "signup.html"))
        connectDB()?console.log('DB connected in signup page'):''    // loging if the DB is connected
    }
})

router.post('/', (req, res) => {
    const { username, email, password } = req.body;
    const uniqueId = generateFromEmail(
        email, 4
    );


    const newsignupinfo = new SignupInfo({
        uniqueId: uniqueId,
        name: username,
        email: email,
        password: password
    })
    const newcontentinfo = new contentInfo({
        email:email,
        collection: []
    })

    const main = async () => {
        try {
            newsignupinfo.save()
                .then(newsignupinfo => console.log("new user saved ", newsignupinfo))
                .catch(err => console.log(err))
            newcontentinfo.save()
            .then(newcontentinfo => console.log("new user saved ", newcontentinfo))
            .catch(err => console.log(err))

        } catch (error) {
            console.log("query error ", error)
        }
    }

    async function checkExisting() {
        let result = await SignupInfo.find({ email: email }, { email: 1, _id: 0 })
            .then(result => {
                if (result.length > 0) {
                    res.send({ response: "email already exists" })
                }
                else {
                    main()
                    res.send({ response: "you have ragistered" })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    checkExisting()
})

export default router
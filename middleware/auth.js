import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'


const app = express()
app.use(cookieParser())

const auth = (req, res, next) => {
    // console.log(jwt.decode(req.cookies.token).id)
    console.log(req.params.slug)
    const token = req.cookies.token
    if (!token) {
        res.redirect('/log-in')
    }
    else if (token && jwt.decode(req.cookies.token) != null) {

        if (token && jwt.decode(req.cookies.token).id === req.params.slug) {
            try {
                jwt.verify(token, process.env.JWT_SECRET_KEY)
                next()
            } catch (error) {
                res.redirect('/log-in')
            }
        }
        else {
            res.send(`you are not autherized for this slug "${req.params.slug}"`)
        }
    }
    else{
        res.redirect('/log-in')
    }
}

export default auth
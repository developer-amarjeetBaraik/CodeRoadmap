import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const app = express()

app.use(cookieParser())

function checkCookieAvailabel(req, res, next) {
    const token = req.cookies.token
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY)
            next()
        } catch (error) {
           console.log(error) 
        }
    }
    else{
        next()
    }
}

export default checkCookieAvailabel
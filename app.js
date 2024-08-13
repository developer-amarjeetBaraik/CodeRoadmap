// 1662 line of code
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
import mongoose from 'mongoose'
import login from './routes/login.js'
import signup from './routes/signup.js'
import profile from './routes/profile.js'
import cookieParser from 'cookie-parser'
import checkCookieAvailabel from './middleware/checkCookieAvailable.js'
import jwt from 'jsonwebtoken'

const app = express()

function serveStaticFile(mainFilePath){
  const __filename = fileURLToPath(import.meta.url);
  return mainFilePath = path.dirname(__filename)
}

const port = 3000
app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())


app.use('/log-in', login)
app.use('/sign-up', signup)
app.use('/profile', profile)



app.get('/', checkCookieAvailabel, (req, res) => {
  if (req.cookies.token) {
    res.sendFile(path.join(serveStaticFile(), 'public', 'homeforlogedin.html'))
  }
  else {
    res.sendFile(path.join(serveStaticFile(), 'public', 'home.html'))
  }
})

app.post('/delete-token', (req, res) => {
  console.log('deleted')
  res.clearCookie('token')
  console.log('redirecting...')
  res.redirect('/')
})

app.get('/collections', (req, res)=>{
  const token = req.cookies.token
  const uniqueId = jwt.decode(token).id
  res.redirect(`/profile/${uniqueId}`)
})

app.get('/javascript', (req, res)=>{
  res.sendFile(path.join(serveStaticFile(), 'public', 'javascript.json'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default serveStaticFile
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './router/userRouter'
import { postRouter } from './router/postRouter'

dotenv.config()

//Invocando a função express() dentro da variável app
const app = express();
const local = process.env.PORT

app.use(express.json())
app.use(cors())

app.listen(local,()=>{ 
    console.log(`Servidor iniciado na porta ${local}`)})

app.use("/posts", postRouter)
app.use("/users", userRouter)
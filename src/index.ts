import express, {NextFunction, Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {productsRouter} from "./routs/products-router";

// создать экспресс-приложение
const app = express()

const corsMiddleware = cors();
app.use(corsMiddleware)
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

// сделали blablaMiddleware
const blablaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.blabla = "hello";
    next();
}

/*const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.token === "123") {
        next();
    } else {
        res.send(401)
    }
}*/

let requestsCounter = 0

const requestsCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  requestsCounter++;
  next();
}

// чтобы эта мидлварь распространилась на все приложение, а не добавлять в каждый метод
app.use(requestsCounterMiddleware)
app.use(blablaMiddleware)
//app.use(authGuardMiddleware)



const port = process.env.PORT || 3002

app.use('/products', productsRouter)

// т.о. мы его подцепили к цепочке, конкретно к гету
app.get('/products', blablaMiddleware, (req: Request, res: Response ) => {
    // @ts-ignore
    const blabla = req.blabla;
    res.send({value: blabla + '!!!' + requestsCounter})
})

app.get('/users', (req: Request, res: Response ) => {
    // @ts-ignore
    const blabla = req.blabla;
    res.send({value: blabla + ' from users!!!' + requestsCounter})
})

// стартануть приложение
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
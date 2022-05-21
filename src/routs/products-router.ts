import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const productsRouter = Router({})

const titleValidation = body('title').trim().isLength({min: 3, max: 10}).withMessage('Title length should be from 3 to 10 symbols')

productsRouter.post('/',
    //строчка ниже, конструкция, вызывает миддлварь
    titleValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})
productsRouter.put('/:id',
    titleValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        const product = productsRepository.findProductById(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})
// это реализация с переменной.
productsRouter.get('/:id', (req: Request, res: Response) => {
    let product = productsRepository.findProductById(+req.params.id)
    if (product){
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.get('/', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
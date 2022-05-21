"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_repository_1 = require("./repositories/products-repository");
const express_validator_1 = require("express-validator");
exports.productsRouter = (0, express_1.Router)({});
const titleValidation = (0, express_validator_1.body)('title').trim().isLength({ min: 3, max: 10 }).withMessage('Title length should be from 3 to 10 symbols');
exports.productsRouter.post('/', 
//строчка ниже, конструкция, вызывает миддлварь
titleValidation, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newProduct = products_repository_1.productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
});
exports.productsRouter.put('/:id', titleValidation, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const isUpdated = products_repository_1.productsRepository.updateProduct(+req.params.id, req.body.title);
    if (isUpdated) {
        const product = products_repository_1.productsRepository.findProductById(+req.params.id);
        res.send(product);
    }
    else {
        res.send(404);
    }
});
// это реализация с переменной.
exports.productsRouter.get('/:id', (req, res) => {
    let product = products_repository_1.productsRepository.findProductById(+req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.get('/', (req, res) => {
    var _a;
    const foundProducts = products_repository_1.productsRepository.findProducts((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
    res.send(foundProducts);
});
exports.productsRouter.delete('/:id', (req, res) => {
    const isDeleted = products_repository_1.productsRepository.deleteProduct(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
//# sourceMappingURL=products-router.js.map
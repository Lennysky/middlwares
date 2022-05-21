"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_router_1 = require("./routs/products-router");
// создать экспресс-приложение
const app = (0, express_1.default)();
const corsMiddleware = (0, cors_1.default)();
app.use(corsMiddleware);
const jsonBodyMiddleware = body_parser_1.default.json();
app.use(jsonBodyMiddleware);
// сделали blablaMiddleware
const blablaMiddleware = (req, res, next) => {
    // @ts-ignore
    req.blabla = "hello";
    next();
};
/*const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.token === "123") {
        next();
    } else {
        res.send(401)
    }
}*/
let requestsCounter = 0;
const requestsCounterMiddleware = (req, res, next) => {
    requestsCounter++;
    next();
};
// чтобы эта мидлварь распространилась на все приложение, а не добавлять в каждый метод
app.use(requestsCounterMiddleware);
app.use(blablaMiddleware);
//app.use(authGuardMiddleware)
const port = process.env.PORT || 3002;
app.use('/products', products_router_1.productsRouter);
// т.о. мы его подцепили к цепочке, конкретно к гету
app.get('/products', blablaMiddleware, (req, res) => {
    // @ts-ignore
    const blabla = req.blabla;
    res.send({ value: blabla + '!!!' + requestsCounter });
});
app.get('/users', (req, res) => {
    // @ts-ignore
    const blabla = req.blabla;
    res.send({ value: blabla + ' from users!!!' + requestsCounter });
});
// стартануть приложение
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map
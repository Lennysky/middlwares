"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRepository = void 0;
const products = [{ id: 1, title: 'tomato' }, { id: 2, title: 'orange' }];
exports.productsRepository = {
    findProducts(title) {
        if (title) {
            /*фильтр пробегается по массиву и создает новый массив,
            * в котором элементы прошли или не прошли в зав-ти от условий */
            let filteredProducts = products.filter(p => p.title.indexOf(title) > -1);
            return filteredProducts;
        }
        else {
            return products;
        }
    },
    createProduct(title) {
        const newProduct = {
            id: +(new Date()),
            title: title
        };
        products.push(newProduct);
        return newProduct;
    },
    findProductById(id) {
        let product = products.find(p => p.id === id);
        return product;
    },
    updateProduct(id, title) {
        let product = products.find(p => p.id === id);
        if (product) {
            product.title = title;
            return true;
        }
        else {
            return false;
        }
    },
    deleteProduct(id) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1);
                return true;
            }
            else {
                return false;
            }
        }
    }
};
//# sourceMappingURL=products-repository.js.map
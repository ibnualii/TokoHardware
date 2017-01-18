"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var mock_products_1 = require("../mock/mock-products");
var mock_cart_1 = require("../mock/mock-cart");
var core_1 = require("@angular/core");
var ProductService = (function () {
    function ProductService() {
    }
    ProductService.prototype.getProducts = function () {
        return Promise.resolve(mock_products_1.PRODUCTS);
    };
    ProductService.prototype.getProductsSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            return setTimeout(resolve, 2000);
        }) // delay 2 seconds
            .then(function () { return _this.getProducts(); });
    };
    ProductService.prototype.getProduct = function (id) {
        return this.getProducts()
            .then(function (products) { return products.find(function (product) { return product.id === id; }); });
    };
    ProductService.prototype.addToCart = function (product) {
        var cart;
        var isFound = this.increaseQuantity(product);
        if (!isFound) {
            cart = {
                id_cart: 1,
                product: product,
                quantity: 1
            };
            mock_cart_1.CART.push(cart);
            localStorage.setItem('cart', JSON.stringify(mock_cart_1.CART));
        }
    };
    ProductService.prototype.increaseQuantity = function (product) {
        var isFound = false;
        for (var i = 0; i < mock_cart_1.CART.length; i++) {
            if (mock_cart_1.CART[i].product.id === product.id) {
                mock_cart_1.CART[i].quantity++;
                isFound = true;
            }
        }
        localStorage.setItem('cart', JSON.stringify(mock_cart_1.CART));
        return isFound;
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable()
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map
const fs = require('fs');
const path = require('path');
const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('products');

controller = {

    products: (req,res) => {
        const products = productModel.readFile();
        res.render('products/products', {products})
    },

    detail: (req,res) => { 
        const id = +req.params.id;
        const product = productModel.find(id);    
        res.render('products/productDetail', {product})
    },

    create: (req,res) => res.render('products/productCreate'),

    store: (req, res) => {
        let product = req.body;
        if(req.file) {
            product.image = req.file.filename;
        }
        else {
            product.image = 'default-product-image.png'
        }
        productModel.create(product);

        res.redirect('/productos')
    },

    edit: (req,res) => { 
        const id = +req.params.id;
        const product = productModel.find(id);    
        res.render('products/productEdit',{product});
    },

    delete: (req,res) => {
        let idToDelete = req.params.id;
        productModel.delete(idToDelete);
        res.redirect('/productos');
    },

    update: (req,res) => {
        let idToUpdate = req.params.id;
        let dataUpdate = req.body;
        dataUpdate.image = req.file.filename;
        console.log(req.file);
        let productUpdate = {
            id: idToUpdate,
            ...dataUpdate,
        }
        productModel.update(productUpdate);
        res.redirect('/productos');
    },
};

module.exports = controller;
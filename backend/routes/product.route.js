import express from "express";
import { uploadMultiple } from "../middlewares/multer.js"
import { beveragesProducts, chipsProducts, createProduct, deleteProduct, fetchAllProducts, fetchProductDetail, fetchProductsByType, getRelatedProducts, homeCareProducts, searchProduct, updateProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.route('/create/product').post(uploadMultiple, createProduct);
router.route('/products').get(fetchAllProducts);
router.route('/products/:type').get(fetchProductsByType);
router.route('/product/details/:id').get(fetchProductDetail);
router.route('/related/products/:id').get(getRelatedProducts);
router.route('/search').get(searchProduct);
router.route('/beverages/products/:type').get(beveragesProducts);
router.route('/chips/products/:type').get(chipsProducts);
router.route('/homecare/products/:type').get(homeCareProducts);
router.route('/update/product/:id').put(uploadMultiple, updateProduct);
router.route('/delete/product/:id').delete(deleteProduct);

export default router;
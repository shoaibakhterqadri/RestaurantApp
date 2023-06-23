import express from "express";
import { AddtoCart, CartItemById } from "../controllers/Cart.js";

const router = express.Router();
router.post('/addToCart', AddtoCart)
router.get('/getCartItemsById/:id', CartItemById)
export default router;
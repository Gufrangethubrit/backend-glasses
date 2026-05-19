import express from 'express';
import { cartAdd, cartUpdate, getUserCart } from '../controller/cartController.js';
import isAuth from '../middleware/isAuth.js';

let cartRoutes = express.Router()

cartRoutes.post('/add-to-cart',isAuth,cartAdd)
cartRoutes.put('/update-cart',isAuth,cartUpdate)
cartRoutes.get('/get-cart',isAuth,getUserCart)
export default cartRoutes;
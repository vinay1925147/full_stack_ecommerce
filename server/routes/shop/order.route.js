import express from "express"
import { createPayment } from "../../controller/shop/order.controller.js";

const route = express.Router();

route.post('/create',createPayment)
export default route;
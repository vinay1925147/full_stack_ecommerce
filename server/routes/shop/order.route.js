import express from "express"
import {captureOrder, createOrder} from "../../controller/shop/order.controller.js"
const route = express.Router();

route.post("/create",createOrder)
route.post("/capture",captureOrder)
export default route;
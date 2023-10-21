import express from "express"
import { payment } from "../controllers/payment.js"

const router = express.Router()

//create payment
router.post("/charge",payment)

export default router


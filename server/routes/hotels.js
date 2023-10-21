import express from "express";
import {
  countByCity,
  countByRegion,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";





/**
 * @swagger
 * /api/hotels:
 *   get:
 *     summary: Get All Reservations
 *     tags: [Reservations All]
 *     responses:
 *       '200':
 *         description: A list of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 */

/**
 * @swagger
 * /api/hotels/find/{id}:
 *   get:
 *     summary: Get Single Reservations
 *     tags: [Reservations Single]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *       required: true
 *       description: The reservation Id
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Hotel'
 *       '404':
 *          description: The reservation was not found
 */



const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
//GET

router.get("/find/:id", getHotel);
//GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByRegion", countByRegion);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;

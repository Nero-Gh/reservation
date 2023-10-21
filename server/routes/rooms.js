import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get All Reservations Rooms
 *     tags: [Reservations All]
 *     responses:
 *       '200':
 *         description: A list of reservations rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Get Single Reservations room
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
 *                 $ref: '#/components/schemas/Room'
 *       '404':
 *          description: The reservation was not found
 */

const router = express.Router();
//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
//DELETE
// router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
router.delete("/:id", verifyAdmin, deleteRoom);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);

export default router;

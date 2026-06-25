import express from "express"
import eventsController from "../controllers/eventController.js"

const router = express.Router();

router.route("/")
.post(eventsController.getEvents)

router.route("/post")
.post(eventsController.insertEvent)

router.route("/:id")
.put(eventsController.updateEvent)
.delete(eventsController.deleteEvent)

export default router;
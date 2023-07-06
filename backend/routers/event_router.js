import { Router } from "express";
import { User } from "../models/users.js";
import { limeEvent } from "../models/limeEvents.js";

export const eventsRouter = Router();

eventsRouter.get("/", async (req, res) => {
  let filter = {};
  if (req.query.userId) {
    filter.userId = req.query.userId;
  }

  const events = await limeEvent.find(filter);
  return res.json(events);
});

eventsRouter.post("/", async (req, res) => {
  const event = new limeEvent({
    eventName: req.body.eventName,
    eventDescription: req.body.eventDescription,
    eventDate: req.body.eventDate,
    eventLocation: req.body.eventLocation,
    userId: req.body.userId,
  });

  try {
    await event.save();
  } catch (err) {
    return res.status(422).json(err);
  }

  return res.json(event);
});

eventsRouter.get("/:id", async (req, res) => {
  const event = await limeEvent.findById(req.params.id);
  return res.json(event);
});

//TODO: add and remove users from interestedUsers
eventsRouter.patch("/:id", async (req, res) => {
  const event = await limeEvent.findById(req.params.id);
  event.eventName = req.body.eventName;
  event.eventDescription = req.body.eventDescription;
  event.eventDate = req.body.eventDate;
  event.eventLocation = req.body.eventLocation;

  try {
    await event.save();
  } catch (err) {
    return res.status(422).json(err);
  }

  return res.json(event);
});

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

/*eventsRouter.patch("/interested", async (req, res) => {
  const event = await limeEvent.findById(req.body.eventId);
  
  if(req.body.action === "add" && !event.interestedUsers.includes(req.body.userId)){
    event.interestedUsers.push(req.body.userId);
  } else if(req.body.action === "remove"){
    event.interestedUsers = event.interestedUsers.filter((userId) => userId !== req.body.userId);
  }

  try {
    await event.save();
  } catch (err) {
    return res.status(422).json(err);
  }

  return res.json(event);
});*/

eventsRouter.patch("/joinEvent", async (req, res) => {
  const event = await limeEvent.findById(req.body.eventId);

  if(!event.interestedUsers.includes(req.body.userId))
    event.interestedUsers.push(req.body.userId);

  try {
    await event.save();
  } catch (err) {
    return res.status(422).json(err);
  }

  return res.json(event);
});

eventsRouter.patch("/leaveEvent", async (req, res) => {
  const event = await limeEvent.findById(req.body.eventId);

  event.interestedUsers.pull(req.body.userId);

  try {
    await event.save();
  } catch (err) {
    return res.status(422).json(err);
  }

  return res.json(event);
});

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

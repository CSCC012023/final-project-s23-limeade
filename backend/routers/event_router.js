import { Router } from "express";
import { User } from "../models/users.js";
import { limeEvent } from "../models/limeEvents.js";
import { isAuthenticated } from "../middleware/auth.js";

export const eventsRouter = Router();

eventsRouter.get("/", async (req, res) => {
  const user = await User.findOne({
    _id: req.session.userId,
  });
  if (!user) {
    return res.status(404).json({ error: "Cannot find YOU" });
  }

  let filter = {};
  if (req.query.userId) {
    filter.userId = req.query.userId;
  }

  if (!req.query.userId) {
    filter.userId = { $nin: user.blocked };
  }

  let sort = {};
  if (req.query.sort) {
    const sortArray = req.query.sort.split("_");
    if (sortArray[0] !== "" && sortArray[1] === "asc") {
      sort[sortArray[0]] = 1;
    } else if (sortArray[0] !== "" && sortArray[1] === "desc") {
      sort[sortArray[0]] = -1;
    } else {
      return res.status(400).json({ error: "Invalid sort parameter" });
    }
  }

  if (req.query.eventDateMin) {
    filter.eventDate = { $gte: req.query.eventDateMin + ":00.000Z" };
  }

  if (req.query.eventDateMax) {
    if (!filter.eventDate) {
      filter.eventDate = {};
    }
    filter.eventDate.$lte = req.query.eventDateMax + ":00.000Z";
  }

  if (req.query.eventLocation) {
    filter.eventLocation = { $regex: req.query.eventLocation, $options: "i" };
  }

  if (req.query.eventTypes) {
    filter.eventTypes = { $all: req.query.eventTypes.split("_") };
  }

  let events;
  if (sort === "") {
    events = await limeEvent.find(filter);
  } else {
    events = await limeEvent.find(filter).sort(sort);
  }

  return res.json(events);
});

eventsRouter.get("/recommended", isAuthenticated, async (req, res) => {
  const user = await User.findOne({
    _id: req.session.userId,
  });
  if (!user) {
    return res.status(404).json({ error: "Cannot find YOU" });
  }

  const events = await limeEvent.aggregate([
    {
      $match: {
        eventTypes: {
          $in: user.interests,
        },
        userId: {
          $nin: [user._id, ...user.blocked],
        },
      },
    },
    {
      $addFields: {
        similarity: {
          $size: {
            $setIntersection: ["$eventTypes", user.interests],
          },
        },
      },
    },
    {
      $sort: {
        similarity: -1,
      },
    },
    {
      $limit: 10,
    },
  ]);

  return res.json(events);
});

eventsRouter.post("/", async (req, res) => {
  const event = new limeEvent({
    eventName: req.body.eventName,
    eventDescription: req.body.eventDescription,
    eventDate: req.body.eventDate,
    eventLocation: req.body.eventLocation,
    eventTypes: req.body.eventTypes,
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

  if (!event.interestedUsers.includes(req.body.userId))
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

eventsRouter.get("/eventSearch/queryString=:queryString", async (req, res) => {
  let events = [];
  const queryString = req.params.queryString;
  if (queryString === "") {
    return res.json(events);
  }

  console.log(req.query.userId);

  if (req.query.userId)
    events = await limeEvent.find({
      eventName: { $regex: queryString, $options: "i" },
      userId: req.query.userId,
    });
  else
    events = await limeEvent.find({
      eventName: { $regex: queryString, $options: "i" },
    });

  return res.json(events);
});

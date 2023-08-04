export interface LimeEvent {
  _id: string;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventLocation: string;
  eventTypes: string[];
  eventCost: string;
  interestedUsers: string[];
  advertise: boolean;
  userId: string;
}

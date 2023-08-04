export interface LimeEvent {
  _id: string;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventLocation: string;
  eventTypes: string[];
  interestedUsers: string[];
  advertise: boolean;
  eventCost: string;
  userId: string;
}

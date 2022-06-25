import mongoose from 'mongoose'
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    /**
     * roomNumbers = [001, [23/01/2001, 24/01/2001] , ...]
     * this is tell similar rooms available in the hostel e.g first floor of hotel have all similar rooms 
     */
  },
  { timestamps: true },
)

export default mongoose.model('Room', RoomSchema)

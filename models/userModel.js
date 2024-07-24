const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  batchId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  totalLeafNodecount: {
    type: Number,
    required: true,
  },
  completedContents: [
    {
      identifier: {
        type: String,
        required: true,
      },
      status: {
        type: Number,
        required: true,
        enum: [0, 1, 2], // 2 - completed, 0 & 1 - initiated but not completed
      },
    },
  ],
  progress: {
    type: Number,
    required: true,
  },
  batchEnrollmentDate: {
    type: Date,
    required: true,
  },
  lastAccessTime: {
    type: Date,
    required: false,
  },
  lastCompletedTime: {
    type: Date,
    required: false,
  },
  lastUpdatedTime: {
    type: Date,
    required: false,
  },
  viewCount: {
    type: Number,
    required: false,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;

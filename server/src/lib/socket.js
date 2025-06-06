import { Server } from "socket.io";
import http from "http";
import express from "express";
import "dotenv/config";
const app = express();
const server = http.createServer(app);
const frontend_url = process.env.FRONTEND_URL;
const io = new Server(server, {
  cors: {
    origin: frontend_url,
    methods: ["GET", "POST"],
  },
});
// Helper function to get realtime chat messages
export function gerReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Used to store onlene users
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };

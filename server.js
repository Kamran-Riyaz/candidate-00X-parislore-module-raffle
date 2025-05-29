// server.js (Mock Backend with Express)
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let ticketCount = 0;

app.post("/api/raffle-ticket", (req, res) => {
  ticketCount++;
  res.json({ success: true, tickets: ticketCount });
});

app.post("/api/create-checkout-session", (req, res) => {
  res.json({ sessionId: "test_session_123" });
});

app.post("/api/stripe-webhook", (req, res) => {
  ticketCount++;
  res.json({ success: true, tickets: ticketCount });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Mock server running at http://localhost:${PORT}`)
);

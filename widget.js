// widget.js (Injectable Raffle Ticket Widget - Netlify Friendly)
(function () {
  let ticketCount = 0;
  const button = document.createElement("button");
  button.textContent = "Buy €1 Raffle Ticket";
  button.style.backgroundColor = "var(--primary-color, #FF6F00)";
  button.style.color = "#fff";
  button.style.padding = "10px 20px";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";

  let ticketMessage = document.createElement("p");
  ticketMessage.style.marginTop = "10px";

  button.addEventListener("click", async () => {
    try {
      // Simulate Stripe Checkout creation
      const session = { sessionId: "test_session_123" };
      if (session.sessionId) {
        // Simulate redirect and webhook callback
        setTimeout(() => {
          ticketCount += 1;
          ticketMessage.textContent = `✅ You have ${ticketCount} ticket(s)`;
        }, 1000);
      } else {
        throw new Error("No sessionId received");
      }
    } catch (err) {
      ticketMessage.textContent = "❌ Error, try again.";
    }
  });

  const wrapper = document.createElement("div");
  wrapper.style.margin = "20px 0";
  wrapper.appendChild(button);
  wrapper.appendChild(ticketMessage);

  document.body.appendChild(wrapper);
})();

// widget.js (Injectable Raffle Ticket Widget)
(function () {
  const BASE_URL = "http://localhost:5000"; // Change for deployment
  let ticketMessage = null;
  const button = document.createElement("button");
  button.textContent = "Buy €1 Raffle Ticket";
  button.style.backgroundColor = "var(--primary-color, #FF6F00)";
  button.style.color = "#fff";
  button.style.padding = "10px 20px";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";

  button.addEventListener("click", async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/create-checkout-session`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.sessionId) {
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
      } else {
        throw new Error("No sessionId received");
      }
    } catch (err) {
      ticketMessage.textContent = "❌ Error, try again.";
    }
  });

  ticketMessage = document.createElement("p");
  ticketMessage.style.marginTop = "10px";

  const wrapper = document.createElement("div");
  wrapper.style.margin = "20px 0";
  wrapper.appendChild(button);
  wrapper.appendChild(ticketMessage);

  document.body.appendChild(wrapper);
})();

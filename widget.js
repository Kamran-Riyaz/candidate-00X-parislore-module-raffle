// widget.js (Raffle Ticket Widget)
(function () {
  const BASE_URL = "https://parislore-backend.onrender.com";
  let ticketMessage = null;

  // Main Buy Ticket Button
  const buyButton = document.createElement("button");
  buyButton.textContent = "Buy €1 Raffle Ticket";
  buyButton.style.backgroundColor = "var(--primary-color, #FF6F00)";
  buyButton.style.color = "#fff";
  buyButton.style.padding = "10px 20px";
  buyButton.style.border = "none";
  buyButton.style.borderRadius = "5px";
  buyButton.style.cursor = "pointer";
  buyButton.style.marginRight = "10px";

  // Proceed to Payment Button
  const stripeButton = document.createElement("button");
  stripeButton.textContent = "Proceed to Payment";
  stripeButton.style.backgroundColor = "transparent";
  stripeButton.style.color = "var(--primary-color, #FF6F00)";
  stripeButton.style.border = "1px solid var(--primary-color, #FF6F00)";
  stripeButton.style.padding = "10px 20px";
  stripeButton.style.borderRadius = "5px";
  stripeButton.style.cursor = "pointer";

  // Buy directly (simulate backend raffle ticket)
  buyButton.addEventListener("click", async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/raffle-ticket`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        ticketMessage.textContent = `✅ You have ${data.tickets} ticket(s)`;
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      ticketMessage.textContent = "❌ Error, try again.";
    }
  });

  // Stripe checkout flow
  stripeButton.addEventListener("click", async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/create-checkout-session`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.sessionId) {
        // Redirect to mock Stripe page
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
      } else {
        throw new Error("No sessionId received");
      }
    } catch (err) {
      ticketMessage.textContent = "❌ Stripe error.";
    }
  });

  // Message
  ticketMessage = document.createElement("p");
  ticketMessage.style.marginTop = "10px";

  // Wrapper
  const wrapper = document.createElement("div");
  wrapper.style.margin = "20px 0";
  wrapper.appendChild(buyButton);
  wrapper.appendChild(stripeButton);
  wrapper.appendChild(ticketMessage);

  document.body.appendChild(wrapper);
})();

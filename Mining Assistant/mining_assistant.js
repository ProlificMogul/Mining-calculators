// Auto-resize textarea
function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

// Handle message sending
function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();

  if (message === "") return;

  // Add user message to chat
  addMessage(message, "user");

  // Clear input
  input.value = "";
  input.style.height = "auto";

  // Simulate AI response
  simulateAIResponse(message);
}

// Add message to chat
function addMessage(text, sender) {
  const messagesContainer = document.getElementById("chat-messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const senderName = sender === "user" ? "You" : "Mining Assistant";

  messageDiv.innerHTML = `
            ${text}
            <div class="message-metadata">${senderName} • ${currentTime}</div>
        `;

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Simulate AI response
function simulateAIResponse(userMessage) {
  // Show typing indicator
  const messagesContainer = document.getElementById("chat-messages");
  const typingDiv = document.createElement("div");
  typingDiv.className = "message ai-message";
  typingDiv.innerHTML = "Typing...";
  messagesContainer.appendChild(typingDiv);

  // Simulate AI processing time
  setTimeout(() => {
    messagesContainer.removeChild(typingDiv);

    // Here you would normally make an API call to your AI backend
    // For now, we'll use a simple response system
    let response = generateMiningResponse(userMessage);
    addMessage(response, "ai");
  }, 1500);
}

// Simple response generation (replace this with your actual AI integration)
function generateMiningResponse(userMessage) {
  const message = userMessage.toLowerCase();

  if (message.includes("ventilation")) {
    return "For mine ventilation calculations, we need to consider air quantity requirements, resistance of airways, and fan requirements. Would you like me to help you with a specific ventilation calculation?";
  } else if (message.includes("drilling") || message.includes("blast")) {
    return "For drilling and blasting operations, key factors include rock characteristics, hole diameter, spacing, and explosive type. What specific aspect would you like to analyze?";
  } else if (message.includes("economics") || message.includes("cost")) {
    return "Mining economics involves capital costs, operating costs, and revenue calculations. I can help you with NPV calculations, break-even analysis, or cut-off grade determinations. What would you like to know?";
  } else {
    return "I understand you have a question about mining operations. Could you please provide more specific details about what you'd like to know? I'm equipped to help with ventilation, drilling, blast design, economics, and safety protocols.";
  }
}

// Handle Enter key
document
  .getElementById("user-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

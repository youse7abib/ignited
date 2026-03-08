const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Menu toggle
menuToggle?.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
  });
});

// Contact form
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = data.get('name')?.toString().trim() || 'Friend';

    formStatus.textContent = `Thank you, ${name}! Your message has been received.`;
    contactForm.reset();
  });
}

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

if (chatbotToggle) {
  chatbotToggle.addEventListener('click', () => {
    chatbot.classList.toggle('active');
  });

  chatbotClose?.addEventListener('click', () => {
    chatbot.classList.remove('active');
  });

  chatbotSend?.addEventListener('click', sendChatMessage);
  chatbotInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });
}

function sendChatMessage() {
  const message = chatbotInput.value.trim();
  if (!message) return;

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'chatbot-message user-message';
  userMsg.innerHTML = `<p>${message}</p>`;
  chatbotMessages.appendChild(userMsg);

  chatbotInput.value = '';
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  // Simulate bot response
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'chatbot-message bot-message';
    const responses = [
      "I can help you with irrigation scheduling and crop management!",
      "Need water utilization tips? I can provide personalized recommendations.",
      "Tell me about your farm size and crops. What challenges are you facing?",
      "Our solutions can help reduce water usage by up to 40%!",
      "Would you like to subscribe to one of our plans? Check our Solutions page!"
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    botMsg.innerHTML = `<p>${randomResponse}</p>`;
    chatbotMessages.appendChild(botMsg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }, 500);
}

// Responsive menu
window.addEventListener('resize', () => {
  if (window.innerWidth > 680) {
    mainNav?.classList.remove('open');
  }
});

// Auth navigation
const authLinks = document.querySelectorAll('.auth-link');
authLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (link.textContent === 'Sign Up' && isLoggedIn) {
      e.preventDefault();
      alert('You are already logged in!');
    }
  });
});

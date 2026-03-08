// Subscription Modal Functionality

// Create subscription modal if it doesn't exist
function initSubscriptionModal() {
  // Check if modal already exists
  if (document.getElementById('subscriptionModal')) {
    return;
  }

  const modalHTML = `
    <div id="subscriptionModal" class="modal">
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <h2>GreenFlow Subscription Plans</h2>
        <p class="modal-subtitle">Choose the perfect plan for your farm</p>
        
        <div class="subscription-info">
          <h3>Why Subscribe to GreenFlow?</h3>
          <ul>
            <li> AI-powered crop monitoring and insights</li>
            <li> Smart irrigation optimization (save up to 40% water)</li>
            <li> Real-time farm analytics dashboard</li>
            <li> Mobile app access for on-the-go management</li>
            <li> Expert agronomist consultations</li>
            <li> 24/7 weather alerts and recommendations</li>
          </ul>
        </div>

        <div class="subscription-plans">
          <div class="plan-option">
            <h4>Starter Plan</h4>
            <p class="plan-price">$99<span>/3 months</span></p>
            <ul>
              <li>✓ 1 field visit / month</li>
              <li>✓ 2 expert questions / month</li>
              <li>✓ Basic crop dashboard</li>
              <li>✓ Irrigation tracking</li>
            </ul>
          </div>
          
          <div class="plan-option featured">
            <div class="plan-badge">Most Popular</div>
            <h4>Premium Plan</h4>
            <p class="plan-price">$169<span>/3 months</span></p>
            <ul>
              <li>✓ 2 field visits / month</li>
              <li>✓ 5 expert questions / month</li>
              <li>✓ Irrigation performance report</li>
              <li>✓ Weather integration</li>
            </ul>
          </div>
          
          <div class="plan-option">
            <h4>Super Plan</h4>
            <p class="plan-price">$229<span>/3 months</span></p>
            <ul>
              <li>✓ 4 field visits / month</li>
              <li>✓ Unlimited expert questions</li>
              <li>✓ Soil and weather forecasting</li>
              <li>✓ 24/7 Priority support</li>
            </ul>
          </div>
        </div>

        <div class="modal-actions">
          <button class="modal-close-btn">Close</button>
          <a href="solution.html" class="modal-subscribe-btn">View Full Plans & Subscribe</a>
        </div>
      </div>
    </div>
  `;

  // Inject modal into page
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Get modal elements
  const modal = document.getElementById('subscriptionModal');
  const closeButtons = modal.querySelectorAll('.modal-close, .modal-close-btn');
  
  // Close modal when clicking close buttons
  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeSubscriptionModal);
  });

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeSubscriptionModal();
    }
  });
}

// Open subscription modal
function openSubscriptionModal() {
  initSubscriptionModal();
  const modal = document.getElementById('subscriptionModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close subscription modal
function closeSubscriptionModal() {
  const modal = document.getElementById('subscriptionModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Initialize all "Learn More" buttons on home page
function initLearnMoreButtons() {
  // Hero Learn More button
  const heroBtn = document.querySelector('.hero-overlay .cta-btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openSubscriptionModal();
    });
  }

  // Product Learn More buttons
  document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openSubscriptionModal();
    });
  });
}

// Initialize subscription buttons on solution page
function initSubscriptionButtons() {
  document.querySelectorAll('.subscribe-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get the plan name from the price card
      const priceCard = btn.closest('.price-card');
      const planName = priceCard ? priceCard.querySelector('h3').textContent : 'Selected Plan';
      
      // Check if user is logged in
      if (!localStorage.getItem('isLoggedIn')) {
        // Redirect to signup with plan info
        localStorage.setItem('selectedPlan', planName);
        window.location.href = 'signup.html';
      } else {
        // Show confirmation message
        alert(`✓ You've selected the ${planName} plan! 
        
Your subscription will start immediately. 
Check your email for confirmation and access details.`);
        // Optionally redirect to a confirmation page or dashboard
      }
    });
  });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSubscriptionModal();
  }
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Check which page we're on
  const isHomePage = document.querySelector('.hero') !== null;
  const isSolutionPage = document.querySelector('.solutions.panel') !== null;

  if (isHomePage) {
    initLearnMoreButtons();
  }

  if (isSolutionPage) {
    initSubscriptionButtons();
  }
});

// Export functions for external use
window.subscriptionFunctions = {
  openModal: openSubscriptionModal,
  closeModal: closeSubscriptionModal
};

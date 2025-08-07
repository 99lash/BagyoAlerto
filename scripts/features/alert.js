// Wait for DOM to load
export const renderAlertReminder = () => {

  document.addEventListener('DOMContentLoaded', () => {
    const alertContainer = document.querySelector(".alert.warning");
    if (alertContainer) {
      alertContainer.innerHTML = `
        <label for="alert-close" class="alert-close-btn" aria-label="Dismiss alert">&times;</label>
        <div class="alert-icon">
          <i class="ph ph-warning"></i>
        </div>
        
        <div class="alert-content">
          <div class="alert-header">
          Typhoon Warning
          </div>
          <p>
            Typhoon "Bagyo" is approaching Metro Manila. Expected landfall in 18 hours. Prepare your emergency kit now.
          </p>
          <span class="alert-timestamp">Jul 28, 2025, 09:22 PM</span>
        </div>`;
      }
  });
}

// if lalabas tong function sa taas may ginagawa lang ako, nakalimutan ko pala mag palit ng branch kanina sorry.
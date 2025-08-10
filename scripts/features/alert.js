import { getFormattedDateTime } from "../utils/date.js";

export const renderAlertReminder = ({severity, name, desc, isLocationAllowed}) => {
  const alertContainer = document.querySelector(".alert-inside-wrapper");
  if (alertContainer && isLocationAllowed) {
    alertContainer.innerHTML = `
    <div class="alert alert-${severity}">
      <label for="alert-close" class="alert-close-btn" aria-label="Dismiss alert">&times;</label>
      <div class="alert-icon-${severity}">
        <i class="ph ph-info"></i>
      </div>
      
      <div class="alert-content">
        <div class="alert-header">
          Weather Reminder
        </div>
        <p>
         <span class="weather-condition-${severity}">${name}</span>; ${desc}
        </p>
        <span class="alert-timestamp">${getFormattedDateTime()}</span>
      </div>
    </div>`;
  } else {
    alertContainer.innerHTML = `
    <div class="alert alert-info">
      <label for="alert-close" class="alert-close-btn" aria-label="Dismiss alert">&times;</label>
      <div class="alert-icon-info">
        <i class="ph ph-info"></i>
      </div>
      
      <div class="alert-content">
        <div class="alert-header">
          Weather Reminder
        </div>
        <p>
          <span class="weather-condition-info">Location is blocked;</span> Please allow location for better app experience.
        </p>
        <span class="alert-timestamp">${getFormattedDateTime()}</span>
      </div>
    </div>`;
  }
}

// if lalabas tong function sa taas may ginagawa lang ako, nakalimutan ko pala mag palit ng branch kanina sorry.
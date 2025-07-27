# 🌪️ BagyoAlerto - Typhoon Emergency Checklist

BagyoAlerto is a simple website application that supports mobile view and an installable web app that helps Filipino families stay prepared for typhoons. Users can manage a customizable emergency checklist, toggle dark/light mode, and receive smart weather-based reminders. The app works offline, stores data using localStorage, and includes a printable emergency contact section — all built using vanilla HTML, CSS, and JavaScript with PWA support.

---

### Table of Contents

- [Team Collaborators/Members](#team-members)
- [Live Demo](#live-demo)
- [Project Objectives](#project-objectives)
- [Main Features](#app-features)
  - [Checklist Management](#features)
  - [User Experience & Design](#features)
  - [Weather Integration & Notifications](#features)
  - [Emergency Contacts Section](#features)
  - [Progressive Web App (PWA)](#features)
- [Stretch Goals](#stretch-goals)
- [Tech Stack](#tech-stack)

---

### Team Members
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/GABlane">
          <img src="https://avatars.githubusercontent.com/u/154031355?v=4" width="100px;" alt="John Gabrielle Ofiangga"/>
          <br/>
          <sub>
          <b>
            John Gabrielle Ofiangga
          </b>
          </sub>
        </a>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/sis0n">
          <img src="https://avatars.githubusercontent.com/u/149801329?v=4" width="100px;" alt="Alwyn Adriano"/>
          <br/>
          <sub>
          <b>
            Alwyn Adriano
          </b>
          </sub>
        </a>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/99lash">
          <img src="https://avatars.githubusercontent.com/u/124173983?v=4" width="100px;" alt="John Asher Manit"/>
          <br/>
          <sub>
          <b>
            John Asher Manit
          </b>
          </sub>
        </a>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/merikh2004">
          <img src="https://avatars.githubusercontent.com/u/147936249?v=4" width="100px;" alt="Joshua Paul Colmo"/>
          <br/>
          <sub>
          <b>
            Joshua Paul Colmo
          </b>
          </sub>
        </a>
      </td>
    </tr>
  </tbody>
</table>

---

### Live Demo

🔗 [https://bagyo-alerto.vercel.app](https://temporary-link-muna.com)

---

### Project Objectives

- Promote typhoon readiness and disaster risk reduction in the Philippines.
- Offer an offline-capable checklist tool that can be "installed" like a native app.
- Send reminders if it starts raining, prompting users to check their emergency kit.

---

### Features

#### 🗂️Checklist Management
- **Check/Uncheck Emergency Items** – Mark items as packed or pending
- **Add/Remove Custom Items** – Users can personalize the checklist
- **Save Checklist using localStorage** – Data persists even when offline
- **Categorize Items** – Items grouped by category (e.g., Food, Medical, Documents)
- **Checklist Versions** – Switch between pre-defined packs (e.g., Personal Kit, Family Kit, Pet Kit)
- **Check All/Uncheck All by Category or by Checklist** – Quickly manage item status by group
- **Remove All Items in a Category** – Declutter with one click
- **Import Checklist via File Upload/Export Checklist as .json file** – Sync data between devices

#### 📱 User Experience & Design
- **Mobile Responsive UI** – Seamless use on any device
- **Dark/Light Mode Toggle** – Accessible in various lighting conditions
- **Reset Entire Checklist** – Clear everything in one tap


#### 📡 Weather Integration & Notifications
- **In-App Weather Alerts** – Get reminders if rain is detected in user’s area (via weather API)
- **In-App Notifications** – Reminds user to review checklist before typhoon hits (PWA + Notification API)

#### 📞 Emergency Contacts Section
- **Export as PDF** – One-click export of contacts
- **Tap-to-Call Hotlines (Mobile only)** – Directly call government/emergency agencies from the app
- **Copy Contact Info Button** – Quick copy for text messaging or sharing

#### 🧩 Progressive Web App (PWA)
- **Add to Home Screen Support** – Works like a native app on mobile
- **Offline-Ready** – View and manage checklist even without internet
- **Data Stays Local** – Privacy-first approach, no account/login required

---

### Stretch Goals

> These may be implemented if there are still remaining time.

- Suggest recommended items based on user location or typhoon severity.
- Auto-detect city using Geolocation API for more accurate weather data.
- Use IndexedDB or alternative local storage for richer offline state and for bigger storage capacity.

---

### Tech Stack

| Category       | Technology                         |
| -------------- | ---------------------------------- |
| Markup/Style   | HTML5, CSS3                        |
| Logic          | Vanilla JavaScript                 |
| APIs           | WeatherAPI (fallback: sample JSON) |
| Storage        | localStorage                       |
| App-Like Setup | Progressive Web App (PWA)          |
| Notifications  | JS Notifications API               |
| Hosting        | Vercel                             |

---

<!-- 
## Documentation
You can find our documentation on our
[website](https://stretch-goal-muna.com) 
-->
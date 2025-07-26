# 🌪️ BagyoAlerto - Typhoon Emergency Checklist PWA

BagyoAlerto is a simple website application that supports mobile view and an installable web app that helps Filipino families stay prepared for typhoons. Users can manage a customizable emergency checklist, toggle dark/light mode, and receive smart weather-based reminders. The app works offline, stores data using localStorage, and includes a printable emergency contact section — all built using vanilla HTML, CSS, and JavaScript with PWA support.

---

### Table of Contents

- [Team Collaborators/Members](#team-members)
- [Live Demo](#live-demo)
- [Project Objectives](#project-objectives)
- [Core Features](#core-features)
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

### Core Features

- **Check/Uncheck Emergency Items**
- **Add/Remove Custom Items**
- **Save Checklist via `localStorage`**
- **Mobile-first UI** (responsive layout)
- **Dark/Light Mode Toggle**
- **In-App Notification if Raining** (via free weather API)
- **Offline-Ready & Mobile App-Like Ready via PWA**
- **Printable Emergency Contacts Page**
- **Tap-to-Call Hotlines**
- **Reset Entire Checklist with One Click**

---

### Stretch Goals

> These may be implemented if there are still remaining time.

- Suggest recommended items based on user location or typhoon severity.
- Auto-detect city using Geolocation API for more accurate weather data.
- Save multiple checklist versions (family pack, personal kit, etc.)
- Use IndexedDB or alternative local storage for richer offline state.
- Sync data between devices using QR code export/import.

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
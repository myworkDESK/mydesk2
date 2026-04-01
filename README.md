# 🚀 bolek – All-in-One Workspace (Freelancer & Personal)

## 📌 Overview

TaskFlow is a unified workspace platform designed for individuals, freelancers, and small teams.
It combines task management, client tracking, finance, and productivity tools into a single system.

The UI is based on a **minimal olive-themed dashboard** with modular architecture for scalability.

---

## 🧩 Core Modules

### 1. Tasks

* Create, update, delete tasks
* Priority levels (High, Medium, Low)
* Task linking to projects and clients
* Status tracking (Pending, In Progress, Done)

### 2. Projects

* Group tasks into projects
* Track completion percentage
* Assign deadlines

### 3. Clients

* Store client details
* Link projects & invoices
* Track communication notes

### 4. Time Tracking

* Start/stop timer
* Manual time entries
* Billable vs non-billable tracking

### 5. Finance

* Invoice generation
* Payment tracking
* Expense logging

### 6. Calendar & Schedule

* Auto-generated calendar (existing feature)
* Event tracking
* Deadline reminders

---

## 🏗️ Architecture

### Frontend (Current)

* Pure HTML + CSS + Vanilla JS
* Component-style sections:

  * Topbar
  * Cards (modular UI blocks)
  * Calendar engine
  * Task list

### Future (Recommended)

* Framework: React / Next.js
* State Management: Zustand / Redux
* Backend: Supabase / Firebase
* API Layer: REST or GraphQL

---

## ⚙️ Development Rules (IMPORTANT)

### 1. Do NOT Break Existing UI

* Keep:

  * CSS variables (`:root`)
  * `.card` system
  * Grid layout
* Any new feature must **reuse existing styles**

### 2. Follow Modular Structure

Each feature must be isolated:

```
/modules
  /tasks
  /clients
  /finance
  /time
```

### 3. Naming Convention

* camelCase (JS)
* kebab-case (CSS classes)
* Clear semantic names

---

## 🔐 Security Guidelines

### Input Handling

* Always sanitize user input
* Never inject raw HTML
* Use `textContent` instead of `innerHTML`

### Authentication (Future)

* Use JWT or Supabase Auth
* Store tokens securely (HTTP-only cookies)

### Data Protection

* Never expose API keys in frontend
* Use environment variables

### API Rules

* Validate all requests server-side
* Rate limit endpoints
* Log critical actions

---

## 🤖 AI / GitHub Copilot Rules

### AI Development Constraints

Copilot / AI must:

1. ❌ NOT modify existing core layout unless required
2. ✅ ONLY extend features modularly
3. ✅ Follow existing design tokens (colors, spacing)
4. ❌ NOT introduce random UI styles
5. ✅ Keep functions small and reusable

---

## 📐 UI Design System

### Colors

* Primary: `#5f6f45`
* Background: `#f4f6ef`
* Panel: `#fdfef9`

### Components

* Card (main container)
* Badge (status indicator)
* Calendar grid
* Task list

---

## 🔄 Feature Extension Rules

When adding new features:

1. Check if component already exists
2. Reuse `.card`
3. Keep animation consistent (`rise`, `hover`)
4. Do NOT duplicate logic

---

## 📊 Data Flow

```
Tasks → Projects → Clients → Finance
          ↓
       Calendar
```

---

## 🧪 Testing

* Test UI responsiveness
* Validate task creation flow
* Check calendar rendering
* Ensure no console errors

---

## 🚀 Deployment

* Static hosting (Cloudflare Pages / Vercel)
* Use `.env` for configs
* Enable HTTPS

---

## 📈 Future Enhancements

* AI Assistant
* Real-time sync
* Notifications
* Mobile responsive layout
* Dark mode

---

## ⚠️ Strict Rule

> Every update MUST align with:
>
> * Existing UI system
> * Security practices
> * Modular architecture

No exceptions.

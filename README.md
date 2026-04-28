# ShetiMitta 🌾

Empowering Farmers with Intelligent Decisions. Our platform is designed to revolutionize agriculture by providing farmers with smart, data-driven insights tailored to their specific needs. We aim to bridge the gap between traditional farming practices and modern technology, helping farmers increase productivity, reduce risks, and maximize profits.

> **Development Philosophy:** *Work Smart Not Hard.*

## 🚀 Core Features & Architecture

### 🛒 Main Marketplace & Dashboard (`index.html`)
* **Dynamic Navigation:** Responsive navbar that dynamically updates based on the user's active login state.
* **Animated Hero Section:** Engaging landing area featuring custom CSS `@keyframes` animations.
* **Market Directory:** Clean, responsive grids displaying fresh produce categories with live pricing.
* **Product Management:** Built-in forms allowing farmers to list new inventory directly to the marketplace.
* **Sales Analytics:** Visual data representations using **Chart.js** to display doughnut charts for Total Sales and bar charts for Monthly Sales Data.

### 📖 Farm Records Tracking (`diary.html`)
* **Comprehensive Data Entry:** Tools to log daily farm activities, weather conditions, temperature, crop type, and crop health.
* **Dynamic Rendering:** Displays historical entries in a card format by pulling saved data from the browser.
* **Advanced Filtering:** Allows users to sort, view, and filter their diary entries by specific dates or farming categories.

### 🤖 AI Assistant (`ai.html`)
* **Interactive Chat UI:** A modern messaging interface designed for quick agricultural queries.
* **Smart Responses:** Keyword-driven logic engine that scans user input to return contextually relevant farming advice instantly.

### 👤 Farmer Dashboard (`profile.html`)
* **Farmer Profiles:** Centralized hub displaying personal information, geographic location, and verification badges.
* **Live Statistics:** Auto-calculating metrics displaying total products listed and sales performance.
* **Inventory Overview:** A dynamic grid that pulls and renders the specific farmer's active product listings.

### 🔐 Authentication & Onboarding (`login.html` & `form.html`)
* **Detailed Registration:** Comprehensive intake flow capturing essential data such as farm size (acres) and primary crops.
* **Secure Login:** Standalone sign-in page with UI elements for email, password, and session memory.

## 🛠️ Technical Implementation

### The Logic Engine (`script.js`)
* **State Management:** Leverages browser `localStorage` to handle User Authentication state, Diary Entries, and Marketplace Products, creating a fully functional MVP without the need for an external database.
* **DOM Manipulation:** Custom functions handling mobile hamburger menus, interactive modals, and profile dropdowns.
* **Date Handling:** Automated functions to populate date fields (like product expiration or diary logs) dynamically.

### Theming & UI (`style.css`)
* **Design System:** Utilizes CSS variables (`--primary-color`, etc.) to maintain a consistent, nature-inspired palette across the entire platform.
* **Responsive Design:** Extensive media queries ensure that grids, navigation menus, and forms provide a flawless experience on both desktop and mobile devices.
* **Micro-interactions:** Smooth hover effects, modal transitions, and transform animations to enhance user experience.

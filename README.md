# 🚀 Leetcode Premium Companies Viewer

A modern, high-performance web interface to browse Leetcode company-specific questions. Designed to help you ace your interviews by focusing on the most relevant questions asked by top tech companies.

![Banner](public/background.png)

## 🌐 Live Demo

👉 **[View Live Application](https://leetcode-premium-eight.vercel.app)**


## ✨ Features

### 🔍 Discovery & Navigation
- **Company Browser**: Browse questions from top companies (Google, Meta, Amazon, etc.).
- **Smart Search**: Real-time search to instantly find the company you're preparing for.
- **Time-Based Filtering**: Filter questions by recency to focus on what's being asked *now*:
  - 30 Days
  - 3 Months
  - 6 Months
  - > 6 Months
  - All Time

### 📊 Progress Tracking & Analysis
- **Advanced Gamification**:
  - **Streak Calculator**: Keep your momentum going with a daily streak tracker.
  - **Progress Bars**: Visual breakdown of your completion status (Easy/Medium/Hard).
  - **Completion Stats**: See exactly how many problems you've crushed.
- **Problem Management**:
  - **Toggle Status**: Mark problems as solved/unsolved with a single click.
  - **Persisted Progress**: Your progress is saved locally.

### 🎨 Premium UI/UX
- **Glassmorphism Design**: Sleek, modern interface with frosted glass effects and vibrant gradients.
- **Dark/Light Mode**: Fully responsive theme toggling for late-night study sessions.
- **Fluid Animations**: Powered by `Framer Motion` for a polished, app-like feel.
- **Responsive**: Perfectly optimized for Desktop, Tablet, and Mobile.

### 📈 Data Visualization
- **Acceptance Rates**: View problem acceptance rates at a glance.
- **Frequency Meters**: Visual indicators of how often a question is asked.
- **Difficulty Badges**: Color-coded badges for Easy, Medium, and Hard problems.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📸 Screenshots


### 🏠 Home Page
> *Add a screenshot of the home page here*
> `![Home Page](screenshots/home_page.png)`

### 🏢 Company Details
> *Add a screenshot of the company detail page here*
> `![Company Page](screenshots/company_page.png)`

### 🧩 Problem List & Analysis
> *Add a screenshot of the problem list and analysis card here*
> `![Analysis](screenshots/analysis.png)`

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start the Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```bash
web-interface/
├── app/
│   ├── company/[name]/  # Company detail pages
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context (Progress, Theme)
│   ├── lib/             # Data fetching & utilities
│   └── page.tsx         # Home page
├── public/              # Static assets
└── ...
```

## � Acknowledgments

Special thanks to [liquidslr/leetcode-company-wise-problems](https://github.com/liquidslr/leetcode-company-wise-problems) for providing the comprehensive dataset of company-wise Leetcode problems that powers this application.

## �📝 License

This project is for personal educational use.

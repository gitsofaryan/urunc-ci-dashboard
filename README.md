# urunc CI Dashboard

The **urunc CI Dashboard** is a lightweight, high-performance web application for visualizing Continuous Integration (CI) test results from the **urunc** repository.  
It provides maintainers and contributors with a centralized, human-readable view of test health and historical trends, removing the need to manually inspect individual GitHub Actions runs.

Built using **Next.js** and styled with **TailwindCSS**, the dashboard focuses on simplicity, speed, and zero-maintenance deployment.

---

## ✨ Features

- **Automated Data Collection**  
  Fetches CI workflow data using a custom Node.js script that queries the GitHub Actions API.

- **Visual Status Indicators**  
  Weather-style icons (☀️ Sunny / ⛈ Stormy / 🌧 Rainy) provide instant insight into CI health.

- **Responsive UI**  
  Works seamlessly on laptops, tablets, and mobile devices.

- **Fast & Static-Friendly**  
  Designed to work with static JSON files instead of a database, keeping hosting cost at **$0**.

- **Modern Frontend Stack**  
  - Next.js for routing and rendering  
  - TailwindCSS for styling  
  - PrimeReact for UI components  

---

## 🏗 Architecture Overview

The dashboard follows a **zero-maintenance, serverless-friendly architecture**:

1. A script fetches CI workflow data from GitHub Actions.
2. The data is saved as static JSON.
3. The frontend loads and renders this data at build/runtime.
4. The site can be deployed to GitHub Pages or Vercel.

This eliminates:
- External databases
- Long-running backend services
- Hosting costs

---

## 📂 Project Structure

```text
.
├── next.config.js              # Next.js configuration
├── package.json                # Project dependencies and scripts
├── pages
│   ├── _app.js                 # Global app wrapper
│   └── index.js                # Main dashboard page
├── public                      # Static assets
│   ├── cloudy.svg
│   ├── partially-sunny.svg
│   ├── rainy.svg
│   ├── stormy.svg
│   └── sunny.svg
├── scripts
│   └── fetch-ci-nightly-data.js # Fetches CI test data
├── styles
│   └── globals.css             # Global TailwindCSS imports
└── tailwind.config.js          # Tailwind configuration
````

### Key Files

* **`pages/index.js`** – Main dashboard UI and rendering logic
* **`scripts/fetch-ci-nightly-data.js`** – GitHub Actions data fetcher
* **`public/`** – Weather icons and static assets
* **`styles/globals.css`** – Global styling

---

## 🚀 Setup & Development

### Prerequisites

* Node.js **18+**
* npm

---

### Installation

Clone the repository:

```bash
git clone https://github.com/gitsofaryan/urunc-ci-dashboard.git
cd urunc-ci-dashboard
```

Install dependencies:

```bash
npm install
```

---

### Environment Configuration

To avoid GitHub API rate limits, create a `.env` file:

```env
TOKEN=your_github_personal_access_token
```

You can generate a token here:
[https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

---

### Fetch CI Data

Create a local data folder:

```bash
mkdir localData
```

Fetch CI data:

```bash
NODE_ENV=development node scripts/fetch-ci-nightly-data.js > localData/job_stats.json
```

---

### Run the App

```bash
npm run dev
```

On Windows:

```bash
npm run win-dev
```

Open:
[http://localhost:3000](http://localhost:3000)

---

## 🏗 Production

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

## 🌍 Deployment Notes

In `deploy.yml`:

```yaml
env:
  NEXT_PUBLIC_BASE_PATH: ${{ vars.NEXT_PUBLIC_BASE_PATH }}
```

If undefined, the base path defaults to `/`, allowing easy deployment to:

* GitHub Pages
* Vercel
* Any static host

This makes it fork-friendly and PR-preview friendly.

---

## 📖 About

This project aims to improve CI observability for **urunc** by providing:

* Faster failure detection
* Easier trend analysis
* A single pane of glass for test health

---

## 📜 License

Apache-2.0


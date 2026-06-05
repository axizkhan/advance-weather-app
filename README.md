# Advanced Weather App

A modern, offline-capable weather application built with Next.js, Redux, and Tailwind CSS.

## ⚙️ Environment Variables Setup

To run this project locally, you must configure your environment variables. Follow these steps:

1. Create a new file named `.env` in the root directory of your project. You can do this in your terminal by running:
   ```bash
   touch .env
   ```
2. Open the `.env` file in your code editor and add the following configuration:

```env
NEXT_WEATHER_API_URL=https://api.weather-ai.co
NEXT_WEATHER_API_KEY=your_api_key_here
```

### 🔑 How to get your API Key:
1. Open your browser and go to [weather-ai.co](https://weather-ai.co).
2. Create a new account or log in to your existing account.
3. Navigate to the API or Dashboard section.
4. Generate a new API key and copy it to your clipboard.
5. Go back to your `.env` file and replace `your_api_key_here` with the API key you just copied.

---

## 🚀 Getting Started

Once your `.env` file is ready, you can start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the application by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🛠️ Built With
- [Next.js](https://nextjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

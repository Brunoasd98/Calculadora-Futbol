# Calculadora-Futbol

## Installation

### Prerequisites
- Node.js (version 14 or later)
- npm or yarn

### Steps to Install
1. Clone the repository:
   ```bash
   git clone https://github.com/Brunoasd98/Calculadora-Futbol.git
   cd Calculadora-Futbol
   ```
2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Usage

1. **Web Scraping Setup**: To set up web scraping with Puppeteer, ensure that Puppeteer is installed:
   ```bash
   npm install puppeteer
   # or
   yarn add puppeteer
   ```

2. **Run the application**:
   ```bash
   npm start
   # or
   yarn start
   ```

3. **Access the API**: The API will be available at `http://localhost:3000/api`.

## API Endpoints
- `GET /api/data`: Fetches data from the web scraping tasks.
- `POST /api/data`: Submits data to be processed by the application.

## Deployment to Vercel

1. Sign up for a Vercel account at [vercel.com](https://vercel.com).
2. Import the GitHub repository from your Vercel dashboard.
3. Set up Environment Variables in Vercel if required.
4. Click on 'Deploy'. Vercel will automatically build and deploy your application.


## Notes
- Ensure to check the version compatibility of all libraries used.
- Monitor the scraping tasks to avoid being blocked by target websites.
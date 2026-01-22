# urunc CI Dashboard and Notification System

## Overview
The urunc CI Dashboard and Notification System is designed to provide real-time insights into Continuous Integration (CI) testing results and to notify users of important events related to test outcomes. This project leverages a modern tech stack, including TypeScript, Express, and React, to create a robust and user-friendly interface for managing CI test results and notifications.

## Features
- **Dashboard**: Visual representation of test results, trends, and recent runs.
- **Test Results Management**: Fetch, display, and analyze test results.
- **Notification System**: Configurable alerts for test failures via email and Slack.
- **Webhook Integration**: Handle incoming webhooks from GitHub for CI events.

## Project Structure
The project is organized into a client-server architecture:
- **Client**: A React application that provides the user interface.
- **Server**: An Express application that handles API requests and business logic.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/urunc-dev/urunc.git
   cd urunc-ci-dashboard
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

4. Start the server:
   ```
   npm run start:server
   ```

5. Start the client:
   ```
   npm run start:client
   ```

## Usage
- Access the dashboard at `http://localhost:3000`.
- Configure notification settings in the Notifications section.
- View test results and trends in the Dashboard section.

## Development
- **Server**: The server code is located in the `src/server` directory. The main entry point is `app.ts`.
- **Client**: The client code is located in the `src/client` directory. The main entry point is `main.tsx`.

## Testing
- Run tests using:
  ```
  npm run test
  ```

## CI/CD
The project includes GitHub Actions workflows for:
- Reporting CI results (`.github/workflows/ci-report.yml`)
- Sending notifications on test failures (`.github/workflows/notify-on-failure.yml`)

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
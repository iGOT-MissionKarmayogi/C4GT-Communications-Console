# C4GT Communications Console

## User Search UI

Get Started on the Local Machine: To run the application on your local machine, follow these steps:

### 1. Install Node.js

Ensure that Node.js is installed on your machine. If you haven’t installed it yet, you can follow the official [Node.js installation guide](https://nodejs.org/) to download and install it.

### 2. Install Angular CLI

Make sure the Angular CLI is installed globally on your machine. If you haven’t installed it yet, you can do so by running the following command:

```bash
npm install -g @angular/cli

```

### 3. Clone the GitHub Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/iGOT-MissionKarmayogi/C4GT-Communications-Console.git

```

### 4. Checkout the following branch

```bash
git checkout user-search-ui

```

### 5. Install Project Dependencies

Run the following command to install all required dependencies for the project:

```bash
npm install

```

### 6. Configure Backend URL

Before running the application, make sure to set the backend API URL in the environment file.

Open the `src/app/environments/environment.ts` file and update the `apiUrl` field to point to the backend server. If you're running the backend locally, the default value is:

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
};
```

### 7. Build and serves your application, rebuilding on file changes.

```bash
ng serve

```

This will launch the application on http://localhost:4200

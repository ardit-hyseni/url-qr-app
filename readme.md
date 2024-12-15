# URL Shortener App

### Prerequisites:

- Docker (Docker Desktop) installed
- Node v18 or higher installed
- npm installed

### Setting up the app:

1. Open an empty folder and run this script `git clone https://github.com/ardit-hyseni/url-qr-app.git .` to clone it in the same directory
1. Run `docker compose up -d` in a bash terminal to pull and run Postgres in a container
1. On VSCode, go to File > Open Workspace from file > url-program.code-workspace
1. Run `npm install` in the root folder
1. Go to `packages/common` and run `npm i` then `npm run build`
1. Go to `packages/api` and run `npm i` then `npx prisma migrate dev` then `npm run start:dev`
1. Go to `packages/web` and run `npm i` then `npm run dev`
1. The app should be running (locally) at localhost:5173

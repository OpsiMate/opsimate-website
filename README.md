<h1 align="center">OpsiMate - website repo!</h1>
<p align="center"><b>The official website of OpsiMate - https://www.opsimate.com/</b></p>
<p align="center"><b>One console for servers, Docker, and Kubernetes—discover, monitor, and act.</b></p>
<p align="center">
  Built for DevOps/NOC/IT teams that need a single place to see service health,
  jump to dashboards, and perform safe start/stop/restart operations.
</p>

<p align="center">
  <a href="https://img.shields.io/github/commit-activity/m/OpsiMate/OpsiMate">
    <img alt="Commit activity" src="https://img.shields.io/github/commit-activity/m/OpsiMate/OpsiMate" />
  </a>
  <a href="https://github.com/OpsiMate/OpsiMate/releases">
    <img alt="Latest release" src="https://img.shields.io/github/v/release/OpsiMate/OpsiMate" />
  </a>
  <a href="https://github.com/OpsiMate/OpsiMate/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/OpsiMate/OpsiMate" />
  </a>
  <a href="https://github.com/OpsiMate/OpsiMate/stargazers">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/OpsiMate/OpsiMate?style=social" />
  </a>
  <a href="https://join.slack.com/t/opsimate/shared_invite/zt-39bq3x6et-NrVCZzH7xuBGIXmOjJM7gA">
    <img alt="Join Slack" src="https://img.shields.io/badge/Slack-Join%20Chat-4A154B?logo=slack&logoColor=white" />
  </a>
</p>

<p align="center">
  <a href="https://opsimate.vercel.app/getting-started/deploy">Get Started</a> ·
  <a href="https://opsimate.vercel.app/">Docs</a> ·
  <a href="https://www.opsimate.com/">Website</a> ·
  <a href="https://github.com/OpsiMate/OpsiMate/issues/new?labels=bug&template=bug_report.md">Report Bug</a>
</p>

## Contributing & running

```bash
#install documentation dependencies
npm install

#build the documentation
npm run build

#run the documentation
npm run dev

```


## Docker Setup

---

### 1. Prerequisites

- [Docker](https://www.docker.com/get-started) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

---

### 2. Development Setup (Hot Reload)

Use Docker Compose for development with hot reload enabled.

1. **Build the Docker image And Run the Image:**

```bash
docker-compose up --build
```
The app will be available at http://localhost:3000

Hot reload is enabled — any changes you make to the code locally will reflect inside the container.

2. **Stop the Services**

```bash
docker-compose down
```
Shuts down the services and cleans up associated containers and networks

---
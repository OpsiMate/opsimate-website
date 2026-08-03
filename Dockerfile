FROM  node:24-alpine

WORKDIR /app

COPY ./package*.json  ./

# npm ci, not npm install: install from the lockfile so the image gets the
# same versions CI tested. `npm install` re-resolves the semver ranges in
# package.json, so the image can silently drift from the lockfile as new
# releases ship.
RUN npm ci

COPY . .

EXPOSE 3000


CMD [ "npm","run","dev"]

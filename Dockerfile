FROM node:18.16.1-alpine as node

WORKDIR /usr/src/app

# Files required by npm install
COPY package*.json ./
# Files required by prisma
COPY prisma ./prisma

RUN npm ci

COPY . .


EXPOSE 25565

CMD [ "npm", "start" ]

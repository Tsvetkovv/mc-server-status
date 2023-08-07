FROM node:18-alpine as node

WORKDIR /usr/src/app

# Files required by npm install
COPY package*.json ./
# Files required by prisma
COPY prisma ./prisma

RUN npm ci

COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 25565

ENTRYPOINT ["/entrypoint.sh"]
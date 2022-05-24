FROM node:14.16.0-alpine as client-build

RUN mkdir -p /app

WORKDIR /app

COPY frontend/package.json /app

RUN npm install

COPY ./frontend /app

RUN npm run build --prod


# BACKEND STAGE 1 BUILD
FROM node:14.16.0-alpine as development

WORKDIR /usr/src/app

COPY backend/package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY ./backend ./
COPY --from=client-build /app/dist/nmrl-wbsite ../frontend/dist/nmrl-wbsite

RUN npm run build


# BACKEND STAGE 2 BUILD
FROM node:14.16.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY backend/package*.json ./

RUN npm install --only=production

COPY ./backend ./

COPY --from=development /usr/src/app/dist ./dist
COPY --from=client-build /app/dist/nmrl-wbsite ../frontend/dist/nmrl-wbsite

CMD ["node", "dist/main"]
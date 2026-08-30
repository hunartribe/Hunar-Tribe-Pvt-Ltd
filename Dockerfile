ARG APP_DIR=frontend

FROM node:20-alpine AS build
ARG APP_DIR
WORKDIR /app

COPY ${APP_DIR}/package.json ${APP_DIR}/package-lock.json ./
RUN npm ci

COPY ${APP_DIR}/ .
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

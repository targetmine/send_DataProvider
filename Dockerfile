# Stage1: compile and build angular code
FROM node:16-alpine AS build
WORKDIR /app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
RUN npm install --omit-dev

COPY . .
RUN ./node_modules/.bin/ng build 

# Stage 2: serve the app using nginx
FROM nginx:alpine
COPY --from=build /app/dist/data-reusable /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# ENTRYPOINT [ "tail", "-f", "/dev/null" ]
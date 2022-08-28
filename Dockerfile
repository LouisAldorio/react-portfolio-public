# Below Code is used if I want to build inside docker
FROM node:14-alpine as build-step

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
RUN npm install tsparticles
COPY . /app
RUN npm run build


FROM nginx:1.17.1-alpine

COPY --from=build-step /app/build /usr/share/nginx/html
COPY --from=build-step /app/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 9080
CMD ["nginx", "-g", "daemon off;"]

# FROM nginx:1.17.1-alpine

# COPY ./build /usr/share/nginx/html

# COPY ./default.conf /etc/nginx/conf.d/default.conf

# EXPOSE 9080

# CMD ["nginx", "-g", "daemon off;"]
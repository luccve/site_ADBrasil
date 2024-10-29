
FROM node:20.18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Copia o index.html para 404.html
RUN cp ./build/index.html ./build/404.html


FROM nginx:alpine


COPY --from=build /app/build /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

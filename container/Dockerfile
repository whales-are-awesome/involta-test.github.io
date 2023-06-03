FROM nginx:stable-alpine
WORKDIR /app
COPY ./dist /app/dist
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

RUN nginx

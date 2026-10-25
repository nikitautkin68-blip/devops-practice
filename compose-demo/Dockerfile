
FROM nginx:alpine


COPY html/ /usr/share/nginx/html/


LABEL maintainer="Nikita Utkin"
LABEL description="Моё первое портфолио в Docker"


EXPOSE 80


HEALTHCHECK CMD wget --quiet --spider http://localhost || exit 1

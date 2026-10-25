
FROM nginx:1.27-alpine

COPY html/ /usr/share/nginx/html/

LABEL maintainer="Nikita Utkin"
LABEL description="Static portfolio site served by Nginx"

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --spider http://127.0.0.1/ || exit 1

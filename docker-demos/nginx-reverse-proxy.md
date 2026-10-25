# Демонстрация Nginx Reverse Proxy

## Цель
Настройка Nginx в качестве обратного прокси для маршрутизации запросов к backend-приложениям.

## Конфигурация

### nginx.conf
```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    # Backend-приложения
    upstream app_server {
        server app:3000;
        server backend:3001;
    }

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    sendfile on;
    keepalive_timeout 65;

    # gzip сжатие
    gzip on;
    gzip_disable "msie6";
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data:" always;

    server {
        listen 80;
        server_name example.com www.example.com;

        # Главный сайт
        location / {
            proxy_pass http://app_server;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # Таймауты
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;

            # Буферизация ответа
            proxy_buffering on;
            proxy_buffer_size 128k;
            proxy_buffers 4 64k;
            proxy_busy_buffers_size 128k;
        }

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "OK\n";
            add_header Content-Type text/plain;
        }

        # Статическое контент
        location /static/ {
            alias /var/www/static/;
            expires 30d;
            add_header Cache-Control "public, max-age=2592000";
        }

        # API маршрутизация
        location /api/ {
            proxy_pass http://app_server;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            # Rate limiting
            limit_req zone=api limit=10n;
        }

        # Статистика сервера
        location /nginx_status {
            stub_status on;
            access_log off;
            allow localhost;
            deny all;
        }
    }
}
```

## Схема работы

```mermaid
graph TD
    A[Клиент] -->|HTTP Request| B[Nginx Proxy]
    B -->|Forward Request| C[Backend App 1 (Port 3000)]
    B -->|Forward Request| D[Backend App 2 (Port 3001)]
    C -->|Response| B
    D -->|Response| B
    B -->|HTTP Response| A
```

## Преимущества Nginx Reverse Proxy

1. **Безопасность**: Скрывает внутренние IP адреса серверов
2. **Нагружение**: Распределяет трафик между multiple backend
3. **SSL/Termination**: Обрабатывает HTTPS запросы, освобождает backend
4. **Кэширование**: Кэширует статический контент
5. **Балансировка нагрузки**: Automatic traffic distribution
6. **Rate limiting**: Защита от злоумышленников
7. **Static content**: Отдает картинки, CSS, JS напрямую

## Пример docker-compose с Nginx

```yaml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app
    networks:
      - app-network

  app:
    image: node:alpine
    ports:
      - '3000'
    environment:
      - NODE_ENV=production
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

## Использование

```bash
# Запуск с docker-compose
docker-compose up -d

# Проверка работы
curl http://localhost/health
# Результат: "OK"

curl http://localhost/
# Результат: Перенаправление к приложению
```

## Типичные настройки

### Rate limiting zone
```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
```

### SSL с Let's Encrypt
```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    # SSL настройки...
}
```
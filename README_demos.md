# DevOps Demo Portfolio

## Живые примеры работ

### 1. Docker Compose: Nginx сайт

**Файлы:**
- `docker-demos/docker-compose-nginx.yml` - Полная конфигурация
- `docker-demos/nginx.conf` - Nginx конфиг с healthcheck
- `docker-demos/app/index.html` - Demo приложение

**Запуск:**
```bash
cd /Users/nikitautkin/devops-practice/docker-demos
docker-compose -f docker-compose-nginx.yml up -d
```

**Доступно по адресу:** http://localhost:8080

**Функции:**
- Health check автоматически проверяет доступность сервера
- Тома для конфигурации
- Сеть app-network для связи сервисов
- Автоматический restart policy

---

### 2. CI/CD: GitHub Actions

**Файл:** `.github/workflows/ci-cd.yml`

**Триггеры:**
- Push в ветку main
- Pull request в ветку main

**Что делает:**
1. ✅ Проверяет код
2. ✅ Устанавливает Node.js
3. ✅ Устанавливает зависимости
4. ✅ Запускает тесты
5. ✅ Собирает Docker образ
6. ✅ Пушит в Docker Hub
7. ✅ Деплоит на сервер через SSH

**Секреты необходимы:**
- `DOCKER_USERNAME` - имя пользователя Docker Hub
- `DOCKER_PASSWORD` - пароль от Docker Hub
- `DOCKER_IMAGE` - имя образа
- `SSH_USER` - пользователь на сервере
- `SSH_HOST` - хост сервера
- `SSH_KEY` - SSH ключ для деплоя

---

### 3. Nginx: Обратный прокси

**Файл:** `docker-demos/nginx-reverse-proxy.md`

**Функции:**
- Маршрутизация к多个 backend серверам
- Health check endpoint `/health`
- Статическое контент кэширование
- API rate limiting
- Security headers
- SSL/TLS termination
- Статистика `/nginx_status`

**Схема:**
```
Клиент --> Nginx Proxy --> Backend App(s)
```

---

## Как запустить все демо

### Вариант А: Через Docker Compose

```bash
# Перейдите в папку демо
cd /Users/nikitautkin/devops-practice/docker-demos

# Запустите Nginx с приложением
docker-compose -f docker-compose-nginx.yml up -d

# Проверьте работу
curl http://localhost:8080/health
# Вывод: "OK"
```

### Вариант Б: Ручное развертывание

```bash
# 1. Запустите приложение
docker run -d -p 3000:3000 --name app_node node:alpine

# 2. Запустите Nginx
docker run -d -p 8080:80 \
  -v ./nginx.conf:/etc/nginx/nginx.conf:ro \
  --name nginx_proxy \
  nginx:alpine

# 3. Проверьте
open http://localhost:8080
```

### Вариант В: GitHub Actions CI/CD

1. Запушьте код в репозиторий
2. Actions автоматически запустятся
3. Собрали образ и пушили в Docker Hub
4. Деплоило на сервер
5. Обновление доступно по адресу

---

## Ключевые технологии

| Технология | Цель | Демо |
|------------|------|------|
| Docker | Контейнеризация | Nginx + Node.js |
| Docker Compose | Оркестрация | Многосервисные контейнеры |
| GitHub Actions | CI/CD | Автоматический деплой |
| Nginx | Reverse proxy | Маршрутизация и балансировка |
| Health checks | Мониторинг | Автоматическая проверка |
| Networks | Изоляция | app-network |
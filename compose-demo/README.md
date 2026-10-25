# Compose Demo: статический сайт в Nginx

Минимальный учебный пример: Docker собирает образ Nginx с HTML-страницей, а Compose запускает контейнер и публикует сайт на локальном порту `8080`.

## Запуск

Требуются Docker Engine и Docker Compose v2.

```sh
docker compose up --build -d
```

Откройте <http://localhost:8080>. Статус контейнера и логи можно проверить командами:

```sh
docker compose ps
docker compose logs
docker compose down
```

HTML включён в образ на этапе сборки. После изменения файлов в `html/` пересоберите его командой `docker compose up --build -d`.

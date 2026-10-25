# Real Stack: Flask + Redis + Nginx

Учебный многоконтейнерный проект. Nginx принимает HTTP-запросы на порту `8080` и проксирует их во Flask. Flask увеличивает счётчик посещений в Redis; Redis сохраняет данные в именованном Docker volume.

## Запуск

Требуются Docker Engine и Docker Compose v2.

```sh
docker compose up --build -d
docker compose ps
```

Проверки приложения:

```sh
curl -i http://localhost:8080/health
curl -i http://localhost:8080/ready
curl -i http://localhost:8080/
```

`/health` проверяет, что процесс приложения отвечает. `/ready` также проверяет соединение с Redis. Запрос к `/` возвращает JSON со счётчиком, который увеличивается при каждом запросе:

```json
{"message":"Flask + Redis + Nginx в Docker Compose","visits":1}
```

Redis не публикуется на хост: к нему обращаются только контейнеры внутренней сети Compose. Nginx запускается после того, как health check приложения пройдёт, а приложение — после готовности Redis.

## Полезные команды

```sh
docker compose logs -f
docker compose down
```

Данные Redis переживают пересоздание контейнеров благодаря volume `redis_data`. Для удаления контейнеров вместе с сохранёнными данными используйте `docker compose down -v`.

# DevOps-практика Никиты Уткина

Учебный репозиторий с проектами по Docker, Docker Compose, Nginx, Flask и Redis. Портфолио находится в папке [`www/`](./www/); оно предназначено для запуска только на этом компьютере и не публикуется автоматически в интернете.

## Запустить сайт-портфолио на своём компьютере

Нужен установленный Python 3. Из корневой папки репозитория выполните:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory www
```

Откройте в браузере <http://localhost:8000>. Сервер работает только на вашем компьютере. Чтобы остановить его, вернитесь в окно терминала и нажмите `Ctrl+C`.

Подробная инструкция, в том числе для Windows и VS Code, находится в [`www/README.md`](./www/README.md).

## Учебные проекты

| Проект | Что изучается | Инструкция |
| --- | --- | --- |
| Real Stack | Flask, Redis, Nginx reverse proxy, health checks, Docker volume | [README](./chapter4-realstack/README.md) |
| Compose Demo | Статический сайт в Nginx, Dockerfile и Docker Compose | [README](./compose-demo/README.md) |

Эти проекты запускаются отдельно от портфолио; для них требуется Docker. В папке сайта Docker не нужен.

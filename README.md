# Никита Уткин — DevOps-портфолио

Личный сайт-портфолио и лаборатория практических проектов по контейнеризации. Это учебный репозиторий: технологии в описании соответствуют тому, что действительно реализовано в коде.

**Профиль:** [github.com/nikitautkin68-blip](https://github.com/nikitautkin68-blip) · **Адрес сайта после включения GitHub Pages:** `https://nikitautkin68-blip.github.io/devops-practice/`

## Проекты

| Проект | Что показывает | Запуск |
| --- | --- | --- |
| [Real Stack](./chapter4-realstack/) | Flask, Redis, Nginx reverse proxy, health checks, persistent volume | `cd chapter4-realstack && docker compose up --build` |
| [Compose Demo](./compose-demo/) | Статический сайт в Nginx, Dockerfile и Docker Compose | `cd compose-demo && docker compose up --build` |

Откройте `http://localhost:8080` после запуска любого примера. Инструкции и команды проверки находятся в README соответствующего проекта.

## Публикация портфолио

Сайт — статические HTML, CSS и JavaScript-файлы в корне репозитория. GitHub Actions автоматически публикует их на GitHub Pages при push в `main`.

1. В GitHub откройте **Settings → Pages**.
2. Выберите **Build and deployment → Source → GitHub Actions**.
3. Отправьте изменения в ветку `main` и проверьте результат во вкладке **Actions**.

## Структура

```text
.
├── .github/workflows/deploy-pages.yml
├── chapter4-realstack/     # Flask + Redis + Nginx
├── compose-demo/           # статический сайт в Nginx
├── css/                    # стили портфолио
├── js/                     # мобильное меню и год в футере
├── index.html
└── DEVOPS-SHPARGLKA.md     # личные заметки по изучаемым командам
```

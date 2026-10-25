# 🚀 ПОЛНАЯ DevOps ШПАРГАЛКА С ОБЪЯСНЕНИЯМИ — Никита Уткин

## 1. Терминал (Основы)

pwd                    → Показать, в какой папке я сейчас нахожусь
ls                     → Показать файлы и папки в текущей директории
ls -la                 → Показать все файлы, включая скрытые
cd folder              → Перейти в папку
cd ..                  → Перейти на уровень выше
cd ~                   → Перейти в домашнюю папку
mkdir folder           → Создать новую папку
cat file.md            → Посмотреть содержимое файла
echo текст > file.md → Создать файл и записать в него текст (перезаписать)
echo текст >> file.md→ Добавить текст в конец файла
open index.html        → Открыть файл в браузере (на Mac)
clear                  → Очистить экран терминала

## 2. Homebrew

brew --version         → Проверить, установлен ли Homebrew
brew install git       → Установить программу (например git)
brew install --cask docker → Установить приложение с графическим интерфейсом (Docker Desktop)

## 3. Git

git --version                    → Проверить версию Git
git init                         → Инициализировать новый git-репозиторий
git status                       → Показать текущее состояние проекта (что изменилось)
git add .                        → Добавить все изменения в staging
git add filename.md              → Добавить конкретный файл
git commit -m сообщение        → Создать коммит с сообщением
git log --oneline                → Короткая история коммитов
git log --oneline -10            → Последние 10 коммитов

# Ветки
git branch                       → Показать локальные ветки
git branch -a                    → Показать все ветки (локальные + на GitHub)
git checkout -b feature/название → Создать новую ветку и сразу на неё перейти
git checkout main                → Переключиться на ветку main
git merge feature/название       → Слить изменения из feature-ветки в текущую

# Работа с GitHub
git remote -v                    → Посмотреть подключённые репозитории
git push                         → Отправить изменения на GitHub
git push -u origin main          → Первая отправка (связать ветку)
git pull                         → Скачать изменения с GitHub
git clone URL                    → Скачать репозиторий к себе на компьютер

## 4. SSH

ssh-keygen -t ed25519 -C email → Сгенерировать SSH-ключ
cat ~/.ssh/id_ed25519.pub        → Показать публичный ключ (чтобы добавить в GitHub)
ssh -T git@github.com            → Проверить подключение к GitHub

## 5. Docker

docker --version                 → Проверить версию Docker
docker run hello-world           → Первый тестовый запуск

# Запуск контейнеров
docker run -d --name my-nginx -p 8080:80 nginx:alpine  
   → Запустить nginx в фоне, пробросить порт 8080

docker run -d --name my-portfolio -p 8080:80 -v /Users/nikitautkin/devops-practice:/usr/share/nginx/html nginx:alpine
   → Запустить nginx с подключением твоей папки (чтобы сайт отображался)

# Управление контейнерами
docker ps                        → Показать запущенные контейнеры
docker ps -a                     → Показать все контейнеры
docker images                    → Показать скачанные образы
docker logs my-portfolio         → Посмотреть логи контейнера
docker exec -it my-portfolio sh  → Зайти внутрь контейнера

docker start my-portfolio        → Запустить остановленный контейнер
docker stop my-portfolio         → Остановить контейнер
docker rm my-portfolio           → Удалить контейнер
docker rm -f my-portfolio        → Принудительно остановить и удалить

# Очистка
docker system prune -a           → Очистить всё неиспользуемое

## 6. Полезные блоки команд

cd ~/devops-practice && git status

cd ~/devops-practice && git checkout main && git add . && git commit -m обновление && git push

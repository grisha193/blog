# blog

##  Состав

Laravel 
PHP 8.1 (FPM)
Nginx
MySQL 
Docker Compose
React.js


##  Быстрый старт

### 1. Клонируйте репозиторий

git clone https://github.com/grisha193/blog.git
cd blog

Работа с backend 
cd backend
cp .env.example .env

## Генерация ключа 
docker compose up -d --build        # Запуск контейнеров
docker exec -it laravel_app bash
composer install
php artisan key:generate
exit

## Применение миграций и сидов 
docker exec -it laravel_app php artisan migrate         # Применение миграций
docker exec -it laravel_app php artisan db:seed         # Заполнение базы

docker exec -it laravel_app php artisan migrate:fresh --seed # все сразу вместе с очисткой


docker-compose down Остановка контейнеров


Работа с frontend 

cd frontend
npm ci
npm run start

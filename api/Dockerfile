FROM php:8.3-cli

RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpq-dev

RUN docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY composer.json ./

RUN composer install --no-scripts --no-autoloader
RUN composer dump-autoload --optimize --no-scripts

COPY . .

ENV PORT=10000

RUN chmod -R 775 storage bootstrap/cache
RUN chown -R www-data:www-data storage bootstrap/cache

CMD php artisan serve --host=0.0.0.0 --port=$PORT

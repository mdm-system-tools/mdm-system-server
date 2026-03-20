FROM php:8.4-fpm-alpine

# Install dependencies
RUN apk add --no-cache \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    git


# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

# Install dependencies
RUN composer run setup-docker

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0"]

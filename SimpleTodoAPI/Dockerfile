FROM php:8-apache

# Instala los paquetes necesarios para Laravel
RUN apt-get update && apt-get install -y git zip unzip

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy existing application directory contents
COPY . /var/www

# Cambia al directorio de Laravel
WORKDIR /var/www

# Instala las dependencias de Laravel
RUN composer install

# Configura el archivo .env
RUN cp .env.example .env

# Genera la clave de aplicación
RUN php artisan key:generate

# Clear cache
RUN php artisan cache:clear 
RUN php artisan config:clear
RUN php artisan optimize

# Inicia el servidor de Laravel
CMD ["php","artisan","serve","--host=0.0.0.0"]
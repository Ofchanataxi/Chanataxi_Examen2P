# Chanataxi Leccion 2 - Purchase Orders Microservice

Este proyecto es un microservicio de gestión de órdenes de compra (Purchase Orders) construido con Spring Boot 3 y Java 21.

## Prerrequisitos

* **Docker Desktop** instalado y corriendo.
* (Opcional - Solo para Opción 2) **Java 21** instalado.

---

## Opción 1: Ejecutar desde Docker Hub (Recomendado)

Esta es la forma más rápida de ejecutar la aplicación, ya que utiliza la imagen pre-construida.

### 1. Crear una red de Docker
Para que la aplicación y la base de datos se comuniquen entre sí.

```bash
docker network create red-chanataxi
```

### 2. Iniciar la Base de Datos (MySQL)

Ejecuta el siguiente comando para levantar el contenedor de MySQL:

```bash
docker run -d --name chanataxi_mysql --network red-chanataxi -e MYSQL_DATABASE=chanataxi_leccion2_db -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_USER=user -e MYSQL_PASSWORD=password -v mysql_data:/var/lib/mysql mysql:8.0
```

### 3. Descargar y Correr la Aplicación desde Docker Hub


```
docker pull oscarf0511/chanataxi-leccion2:v1
```

Para ejecutarla:

```bash
docker run -d -p 8080:8080 --name app-chanataxi --network red-chanataxi -e DB_HOST=chanataxi_mysql -e DB_PORT=3306 -e DB_NAME=chanataxi_leccion2_db -e DB_USER=user -e DB_PASSWORD=password oscarf0511/chanataxi-leccion2:v1
```

La aplicación estará disponible en:  
`http://localhost:8080/api/v1/purchase-orders`

-----

## Opción 2: Ejecutar desde el Repositorio (GitHub)

Usa esta opción si has clonado el código fuente y quieres ejecutarlo localmente o construir tu propia imagen.

### 1. Clonar el repositorio

```bash

git clone https://github.com/Ofchanataxi/Chanataxi_Leccion2.git
cd Chanataxi_Leccion2
```

### 2. Levantar Base de Datos para Desarrollo Local

```bash
docker run -d -p 3307:3306 --name chanataxi_mysql_local -e MYSQL_DATABASE=chanataxi_leccion2_db -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_USER=user -e MYSQL_PASSWORD=password mysql:8.0
```

### 3. Ejecutar la Aplicación

#### A) Modo Desarrollo (Maven)

```bash
# Windows
./mvnw spring-boot:run

# Linux/Mac
chmod +x mvnw
./mvnw spring-boot:run
```

#### B) Construir tu propia imagen Docker

1. Empaquetar el JAR:

```bash
./mvnw clean package -DskipTests
```

2. Construir la imagen:

```bash
docker build -t chanataxi-app-local .
```

3. Ejecutar (igual que en Opción 1).

-----

## Probando la API

Puedes probar el servicio usando **Postman** o `curl`.

### Ejemplo para crear una orden (POST)

URL: `http://localhost:8080/api/v1/purchase-orders`

```json
{
    "orderNumber": "PO-2025-999",
    "supplierName": "ACME Tools",
    "status": "DRAFT",
    "totalAmount": 150.50,
    "currency": "USD",
    "expectedDeliveryDate": "2025-12-31"
}
```

---

## Archivos Adjuntos

Se adjunta la **exportación del archivo JSON de Postman**, que contiene la colección de pruebas para validar los endpoints del microservicio.


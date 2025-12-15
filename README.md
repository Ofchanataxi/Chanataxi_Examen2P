# Chanataxi - Sistema de Gestión de Órdenes de Compra

Este proyecto es una aplicación **Fullstack** para la gestión de órdenes de compra, implementada con una arquitectura de microservicios (o cliente-servidor desacoplado).

* **Frontend:** React + Vite (Servido con Nginx)
* **Backend:** Spring Boot 3 (Java 21)
* **Base de Datos:** MySQL 8.0

---

## 🚀 Ejecución Rápida (Recomendado)

No necesitas instalar Java, Node.js ni Maven. Solo necesitas **Docker Desktop**.

### Pasos para ejecutar:

1. Crea un archivo llamado `docker-compose.yml` en una carpeta vacía y pega el siguiente contenido:

```yaml
services:
  # 1. Base de Datos MySQL
  db:
    image: mysql:8.0
    container_name: chanataxi_mysql
    environment:
      MYSQL_DATABASE: chanataxi_leccion2_db
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3307:3306"
    volumes:
      - db_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin" ,"ping", "-h", "localhost"]
      timeout: 10s
      retries: 5

  # 2. Backend (Spring Boot)
  api:
    image: oscarf0511/chanataxi-backend:v1
    container_name: chanataxi_backend
    ports:
      - "8080:8080"
    environment:
      DB_HOST: db
      DB_PORT: 3306
      DB_NAME: chanataxi_leccion2_db
      DB_USER: user
      DB_PASSWORD: password
      DDL_AUTO: update
    depends_on:
      db:
        condition: service_healthy

  # 3. Frontend (React + Nginx)
  web:
    image: oscarf0511/chanataxi-frontend:v1
    container_name: chanataxi_frontend
    ports:
      - "5173:80"
    depends_on:
      - api

volumes:
  db_data:
```

2. Abre una terminal en esa carpeta y ejecuta:

```bash
docker-compose up -d
```

3. ¡Listo! La aplicación estará corriendo en unos segundos.

---

## 🌐 Accesos

Una vez iniciados los contenedores, puedes acceder a:

* **Frontend (Aplicación Web):** http://localhost:5173  
* **Backend (API REST):** http://localhost:8080/api/v1/purchase-orders  
* **Base de Datos:** Puerto `3307`
  * **Usuario:** `user`
  * **Contraseña:** `password`
  * **Base de datos:** `chanataxi_leccion2_db`

---

## 🛠️ Funcionalidades (CRUD Completo)

La aplicación permite realizar las siguientes acciones sobre las Órdenes de Compra:

* ✅ **Crear:** Registrar nuevas órdenes con validación de datos.
* ✅ **Leer:** Listar órdenes con filtros avanzados (Búsqueda, Estado, Moneda, Rangos de Precio y Fechas).
* ✅ **Actualizar:** Modificar órdenes existentes (Proveedor, Estado, Montos, etc.).
* ✅ **Eliminar:** Borrar órdenes del sistema.

---

## 📦 Arquitectura de Docker

El proyecto utiliza 3 contenedores orquestados:

1. **db:** Persistencia de datos con MySQL 8.
2. **api:** Imagen basada en `eclipse-temurin:21-jre-alpine` que ejecuta el JAR de Spring Boot.
3. **web:** Imagen basada en `nginx:alpine` que sirve los archivos estáticos optimizados de React.

---

## ❓ Solución de Problemas

### Error: Puertos ocupados
Si ves un error indicando que el puerto `8080`, `5173` o `3307` está en uso:

1. Detén otros servicios que usen esos puertos.
2. O modifica el `docker-compose.yml` cambiando el puerto de la izquierda (ej: `"8081:8080"`).

### Reiniciar desde cero
Si quieres borrar la base de datos y empezar limpio:

```bash
docker-compose down -v
docker-compose up -d
```

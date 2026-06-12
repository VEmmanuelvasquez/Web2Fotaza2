# Fotaza 2

Trabajo Práctico Integrador - Programación Web II

## Tecnologías utilizadas

* Node.js
* Express
* PostgreSQL
* Sequelize
* Pug
* Multer
* Sharp

## Instalación

Clonar el repositorio:

git clone URL_DEL_REPOSITORIO

Instalar dependencias:

npm install

Inicializar base de datos:

npm run db:init

Configurar variables de entorno:

Copiar el archivo:

.env.example

a

.env

y completar los datos correspondientes.

Iniciar la aplicación:

npm start

La aplicación quedará disponible en:

http://localhost:3000

## Funcionalidades implementadas

* Registro de usuarios
* Inicio de sesión
* Usuario invitado
* Publicaciones
* Múltiples imágenes por publicación
* Etiquetas múltiples
* Búsqueda avanzada
* Comentarios
* Cierre de comentarios
* Valoración de imágenes
* Seguimiento de usuarios
* Colecciones/Favoritos
* Denuncias de comentarios
* Copyright
* Marca de agua personalizada

## Usuarios de prueba

Administrador

Email: [admin@fotaza.com](mailto:admin@fotaza.com)

Password: 123456

Usuario 1

Email: [mauricio@fotaza.com](mailto:mauricio@fotaza.com)

Password: 123456

Usuario 2

Email: [emmanuel@fotaza.com](mailto:emmanuel@fotaza.com)

Password: 123456

## Problemas encontrados

* Implementación de múltiples imágenes.
* Implementación de etiquetas múltiples.
* Aplicación de marca de agua con Sharp.
* Restricción de contenido para usuarios invitados.

## Soluciones implementadas

* Almacenamiento de múltiples imágenes separadas por coma.
* Relación muchos a muchos para etiquetas.
* Procesamiento automático de imágenes mediante Sharp.
* Filtrado de publicaciones sin copyright para invitados.

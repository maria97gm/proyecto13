
# Proyecto 13 - The Final Dish

Como dicen, todo principio tiene su final, y este proyecto es el número 13 del Máster Rock{theCode}.

En él encontrarás una forma fácil de mejorar tu alimentación y conseguir tus objetivos alimentarios. Con un simple formulario, 3 preguntas y esperando unos instantes, tendrás un menú semanal saludable y muy variado.

Pero...vamos al grano,¿no?


## User VS Chef

Hay dos tipos de usuarios, el user normal y el Chef. Dependiendo de si tienes un rol u otro tendrás un visual diferente.

## Deployment

¿Qué puedes usar?

```bash
  npm run dev
```
*Para levantar el proyecto*

```bash
  node seeds/seed.js
```
*Para usar los datos de una semilla*





## ¿Qué variables se han usado en el proyecto?



- `DB_URL` → URL de la base de datos MongoDB
- `JWT_SECRET` → Clave secreta para la generación de tokens JWT
- `CLOUDINARY_API_KEY` → API key de Cloudinary
- `CLOUDINARY_API_SECRET` → API secret de Cloudinary
- `CLOUDINARY_CLOUD_NAME` → Nombre del cloud en Cloudinary





## ¿Qué librerías tenemos instaladas?

React

React DOM

React Hook Form

React Router DOM

React Select

React Slick

Slick Carousel

Styled Components

##  📖CRUD RECIPES

| Método | Endpoint                  | Descripción                                |
|--------|---------------------------|--------------------------------------------|
| GET    | `/api/v1/recipes`         | Obtiene todas las recetas (ordenadas por fecha de creación). |
| GET    | `/api/v1/recipes/:id`     | Obtiene una receta por su ID.              |
| GET    | `/api/v1/recipes/filter`  | Filtra recetas por tags y/o goals. Ej: `/api/v1/recipes/filter?tags=vegano&goals=gainmuscle` |
| POST   | `/api/v1/recipes`         | Crea una nueva receta.                     |
| PUT    | `/api/v1/recipes/:id`     | Actualiza una receta existente.            |
| DELETE | `/api/v1/recipes/:id`     | Elimina una receta por su ID.              |

## 📖 CRUD de Ingredients

| Método | Endpoint                    | Descripción                                |
|--------|-----------------------------|--------------------------------------------|
| GET    | `/api/v1/ingredients`       | Obtiene todos los ingredientes (ordenados alfabéticamente por nombre). |
| POST   | `/api/v1/ingredients`       | Crea un nuevo ingrediente.                 |
| PUT    | `/api/v1/ingredients/:id`   | Actualiza un ingrediente existente por ID. |
| DELETE | `/api/v1/ingredients/:id`   | Elimina un ingrediente por su ID.          |

## 📖 CRUD de Users

| Método | Endpoint                     | Descripción                                         |
|--------|------------------------------|-----------------------------------------------------|
| POST   | `/api/v1/users/register`     | Registra un nuevo usuario. Devuelve usuario y token. |
| POST   | `/api/v1/users/login`        | Inicia sesión con usuario y contraseña. Devuelve usuario y token. |
| GET    | `/api/v1/users`              | Obtiene todos los usuarios.                         |
| PUT    | `/api/v1/users/:id`          | Actualiza un usuario existente por ID.             |
| DELETE | `/api/v1/users/:id`          | Elimina un usuario por su ID.                      |
| GET    | `/api/v1/users/favorites`    | Obtiene las recetas favoritas del usuario logueado. |
| POST   | `/api/v1/users/favorites/:recipeId` | Añade una receta a los favoritos del usuario logueado. |
| DELETE | `/api/v1/users/favorites/:recipeId` | Elimina una receta de los favoritos del usuario logueado. |

## 📖 CRUD de Menus

| Método | Endpoint                   | Descripción                                         |
|--------|----------------------------|-----------------------------------------------------|
| POST   | `/api/v1/menus/week`       | Genera un menú semanal basado en tags y objetivos. |
| POST   | `/api/v1/menus`            | Guarda un menú para el usuario logueado.           |
| GET    | `/api/v1/menus/user`       | Obtiene el último menú creado por el usuario logueado. |
| GET    | `/api/v1/menus/user/all`   | Obtiene todos los menús creados por el usuario logueado (historial). |
| DELETE | `/api/v1/menus/:id`        | Elimina un menú por su ID.                         |

## 📖 CRUD de Images

| Método | Endpoint                   | Descripción                                         |
|--------|----------------------------|-----------------------------------------------------|
| POST   | `/api/v1/images`           | Subir una imagen asociada a un usuario o receta.   |
| DELETE | `/api/v1/images/:id`       | Elimina una imagen por su ID y la borra de Cloudinary. |
| GET    | `/api/v1/images`           | Obtiene todas las imágenes de tipo 'user'.         |




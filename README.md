<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Food

<p align="right">
  <img height="200" src="./cooking.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

## Horarios y Fechas

El proyecto tendrá una duración máxima de dos semanas. En el caso de que completan todas las tareas antes de dicho lapso podrán avisar a su Instructor para coordinar una fecha de presentación del trabajo (DEMO).

## Comenzando

 1. Forkear el repositorio para tener una copia del mismo en sus cuentas
 2. Clonar el repositorio en sus computadoras para comenzar a trabajar

Tendrán un `boilerplate` con la estructura general tanto del servidor como de cliente.

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

 * __Node__: 12.18.3 o mayor
 * __NPM__: 6.14.16 o mayor

Para verificar que versión tienen instalada:

> node -v
>
> npm -v

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde psql una base de datos llamada `food`

El contenido de `client` fue creado usando: Create React App.

## Enunciado

La idea general es crear una aplicación en la cual se puedan ver distintas recetas de comida junto con información relevante de las mismas utilizando la api externa [spoonacular](https://spoonacular.com/food-api) y a partir de ella poder, entre otras cosas:

  - Buscar recetas
  - Filtrarlos / Ordenarlos
  - Crear nuevas recetas propias

__IMPORTANTE__: Para poder utilizar esta API externa es necesario crearse una cuenta para obtener una API Key que luego debera ser incluida en todos los request que hagamos a spoonacular simplemente agregando `?apiKey={YOUR_API_KEY}` al final de cada endpoint. Agregar la clave en el archivo `.env` para que la misma no se suba al repositorio por cuestiones de seguridad y utilizarla desde allí.

### Requerimientos mínimos:

A continuación se detallaran los requerimientos mínimos para la aprobación del proyecto individial. Aquellos que deseen agregar más funcionalidades podrán hacerlo. En cuanto al diseño visual no va a haber wireframes ni prototipos prefijados sino que tendrán libertad de hacerlo a su gusto pero tienen que aplicar los conocimientos de estilos vistos en el curso para que quede agradable a la vista.

__IMPORTANTE__: No se permitirá utilizar librerías externas para aplicar estilos a la aplicación. Tendrán que utilizar CSS con algunas de las opciones que vimos en dicha clase (CSS puro, CSS Modules o Styled Components)

#### Tecnologías necesarias:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

Se debe desarrollar una aplicación de React/Redux que contenga las siguientes pantallas/rutas.

__Pagina inicial__: deben armar una landing page con
- [ ] Alguna imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: debe contener
- [ ] Input de búsqueda para encontrar recetas por nombre
- [ ] Área donde se verá el listado de recetas. Deberá mostrar su:
  - Imagen
  - Nombre
  - Tipo de comida (vegetarinao, vegano, apto celíaco, etc)
- [ ] Botones/Opciones para filtrar por por tipo de comida
- [ ] Botones/Opciones para ordenar las recetas
- [ ] Paginado para ir buscando y mostrando las siguientes recetas

__Ruta de detalle de receta__: debe contener
- [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de comida)
- [ ] Resumen del plato
- [ ] Puntuación
- [ ] Nivel de "comida saludable"
- [ ] Paso a paso

__Ruta de creación de recetas__: debe contener
- [ ] Un formulario __controlado__ con los siguientes campos
  - Nombre
  - Resumen del plato
  - Puntuación
  - Nivel de "comida saludable"
  - Paso a paso
- [ ] Posibilidad de seleccionar/agregar varios tipos de comidas
- [ ] Botón/Opción para crear una nueva receta

#### Base de datos

El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterísco deben ser obligatorias):

- [ ] Receta con las siguientes propiedades:
  - ID: * No puede ser un ID de una receta ya existente en la API spoonacular
  - Nombre *
  - Resumen del plato *
  - Puntuación
  - Nivel de "comida saludable"
  - Paso a paso
- [ ] Tipo de comida con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades debe ser de muchos a muchos ya que una receta puede ser parte de varios tipos de comida en simultaneo y, a su vez, un tipo de comida puede contener múltiples recetas distintas. Un ejemplo tomado de la API sería el `Strawberry Mango Green Tea Limeade` que es vegetariano, vegano y apto para celíacos, todo al mismo tiempo. Pero a su vez existen otras recetas para vegetarianos.

#### Backend

Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /recipes?name="..."__:
  - Obtener un listado de las primeras 9 recetas que contengan la palabra ingresada como query paraeter
  - Si no existe ningún país mostrar un mensaje adecuado
- [ ] __GET /recipes/{idReceta}__:
  - Obtener el detalle de una receta en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de receta
  - Incluir los tipos de comida asociados
- [ ] __GET /types__:
  - Obtener todos los tipos de comida posibles
  - En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular [acá](https://spoonacular.com/food-api/docs#Diets)
- [ ] __POST /recipe__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
  - Crea una receta en la base de datos


#### Testing
- [ ] Al menos tener un componente del frontend con sus tests respectivos
- [ ] Al menos tener una ruta del backend con sus tests respectivos
- [ ] Al menos tener un modelo de la base de datos con sus tests respectivos

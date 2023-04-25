# HENSP Backend Test

### Resumen

En esta prueba deberás realizar una REST API para un CRUD básico de medicamentos utilizando Node.js.

### Alcance

Se espera que te tomes aproximadamente 1 hora en realizar los requerimientos.

Tienes un máximo de **2 horas** para la prueba, por si quieres refactorizar o hacer los puntos extras.

### Información técnica

El diseño de la base de datos está a tu criterio, siguiendo las prácticas que conoces, únicamente **sí es requisito utilizar una base de datos relacional**, te recomendamos: MySQL/MariaDB o en su defecto SQLite.

Para la creación de la aplicación puedes utilizar el framework de Node.js que desees, te recomendamos: Express.js o Nest.js.

### Historias de Usuario (requerimientos)

- Como usuario del sistema, quiero obtener una lista de todos los medicamentos disponibles en el área de farmacia, para poder consultar el nombre, proveedor, costo y precio de venta de cada uno de ellos.

- Como usuario administrador del sistema, quiero agregar nuevos medicamentos al área de farmacia.

- Como usuario administrador del sistema, quiero editar la información de un medicamento del área de farmacia.

- Como usuario administrador del sistema, quiero eliminar un medicamento del área de farmacia.

### Entregable

Al finalizar la prueba, deberás hacer un Pull Request en el repositorio. Si tu username de Github no puede ser fácilmente reconocible, por favor coloca tu nombre en la descripción. 

Puedes agregar toda la información que consideres ideal para el PR.


### Puntos Extras

La siguiente lista de requerimientos únicamente incrementan tu puntaje, no pasa nada si no los haces.

- Utiliza _conventional commits_ para escribir tus mensajes en git.
- Crea un docker-compose para tu proyecto.
- Utiliza Typescript _(aplica si usas Express.js)_.
- Utiliza un ORM (Prisma, Knex o Sequelize) _(aplica si usas Express.js)_.
- Paginación de resultados en la lista de medicamentos.
- Filtro de búsqueda por nombre en lista de medicamentos _(doble punto si funciona con keywords)_.
- Documentación en Swagger.
- Validación de payloads en peticiones.

### Mega punto extra:
- Crea una estrategia de despliegue en producción. _(No necesitas ejecutar ni implementar, sólo queremos saber cómo lo harías :))_

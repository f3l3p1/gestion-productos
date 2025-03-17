Gestión de Productos
Este proyecto es una aplicación web desarrollada con Angular para la gestión de productos. Permite a los usuarios agregar, editar, eliminar y filtrar productos, además de administrar su estado.

Requisitos previos

Antes de instalar y ejecutar el proyecto, asegúrese de contar con las siguientes herramientas:

Node.js (v16 o superior) 

Angular CLI (v15 o superior) - Si no está instalado, ejecute el siguiente comando:


npm install -g @angular/cli

Git (para clonar el repositorio)

Instalación y configuración

1. Clonar el repositorio
Ejecute el siguiente comando en su terminal:
git clone https://github.com/tu-usuario/gestion-productos.git
cd gestion-productos

2. Instalar las dependencias del proyecto
npm install

3. Iniciar el servidor de desarrollo
Para ejecutar la aplicación en modo local:
ng serve

Luego, abra su navegador y acceda a:
http://localhost:4200/


Decisiones técnicas tomadas durante el desarrollo

Durante el desarrollo del proyecto se tomaron las siguientes decisiones técnicas:

Uso de Angular Standalone Components:
Se optó por componentes standalone en lugar de módulos tradicionales para simplificar la estructura y mejorar la eficiencia del código.

Gestión del estado con BehaviorSubject:
Se utilizó BehaviorSubject en ProductService para gestionar los productos en memoria y mantener una arquitectura reactiva.

Almacenamiento en localStorage:
Para persistir los datos sin necesidad de una base de datos externa, se empleó localStorage, permitiendo que los productos sean accesibles incluso tras cerrar y reabrir el navegador.

Filtros avanzados en la lista de productos:
Se implementó una búsqueda que filtra tanto por nombre como por descripción para mejorar la experiencia del usuario.

Edición en línea sin recarga de la página:
Se incluyó una opción de edición directa en la tabla, permitiendo modificar productos sin necesidad de abrir una nueva vista o recargar la página.

Estilización con TailwindCSS:
Se utilizó TailwindCSS para agilizar la implementación de estilos modernos y responsivos.

Rollback de GitHub Pages:
Inicialmente, se intentó desplegar en GitHub Pages, pero se decidió revertir la configuración para mantener el desarrollo local con ng serve.

Cómo contribuir
Si desea contribuir al proyecto, siga estos pasos:

Haga un fork del repositorio.
Cree una nueva rama con una descripción clara del cambio:


git checkout -b feature-nueva-funcionalidad
Realice sus modificaciones y haga un commit:

git commit -m "Agrega nueva funcionalidad X"
Envíe un pull request para revisión.

Licencia
Este proyecto está bajo la licencia MIT.

Contacto
Para consultas o sugerencias, puede contactar al desarrollador a través de GitHub.


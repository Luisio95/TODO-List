# Todo List App

Este proyecto es una aplicación de lista de tareas que consta de dos partes:

- **Backend:** Desarrollado con Express y Node.js.
- **Frontend:** Desarrollado con JavaScript puro (Vanilla JS), HTML, CSS.

## Estructura del Proyecto
todo-list-app/
│
├── backend/
| ├── routes/
|   |── auth.route.js
│ ├── package.json
│ └── index.html
│
└── frontend/
├── index.html
├── script.js
├── styles.css

## Requisitos

- [Node.js](https://nodejs.org/) (versión recomendada: 14.x o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- Un navegador web moderno

## Instalación y Ejecución

1. **Navega a la carpeta del backend:**

    ```bash
    cd todo-list-app/backend
    ```

2. **Instala las dependencias del backend:**

    ```bash
    npm install
    ```

3. **Configura el entorno (si es necesario):**

    Tiene que levantar en el puerto 5000
    Revisar cors en el archivo index.js que se encuentra en la raiz de la 
    carpeta backend (este pude ser necesario cambiarse dependiendo del dominio
    donde se renderiza el cliente)

4. **Inicia el servidor backend:**

    ```bash
    npm run dev
    ```

    El servidor backend se iniciará en `http://localhost:5000`.

### Frontend

1. **Navega a la carpeta del frontend:**

    ```bash
    cd todo-list-app/frontend
    ```

2. **Abre el archivo `index.html` en un navegador web:**

    En Visual Studio Code, abre el archivo index.html (o el archivo principal HTML) en la carpeta frontend.
    Haz clic derecho en el archivo y selecciona "Open with Live Server".
    Alternativamente, puedes hacer clic en el botón "Go Live" en la esquina inferior derecha de la barra de estado de Visual Studio Code.

3. **Interacción con el backend:**

    Asegúrate de que el backend esté en funcionamiento. El frontend se comunicará con el backend en `http://127.0.0.1:5500`.

## Uso

- **Frontend:** Puedes agregar, editar y eliminar tareas a través de la interfaz de usuario en el navegador. Las solicitudes se enviarán al backend a través de la API REST.
- **Backend:** Maneja las operaciones CRUD para las tareas y expone una API REST para interactuar con el frontend.

---

¡Gracias por usar este proyecto! 🚀

// scripts.js
const url = "http://localhost:5000/api";

// Función inicial que se ejecuta al cargar el documento
document.addEventListener("DOMContentLoaded", async () => {
  const tasks = await fetchTasks();
  renderTasksTable(tasks);
});
// Función inicial que se ejecuta al cargar el documento

// evento agregar tarea
document.addEventListener("DOMContentLoaded", () => {
  const saveTaskBtn = document.getElementById("saveTaskBtn");
  saveTaskBtn.addEventListener("click", async () => {
    await addTask();
  });
});
// evento agregar tarea

// evento editar tarea
document.addEventListener("DOMContentLoaded", () => {
  const saveEditBtn = document.getElementById("saveEditBtn");
  saveEditBtn.addEventListener("click", async () => {
    await updateTask();
  });
});
// evento editar tarea

// Función para obtener las tareas desde el API
const fetchTasks = async () => {
  try {
    const response = await fetch(`${url}/tasks`);
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Función para renderizar la tabla de tareas
const renderTasksTable = (tasks) => {
  const tasksContainer = document.getElementById("tasksContainer");
  if (!tasksContainer) return;

  if (tasks.length === 0) {
    tasksContainer.innerHTML =
      "<h4 class='text-center py-5'>No hay tareas</h4>";
    return;
  }

  const table = document.createElement("table");
  table.innerHTML = `
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Completada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${tasks
            .map(
              (task) => `
            <tr>
              <td>${task.id}</td>
              <td>${task.title}</td>
              <td>${task.description}</td>
              <td>${task.status}</td>
              <td>
              <div class="checkbox-container">
              <label class="checkbox-btn">
                    <label for="checkbox"></label>
                    <input id="checkbox-${task.id}" type="checkbox" ${
                task.status === "completada" ? "checked" : ""
              }>
                    <span class="checkmark"></span>
                </label>
              </div>
              </td>
              <td class="acciones">
                    <button class="btn-rounded btn-edit" data-task-id="${
                      task.id
                    }">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil"
                            viewBox="0 0 16 16"
                        >
                           <path
                              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
                            />
                        </svg>
                    </button>
                    <button class="btn-rounded btn-delete" data-task-id="${
                      task.id
                    }">
                      <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                            />
                          </svg>
                    </button>
                  </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      `;

  tasksContainer.innerHTML = "";
  tasksContainer.appendChild(table);

  // Agregar manejador de eventos a los botones de edición
  document.querySelectorAll(".btn-edit").forEach((button) => {
    button.addEventListener("click", (event) => {
      const taskId = event.target
        .closest("button")
        .getAttribute("data-task-id");
      handleEditButtonClick(taskId);
    });
  });

  // Agregar manejador de eventos a los botones de eliminar
  document.querySelectorAll(".btn-delete").forEach((button) => {
    button.addEventListener("click", (event) => {
      const taskId = event.target
        .closest("button")
        .getAttribute("data-task-id");
      deleteTask(taskId);
    });
  });

  // Agregar manejador de eventos a los checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const taskId = event.target.id.replace("checkbox-", "");
      const isChecked = event.target.checked;
      handleCheckboxChange(taskId, isChecked);
    });
  });
};

// funcion agregar tarea
const addTask = async () => {
  // Capturar datos del formulario
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;

  if (!title || !description) {
    Toastify({
      text: "Por favor, completa todos los campos.",
      duration: 3000,
      style: {
        background: "red",
      },
    }).showToast();
    return;
  }
  // Crear objeto de la tarea
  const newTask = {
    title: title,
    description: description,
    status: "pendiente",
  };

  try {
    // Enviar solicitud POST
    const response = await fetch(`${url}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    // Limpia los campos del formulario
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";

    // Cierra el modal
    const closeModal = document.getElementById("closeModal");
    closeModal.click();

    // Notificar éxito
    Toastify({
      text: "Tarea agregada exitosamente.",
      duration: 3000,
      style: {
        background: "green",
      },
    }).showToast();

    // Actualizar
    const tasks = await fetchTasks();
    renderTasksTable(tasks);
  } catch (error) {
    console.error("Error al agregar la tarea:", error);
    Toastify({
      text: "Error al agregar la tarea.",
      duration: 3000,
      style: {
        background: "red",
      },
    }).showToast();
  }
};
// funcion agregar tarea

// funcion que setea id de task y abre modal para edicion
const handleEditButtonClick = async (taskId) => {
  try {
    // Fetch all tasks
    const response = await fetch(`${url}/tasks`);
    const tasks = await response.json();
    console.log(tasks);

    // Find the task with the matching ID
    const task = tasks.find((t) => t.id === parseInt(taskId, 10));

    if (task) {
      // Set the values in the modal
      document.getElementById("editTaskTitle").value = task.title;
      document.getElementById("editTaskDescription").value = task.description;
      document.getElementById("editTaskId").value = task.id;

      // Show the modal
      const myModal = new bootstrap.Modal(
        document.getElementById("exampleModalEditar")
      );
      myModal.show();
    } else {
      console.error("Tarea no encontrada.");
      alert("Tarea no encontrada.");
    }
  } catch (error) {
    console.error("Error al cargar la tarea:", error);
    Toastify({
      text: "Error al cargar la tarea.",
      duration: 3000,
      style: {
        background: "red",
      },
    }).showToast();
  }
};
// funcion que setea id de task y abre modal para edicion

// funcion editar tarea
const updateTask = async () => {
  // Capturar datos del formulario
  const title = document.getElementById("editTaskTitle").value;
  const description = document.getElementById("editTaskDescription").value;

  if (!title || !description) {
    Toastify({
      text: "Por favor, completa todos los campos.",
      duration: 3000,
      style: {
        background: "red",
      },
    }).showToast();
    return;
  }
  // Crear objeto de la tarea
  const newTask = {
    title: title,
    description: description,
    status: "pendiente",
  };

  try {
    // Enviar solicitud PUT
    const idTask = document.getElementById("editTaskId").value;
    const response = await fetch(`${url}/tasks/${idTask}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    // Limpia los campos del formulario
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";

    // Cierra el modal
    const closeModal = document.getElementById("closeModalEdit");
    closeModal.click();

    // Notificar éxito
    Toastify({
      text: "Tarea actualizada exitosamente.",
      duration: 3000,
      style: {
        background: "green",
      },
    }).showToast();

    const tasks = await fetchTasks();
    renderTasksTable(tasks);
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    alert("Error al actualizar la tarea.");
  }
};
// funcion editar tarea

// funcion para elimiar tarea
const deleteTask = async (idTask) => {
  console.log(idTask);
  try {
    // Enviar solicitud DELETE
    const response = await fetch(`${url}/tasks/${idTask}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    // Notificar éxito
    Toastify({
      text: "Tarea eliminada exitosamente.",
      duration: 3000,
      style: {
        background: "green",
      },
    }).showToast();

    const tasks = await fetchTasks();
    renderTasksTable(tasks);
  } catch (error) {
    console.error("Error al eliminada la tarea:", error);
    alert("Error al eliminada la tarea.");
  }
};
// funcion para elimiar tarea

// Funcion para completar tarea
const handleCheckboxChange = async (taskId, isChecked) => {
  console.log("ID de la tarea:", taskId);
  console.log("Estado del checkbox:", isChecked);

  try {
    // Enviar una solicitud PATCH para actualizar solo el estado de la tarea
    const response = await fetch(`${url}/tasks/${taskId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: isChecked ? "completada" : "pendiente" }),
    });

    if (response.ok) {
      Toastify({
        text: "Tarea actualizada con éxito",
        duration: 3000,
        style: {
          background: "green",
        },
      }).showToast();
      const tasks = await fetchTasks();
      renderTasksTable(tasks);
    } else {
      console.error("Error al actualizar la tarea:", response.statusText);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};
// Funcion para completar tarea

import express from 'express';
const router = express.Router();

let tasks = []; // Arreglo en memoria para almacenar las tareas

// Obtener todas las tareas
router.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Crear una nueva tarea
router.post('/tasks', (req, res) => {
    const { title, description, status } = req.body;
    if (title && description !== undefined && status !== undefined) {
        // Genera un nuevo ID
        const id = tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
        const newTask = { id, title, description, status };
        tasks.push(newTask);
        res.status(200).json(newTask);
    } else {
        res.status(400).json({ message: 'Invalid task data' });
    }
});

// Actualizar una tarea existente
router.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, status } = req.body;
    let task = tasks.find(t => t.id === id);
    if (task) {
        task.title = title !== undefined ? title : task.title;
        task.description = description !== undefined ? description : task.description;
        task.status = status !== undefined ? status : task.status;
        res.json(task);
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

// Actualizar solo el estado de una tarea existente
router.patch('/tasks/:id/status', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    // Asegurarse de que el estado se ha proporcionado y es válido
    if (status === undefined || !['pendiente', 'completada'].includes(status)) {
        return res.status(400).send('Estado inválido');
    }
    
    let task = tasks.find(t => t.id === id);
    if (task) {
        task.status = status;
        res.json(task);
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});


// Eliminar una tarea
router.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Verifica si la tarea con el ID proporcionado existe
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex !== -1) {
        // Elimina la tarea del arreglo
        tasks.splice(taskIndex, 1);
        res.status(204).send('Tarea eliminada'); // Código 204: No Content
    } else {
        res.status(404).json({ message: 'Tarea no encontrada' }); // Código 404: Not Found
    }
});


export default router;

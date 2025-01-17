document.getElementById('addTaskForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const userId = 1; // Replace with the actual user ID from session or JWT
    const task = document.getElementById('taskInput').value;

    try {
        const response = await fetch('add_task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ user_id: userId, task }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            // Optionally, refresh task list
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
async function loadTasks(userId) {
    try {
        const response = await fetch(get_tasks.php?user_id=$:{userId});
        const tasks = await response.json();
        // Display tasks in your UI
        console.log(tasks);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call loadTasks with actual user ID when needed
loadTasks(1); // Replace with actual user ID
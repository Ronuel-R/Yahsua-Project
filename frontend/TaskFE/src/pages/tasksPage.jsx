import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Box,
  CardActions,
  CircularProgress,
} from "@mui/material";
import AddTask from "./AddTask";
import axiosInstance from "../components/axios";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true); // start loading
      try {
        const response = await axiosInstance.get("/tasks/");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false); // stop loading
      }
    };
    fetchTasks();
  }, [updated]);

  const toggleCompleted = async (task) => {
    setLoading(true);
    try {
      const newCompletedStatus = !task.completed;
      await axiosInstance.patch(`/tasks/${task.id}/`, {
        completed: newCompletedStatus,
      });
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, completed: newCompletedStatus } : t
        )
      );
    } catch (error) {
      console.error("Error toggling completed:", error);
    } finally {
      setLoading(false);
      setUpdated((prev) => !prev);
    }
  };

  const handleAddTask = async ({ title, description, id }) => {
    setLoading(true);
    try {
      if (id) {
        const updatedTask = { title, description };
        await axiosInstance.put(`/tasks/${id}/`, updatedTask);
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, title, description } : task
          )
        );
      } else {
        const response = await axiosInstance.post("/tasks/", { title, description });
        setTasks((prev) => [response.data, ...prev]);
      }
    } catch (error) {
      console.error("Error adding/updating task:", error);
    } finally {
      setLoading(false);
      setUpdated((prev) => !prev);
    }
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/tasks/${id}/`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoading(false);
      setUpdated((prev) => !prev);
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setOpen(true);
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        width: "208.7vh",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ color: "#333" }}>My Tasks</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => { setTaskToEdit(null); setOpen(true); }}
        >
          Add Task
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
              <Card elevation={3} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>{task.title}</Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {task.description || "No description"}
                  </Typography>
                  <Chip
                    label={task.completed ? "Completed" : "Pending"}
                    color={task.completed ? "success" : "warning"}
                    size="small"
                    style={{ marginTop: "0.5rem" }}
                  />
                  <Typography variant="caption" color="textSecondary" display="block" style={{ marginTop: "0.5rem" }}>
                    Created: {new Date(task.created_at).toLocaleString()}
                  </Typography>
                </CardContent>

                <CardActions style={{ justifyContent: "flex-end" }}>
                  <Button
                    size="small"
                    color={task.completed ? "warning" : "success"}
                    variant="outlined"
                    onClick={() => toggleCompleted(task)}
                  >
                    {task.completed ? "Mark as Pending" : "Mark as Completed"}
                  </Button>
                  <Button size="small" color="primary" variant="outlined" onClick={() => handleEditTask(task)}>
                    Edit
                  </Button>
                  <Button size="small" color="error" variant="outlined" onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Task Modal */}
      <AddTask
        open={open}
        onClose={() => setOpen(false)}
        onAdd={handleAddTask}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}
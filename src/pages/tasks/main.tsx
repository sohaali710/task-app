import { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Edit, Delete, CheckCircle } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../../api/tasks";
import theme from "../../theme";
import { AuthContext } from "../../auth/context/auth.context";
import { useNavigate } from "react-router-dom";

const taskSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(3, "Description is required"),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  completed: z.boolean().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;
type Task = TaskFormData & { _id: string };

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const fetchTasks = async () => {
    const response = await getAllTasks();
    setTasks(response);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onSubmit = async (data: TaskFormData) => {
    const payload = {
      ...data,
      dueDate: new Date(data.dueDate),
    };

    if (editTask) {
      await updateTask(editTask._id, payload);
    } else {
      await createTask(payload);
    }

    setOpen(false);
    reset();
    setEditTask(null);
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  const toggleCompleted = async (task: Task) => {
    await updateTask(task._id, { ...task, completed: !task.completed });
    fetchTasks();
  };

  const { logout } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        mt: 5,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          marginBottom: "1.5rem",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Task Manager
        </Typography>

        <Button
          onClick={() => {
            reset({
              title: "",
              description: "",
              dueDate: "",
            });
            setEditTask(null);
            setOpen(true);
          }}
          variant="contained"
          color="primary"
          sx={{ my: 3 }}
        >
          Create Task
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{task.completed ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setEditTask(task);
                        setOpen(true);
                        reset({
                          title: task.title,
                          description: task.description,
                          dueDate: task.dueDate.split("T")[0],
                          completed: task.completed,
                        });
                      }}
                      sx={{
                        color: theme.palette.warning.main,
                        "&:focus": { outline: "none" },
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(task._id)}
                      sx={{
                        color: theme.palette.error.main,
                        "&:focus": { outline: "none" },
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      onClick={() => toggleCompleted(task)}
                      sx={{
                        color: task.completed ? "#388e3c" : "#9e9e9e",
                        "&:focus": { outline: "none" },
                      }}
                    >
                      <CheckCircle />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div
        style={{
          gap: "1rem",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          sx={{ mx: 3 }}
          onClick={() => navigate("/profile")}
        >
          Profile
        </Button>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editTask ? "Edit Task" : "Create Task"}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <TextField
              type="date"
              fullWidth
              margin="normal"
              {...register("dueDate")}
              error={!!errors.dueDate}
              helperText={errors.dueDate?.message}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color={editTask ? "warning" : "primary"}
              onClick={() => {
                setOpen(false);
                setEditTask(null);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color={editTask ? "warning" : "primary"}
            >
              {editTask ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default TaskPage;

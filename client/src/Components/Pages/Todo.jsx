import React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useContext, useState } from "react";
import { TodosContext } from "../Contexts/todosContext";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Todo({ todo }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({ title: todo.title, details: todo.details});

  const { todos, setTodos } = useContext(TodosContext);


  function handleCheckClick() {
    const UpdatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(UpdatedTodos);
     localStorage.setItem("todos", JSON.stringify(UpdatedTodos));
  }
  // Event Handles
  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleDeleteConfirm() {
    const UpdatedTodos = todos.filter((t) => {
      if (t.id == todo.id) {
        // Ca Veut dire Ne retourner pas false
        return false;
      } else {
        return true;
      }
    });
    setTodos(UpdatedTodos);
     localStorage.setItem("todos", JSON.stringify(UpdatedTodos));
  }

  function handleUpdateConfirm() {
    const UpdatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          details: updatedTodo.details,
    };  
      } else {
        return t;
      }
    });
    setTodos(UpdatedTodos);
    setShowUpdateDialog(false);
     localStorage.setItem("todos", JSON.stringify(UpdatedTodos));
  }

  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }
  return (
    <>
      {/* Delete Modal */}
      <Dialog
        
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Hy Guys</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Fermer</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Modal */}
      {/* Update Dialog */}
      <Dialog
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Modifier To do </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Title"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Description"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Fermer</Button>
          <Button onClick={handleUpdateConfirm} autoFocus>
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update Dialog */}
      <Card
        className="todo-card"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              size={6}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Check Icon Button 1*/}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* Check Icon Button */}

              {/* 2 */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/* 3 */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid size={6}>
              <Typography variant="h5" sx={{ textAlign: "left" ,textDecoration:todo.isCompleted?"line-through":"none"}}>
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;

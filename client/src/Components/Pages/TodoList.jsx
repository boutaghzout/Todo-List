import * as React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { TodosContext } from "../Contexts/todosContext";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Todo from "./Todo";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayTodosType] = useState("all");
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;
  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRendered =notCompletedTodos;
  } else {
    todosToBeRendered == todos;
  }

  const todosJSX = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    console.log("hello");
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos);
  }, []);
  function changeDisplayedType(e) {
    setDisplayTodosType(e.target.value);
  }

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  return (
    <Container style={{ marginTop: "20px" }} maxWidth="sm">
      <Card
        style={{ maxHeight: "80vh", overflow: "scroll", direction: "ltr" }}
        sx={{ minWidth: 275 }}
      >
        <CardContent>
          <Typography style={{ fontWeight: "bold" }} variant="h2">
            Todo List
          </Typography>

          <Divider />
          {/* Toggle Button */}
          <ToggleButtonGroup
            style={{ marginTop: "20px", direction: "ltr" }}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
            value={displayedTodosType}
          >
            <ToggleButton value="all">Tous</ToggleButton>
            <ToggleButton value="completed">Fait</ToggleButton>
            <ToggleButton value="non-completed">Non Fait</ToggleButton>
          </ToggleButtonGroup>
          {/* Fin */}
          {/* All Todos */}
          {/* <Todo /> */}
          {todosJSX}

          {/* FIN */}

          {/* Grid Debut */}

          <Grid container style={{ marginTop: "10px" }} spacing={2}>
            <Grid
              size={6}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.length==0}
              >
                Add
              </Button>
            </Grid>
            <Grid
              size={6}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Write Todo"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          {/* grid fin */}
        </CardContent>
        
      </Card>
    </Container>
  );
}

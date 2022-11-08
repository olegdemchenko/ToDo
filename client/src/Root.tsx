import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { Task } from '../../src/modules/tasks/interfaces/task.interface';
import DescriptionInput from './DescriptionInput';
import Header from './Header';
import TasksList from './TasksList';

const initialState = {
  tasks: [],
  error: null,
};

type ACTIONTYPE =
  | {
      type: 'TASKS/ALLFETCHED';
      payload: Task[];
    }
  | {
      type: 'TASKS/DELETED';
      payload: string;
    }
  | {
      type: 'TASKS/ADDED';
      payload: Task;
    }
  | {
      type: 'TASKS/STATUSCHANGED';
      payload: Task;
    }
  | {
      type: 'ERROR';
      payload: Response;
    };

function reducer(
  state: { tasks: Task[]; error: null | Error },
  action: ACTIONTYPE,
) {
  switch (action.type) {
    case 'TASKS/ALLFETCHED':
      return { tasks: action.payload, error: null };
    case 'TASKS/ADDED': {
      return { tasks: [...state.tasks, action.payload], error: null };
    }
    case 'TASKS/STATUSCHANGED': {
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
        error: null,
      };
    }
    case 'ERROR':
      return {
        tasks: state.tasks,
        error: new Error(
          `Error with status ${action.payload.status}, ${action.payload.statusText}. Url ${action.payload.url}`,
        ),
      };
    default:
      throw new Error(`reducer action type is not defined`);
  }
}

function Root() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchAllTasks() {
      if (state.error) {
        return;
      }
      const resp = await fetch('http://127.0.0.1:5000');
      if (resp.ok) {
        const tasks = await resp.json();
        dispatch({ type: 'TASKS/ALLFETCHED', payload: tasks });
      } else {
        dispatch({ type: 'ERROR', payload: resp });
      }
    }
    fetchAllTasks();
  }, []);

  const navigate = useNavigate();

  function handleChange(id: string) {
    navigate(`/tasks/${id}`);
  }

  async function handleDelete(id: string) {
    const resp = await fetch(`http://127.0.0.1:5000/${id}`, {
      method: 'DELETE',
    });
    if (resp.ok) {
      const tasks = await resp.json();
      dispatch({ type: 'TASKS/ALLFETCHED', payload: tasks });
    } else {
      dispatch({ type: 'ERROR', payload: resp });
    }
  }

  async function handleAdd(description: string) {
    const resp = await fetch('http://127.0.0.1:5000', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ description, active: true }),
    });
    if (resp.ok) {
      const newTask = await resp.json();
      dispatch({ type: 'TASKS/ADDED', payload: newTask });
    } else {
      dispatch({ type: 'ERROR', payload: resp });
    }
  }

  async function handleStatusChange(task: Task) {
    const resp = await fetch(`http://127.0.0.1:5000/${task.id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify({ ...task, active: !task.active }),
    });
    if (resp.ok) {
      const changedTask = await resp.json();
      dispatch({ type: 'TASKS/STATUSCHANGED', payload: changedTask });
    } else {
      dispatch({ type: 'ERROR', payload: resp });
    }
  }

  if (state.error) {
    return (
      <Container>
        <Header />
        <Alert variant="danger">{state.error.message}</Alert>
      </Container>
    );
  }
  return (
    <Container>
      <Header />
      <DescriptionInput handleAddTask={handleAdd} />
      <TasksList
        tasks={state.tasks}
        changeClb={handleChange}
        deleteClb={handleDelete}
        activateClb={handleStatusChange}
      />
    </Container>
  );
}

export default Root;

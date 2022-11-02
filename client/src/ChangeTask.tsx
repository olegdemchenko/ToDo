import React, { useEffect, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import GoBack from './GoBack';
import DescriptionInput from './DescriptionInput';
import { Task } from '../../src/modules/tasks/interfaces/task.interface';

const initialState = {
  task: null,
  error: null,
};

type ACTIOTYPE =
  | {
      type: 'TASKS/FETCHED';
      payload: Task;
    }
  | { type: 'ERROR'; payload: Response };

type StateType = { task: Task | null; error: Error | null };
function reducer(state: StateType, action: ACTIOTYPE): StateType {
  switch (action.type) {
    case 'TASKS/FETCHED':
      return { task: action.payload, error: null };
    case 'ERROR':
      return {
        task: null,
        error: new Error(
          `Error with status ${action.payload.status}, ${action.payload.statusText}. Url ${action.payload.url}`,
        ),
      };
    default:
      throw new Error(`reducer action type is not defined`);
  }
}

function ChangeTask() {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchTask() {
      const resp = await fetch(`http://127.0.0.1:5000/${id}`);
      if (resp.ok) {
        const task = await resp.json();
        dispatch({ type: 'TASKS/FETCHED', payload: task });
      } else {
        dispatch({ type: 'ERROR', payload: resp });
      }
    }
    fetchTask();
  }, [id]);

  const navigate = useNavigate();

  async function handleChangeTask(description: string) {
    const resp = await fetch(`http://127.0.0.1:5000/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify({ id, description, active: state.task?.active }),
    });
    if (resp.ok) {
      navigate('/');
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
      <GoBack />
      <DescriptionInput
        key={state.task?.id}
        initDescription={state.task?.description}
        handleAddTask={handleChangeTask}
      />
    </Container>
  );
}

export default ChangeTask;

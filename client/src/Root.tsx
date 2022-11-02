import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { Task } from '../../src/modules/tasks/interfaces/task.interface';
import DescriptionInput from './DescriptionInput';
import Header from './Header';
import TasksList from './TasksList';
import { response } from 'express';

function Root() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [state, setState] = useState('idle');
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    async function fetchAllTasks() {
      const resp = await fetch('http://127.0.0.1:5000');
      if (resp.ok) {
        const json = await resp.json();
        setState('tasksFetched');
        setTasks(json);
        setError(null);
      } else {
        setState('error');
        setError(new Error(`Error with status ${response.status}`));
      }
    }
    fetchAllTasks();
  }, [state]);

  const navigate = useNavigate();

  function handleChange(id: string) {
    navigate(`/tasks/${id}`);
  }

  async function handleDelete(id: string) {
    const resp = await fetch(`http://127.0.0.1:5000/${id}`, {
      method: 'DELETE',
    });
    if (resp.ok) {
      setState('taskDeleted');
      setError(null);
    } else {
      setState('error');
      setError(new Error(`Error with status ${response.status}`));
    }
  }

  async function handleAdd(description: string) {
    const resp = await fetch('http://127.0.0.1:5000', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ description }),
    });
    if (resp.ok) {
      setState('taskAdded');
      setError(null);
    } else {
      setState('error');
      setError(new Error(`Error with status ${response.status}`));
    }
  }

  async function handleStatusChange(task: Task) {
    const resp = await fetch(`http://127.0.0.1:5000/${task.id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify({ ...task, active: !task.active }),
    });
    if (resp.ok) {
      setState('taskStatusChanged');
      setError(null);
    } else {
      setState('error');
      setError(new Error(`Error with status ${response.status}`));
    }
  }

  if (error) {
    return (
      <Container>
        <Header />
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }
  return (
    <Container>
      <Header />
      <DescriptionInput handleAddTask={handleAdd} />
      <TasksList
        tasks={tasks}
        changeClb={handleChange}
        deleteClb={handleDelete}
        activateClb={handleStatusChange}
      />
    </Container>
  );
}

export default Root;

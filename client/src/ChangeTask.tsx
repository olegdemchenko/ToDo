import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import GoBack from './GoBack';
import DescriptionInput from './DescriptionInput';
import { Task } from '../../src/modules/tasks/interfaces/task.interface';

function ChangeTask() {
  const { id } = useParams();
  const [error, setError] = useState<null | Error>(null);
  const [task, setTask] = useState<Task | null>(null);
  useEffect(() => {
    async function fetchTask() {
      const resp = await fetch(`http://127.0.0.1:5000/${id}`);
      if (resp.ok) {
        const json = await resp.json();
        setTask(json);
        setError(null);
      } else {
        setError(new Error(`Error with status ${resp.status}`));
      }
    }
    fetchTask();
  }, [id]);

  const navigate = useNavigate();

  async function handleChangeTask(description: string) {
    const resp = await fetch(`http://127.0.0.1:5000/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify({ id, description }),
    });
    if (resp.ok) {
      navigate('/');
      setError(null);
    } else {
      setError(new Error(`Error with status ${resp.status}`));
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
      <GoBack />
      <DescriptionInput
        key={task?.id}
        initDescription={task?.description}
        handleAddTask={handleChangeTask}
      />
    </Container>
  );
}

export default ChangeTask;

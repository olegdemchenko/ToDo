import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Task } from '../../src/modules/tasks/interfaces/task.interface';

interface TaskItemProps {
  taskNumber: number;
  task: Task;
  changeClb: (id: string) => void;
  deleteClb: (id: string) => void;
}

function TaskItem({ task, taskNumber, changeClb, deleteClb }: TaskItemProps) {
  const handleChange = () => changeClb(task.id);
  const handleDelete = () => deleteClb(task.id);

  return (
    <Col>
      <Card bg="Primary" text="dark" className="mb-2">
        <Card.Header>Task {taskNumber}</Card.Header>
        <Card.Body>
          <Card.Title>{task.description} </Card.Title>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="outline-info"
            className="me-4"
            onClick={handleChange}
          >
            Change
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default TaskItem;

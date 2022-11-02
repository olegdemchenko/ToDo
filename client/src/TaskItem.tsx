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
  activateClb: (task: Task) => void;
}

function TaskItem({
  task,
  taskNumber,
  changeClb,
  deleteClb,
  activateClb,
}: TaskItemProps) {
  const handleChange = () => changeClb(task.id);
  const handleDelete = () => deleteClb(task.id);
  const handleActivate = () => activateClb(task);

  return (
    <Col>
      <Card bg="Primary" text="dark" className="mb-2">
        <Card.Header>Task {taskNumber}</Card.Header>
        <Card.Body>
          <Card.Title
            className={task.active ? '' : 'text-decoration-line-through'}
          >
            {task.description}
          </Card.Title>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="outline-info"
            className="me-4"
            onClick={handleChange}
          >
            Change
          </Button>
          <Button
            variant={task.active ? 'outline-warning' : 'outline-success'}
            className="me-4"
            onClick={handleActivate}
          >
            {task.active ? 'Inactivate' : 'Activate'}
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

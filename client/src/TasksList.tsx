import React from 'react';
import Row from 'react-bootstrap/Row';
import { Task } from '../../src/modules/tasks/interfaces/task.interface';
import TaskItem from './TaskItem';

interface TasksListProps {
  tasks: Task[];
  changeClb: (id: string) => void;
  deleteClb: (id: string) => void;
}

function TasksList({ tasks, changeClb, deleteClb }: TasksListProps) {
  return (
    <Row xs="2" sm="3" className="py-4">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          taskNumber={index + 1}
          task={task}
          changeClb={changeClb}
          deleteClb={deleteClb}
        />
      ))}
    </Row>
  );
}

export default TasksList;

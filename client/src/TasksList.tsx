import React from 'react';
import Row from 'react-bootstrap/Row';
import { Task } from '../../src/modules/tasks/interfaces/task.interface';
import TaskItem from './TaskItem';

interface TasksListProps {
  tasks: Task[];
  changeClb: (id: string) => void;
  deleteClb: (id: string) => void;
  activateClb: (task: Task) => void;
}

function TasksList({
  tasks,
  changeClb,
  deleteClb,
  activateClb,
}: TasksListProps) {
  return (
    <div>
      <h4 className="m-0 p-4 text-center">Active tasks</h4>
      <Row xs="2" sm="3" className="pb-4">
        {tasks
          .filter(({ active }) => active)
          .map((task, index) => (
            <TaskItem
              key={task.id}
              taskNumber={index + 1}
              task={task}
              changeClb={changeClb}
              deleteClb={deleteClb}
              activateClb={activateClb}
            />
          ))}
      </Row>
      <h4 className="m-0 p-4 text-center">Inactive tasks</h4>
      <Row xs="2" sm="3" className="pb-4">
        {tasks
          .filter(({ active }) => !active)
          .map((task, index) => (
            <TaskItem
              key={task.id}
              taskNumber={index + 1}
              task={task}
              changeClb={changeClb}
              deleteClb={deleteClb}
              activateClb={activateClb}
            />
          ))}
      </Row>
    </div>
  );
}

export default TasksList;

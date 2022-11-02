import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

interface DescriptionInputProps {
  initDescription?: string;
  handleAddTask: (description: string) => void;
}

function DescriptionInput({
  handleAddTask,
  initDescription = '',
}: DescriptionInputProps) {
  const [currentDescription, setDescription] = useState(initDescription);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ): void => {
    setDescription(e.currentTarget.value);
  };

  const handleClick = () => {
    if (!currentDescription) {
      return;
    }
    handleAddTask(currentDescription);
    setDescription('');
  };

  return (
    <Row>
      <Col>
        <Row>
          <Col xs="10">
            <FloatingLabel label={initDescription || 'Task Description'}>
              <Form.Control
                placeholder={initDescription || 'Task Description'}
                value={currentDescription}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>
          <Col xs="2">
            <Button
              className="w-100 h-100"
              variant="outline-primary"
              onClick={handleClick}
            >
              Add Task
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default DescriptionInput;

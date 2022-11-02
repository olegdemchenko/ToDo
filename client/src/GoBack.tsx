import React from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

function GoBack() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/');
  return (
    <Row className="p-4">
      <Col>
        <Button variant="primary" onClick={handleClick}>
          Go Back
        </Button>
      </Col>
    </Row>
  );
}

export default GoBack;

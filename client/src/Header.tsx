import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Header() {
  return (
    <Row>
      <Col>
        <h2 className="text-center m-0 py-4">Todo List</h2>
      </Col>
    </Row>
  );
}

export default Header;

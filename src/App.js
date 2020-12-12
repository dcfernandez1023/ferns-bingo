import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

import BingoContainer from './components/BingoContainer.js';

function App() {
  return (
    <body style = {{backgroundColor: "#E9F7EF"}}>
      <Container>
        <Row>
          <Col>
            <BingoContainer />
          </Col>
        </Row>
      </Container>
    </body>
  );
}

export default App;

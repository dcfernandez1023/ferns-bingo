import React, { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const BingoModel = require('../models/bingoModel.js');

function BingoCard(props) {

  const[grid, setGrid] = useState();

  useEffect(() => {
    setGrid(props.grid);
  }, [props.grid])

  const gridStyle = {textAlign: "center", padding: "1%", border: "1px solid gray"};
  const gridHeaderStyle = {backgroundColor: "#D4E6F1", textAlign: "center", padding: "1%", border: "1px solid gray"};
  const cardStyle = {margin: "2%"};

  if(grid === undefined) {
    return <div></div>
  }
  return (
    <Row style = {cardStyle}>
      <Col>
        <Row>
          {BingoModel.headers.map((header) => {
            return (
              <Col style = {gridHeaderStyle} >
                <b style = {{color: header.color}}> {header.value} </b>
              </Col>
            );
          })}
        </Row>
        {Object.keys(grid).map((row) => {
          return (
            <Row>
              {grid[row].map((col) => {
                if(col == 0) {
                  return (
                    <Col action as = {ListGroup.Item} style = {gridStyle} >
                      FREE
                    </Col>
                  );
                }
                return (
                  <Col action as = {ListGroup.Item} style = {gridStyle}>
                    <b> {col} </b>
                  </Col>
                );
              })}
            </Row>
          );
        })}
        <Row style = {{marginTop: "2%", float: "right"}}>
          <Col>
            <Button variant = "outline-dark" size = "sm">
              🧽
            </Button>
            <Button variant = "outline-dark" size = "sm">
              🗑️
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default BingoCard;

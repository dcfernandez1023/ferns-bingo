import React, { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const BingoModel = require('../models/bingoModel.js');
const BingoController = require('../controllers/bingoController.js');

function BingoCard(props) {

  const[card, setCard] = useState();
  const[selected, setSelected] = useState();

  useEffect(() => {
    setCard(props.card);
    setSelected(props.selected);
  }, [props.card, props.selected])

  const gridStyle = {textAlign: "center", padding: "1%", border: "1px solid gray"};
  const gridHeaderStyle = {backgroundColor: "#D4E6F1", textAlign: "center", padding: "1%", border: "1px solid gray"};
  const cardStyle = {margin: "2%"};

  if(card === undefined || selected === undefined) {
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
        {Object.keys(card.grid).map((row) => {
          return (
            <Row>
              {card.grid[row].map((col) => {
                if(col == 0) {
                  return (
                    <Col as = {ListGroup.Item} style = {gridStyle}>
                      FREE
                    </Col>
                  );
                }
                return (
                  <Col action as = {ListGroup.Item} style = {gridStyle} variant = {selected[row][col] === 1 ? "warning" : ""}
                    onClick = {() => {props.selectBox(props.card.id, row, col)}}
                  >
                    <b> {col} </b>
                  </Col>
                );
              })}
            </Row>
          );
        })}
        <Row style = {{marginTop: "2%", float: "right"}}>
          <Col>
            <Button variant = "outline-dark" size = "sm" style = {{marginLeft: "75%"}}
              onClick = {() => {
                props.setResetShow(true);
                props.setResetId(card.id);
              }}
            >
              🧹
            </Button>
          </Col>
          <Col>
            <Button variant = "outline-dark" size = "sm" style = {{marginLeft: "25%"}}
              onClick = {() => {
                props.setDeleteShow(true);
                props.setDeleteId(card.id);
              }}
            >
              🗑️
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default BingoCard;

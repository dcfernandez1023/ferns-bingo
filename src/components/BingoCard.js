import React, { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const BingoModel = require('../models/bingoModel.js');
const BingoController = require('../controllers/bingoController.js');

function BingoCard(props) {

  const[card, setCard] = useState();
  const[selected, setSelected] = useState();

  useEffect(() => {
    setCard(props.card);
    if(props.selected === undefined) {
      setSelected([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]);
    }
    else {
      setSelected(props.selected);
    }
  }, [props.card, props.selected])

  const gridStyle = {textAlign: "center", padding: "1%", border: "1px solid gray"};
  const gridHeaderStyle = {backgroundColor: "#D4E6F1", textAlign: "center", padding: "1%", border: "1px solid gray"};
  const cardStyle = {margin: "2%"};

  if(card === undefined) {
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
            <OverlayTrigger
              key = {"reset" + card.id}
              placement = "bottom"
              overlay = {
                <Tooltip id = {"tooltip-reset" + card.id}>
                  <strong> Reset </strong> Card
                </Tooltip>
              }
            >
              <Button variant = "light" style = {{backgroundColor: "#D4E6F1", marginLeft: "60%"}}
                onClick = {() => {
                  props.setResetShow(true);
                  props.setResetId(card.id);
                }}
              >
                🧹
              </Button>
            </OverlayTrigger>
          </Col>
          <Col>
            <OverlayTrigger
              key = {"delete" + card.id}
              placement = "bottom"
              overlay = {
                <Tooltip id = {"tooltip-delete" + card.id}>
                  <strong> Delete </strong> Card
                </Tooltip>
              }
            >
              <Button variant = "light" style = {{backgroundColor: "#D4E6F1", marginLeft: "25%"}}
                onClick = {() => {
                  props.setDeleteShow(true);
                  props.setDeleteId(card.id);
                }}
              >
                🗑️
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default BingoCard;

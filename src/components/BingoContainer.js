import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import BingoCard from './BingoCard.js';
const BingoController = require('../controllers/bingoController.js');

const localStorageHelper = require('../controllers/localStorageHelper.js');

function BingoContainer() {

  const[cards, setCards] = useState([]);
  const[metaData, setMetaData] = useState({});
  const[show, setShow] = useState(false);

  useEffect(() => {
    localStorageHelper.initializeStorage();
    setCards(localStorageHelper.getCards());
    setMetaData(localStorageHelper.getMetaData());
  }, []);

  function createCardCallback(newCard) {
    //update cards
    var newCards = [];
    for(var i = 0; i < cards.length; i++) {
      var card = JSON.parse(JSON.stringify(cards[i]));
      newCards.push(card);
    }
    var copy = JSON.parse(JSON.stringify(newCard));
    newCards.push(copy);
    //update metaData
    var newMetaData = JSON.parse(JSON.stringify(metaData));
    newMetaData[newCard.id] = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];
    //set & save to local storage
    setCards(newCards);
    setMetaData(newMetaData);
    localStorageHelper.updateCards(newCards);
    localStorageHelper.updateMetaData(newMetaData);
  }

  function createCardCallbackOnError(error) {
    //TODO: handle errors more elegantly
    alert(error);
  }

  function selectBox(id, row, col) {
    var newMetaData = JSON.parse(JSON.stringify(metaData));
    if(newMetaData[id][row][col] === 1) {
      newMetaData[id][row][col] = 0;
    }
    else {
      newMetaData[id][row][col] = 1;
    }

    setMetaData(newMetaData);
    localStorageHelper.updateMetaData(newMetaData);
  }

  return (
    <Container fluid>
      <Modal
        size = "sm"
        show = {show}
        onHide = {() => {setShow(false)}}
      >
        <Modal.Header closeButton> </Modal.Header>
        <Modal.Body> Cannot add a new bingo card. The maximum limit is 4. </Modal.Body>
      </Modal>
      <Row style = {{marginTop: "1%"}}>
        <Col>
          <h4>
            <Button variant = "success" style = {{marginRight: "1%"}}
              onClick = {() => {
                if(cards.length === 4) {
                  setShow(true);
                  return;
                }
                BingoController.createCard(
                  createCardCallback,
                  createCardCallbackOnError
                );
              }}
            >
              +
            </Button>
            Your Cards
          </h4>
        </Col>
      </Row>
      <Row>
        {cards.map((card) => {
          return (
            <Col md = {6}>
              <Row>
                <Col>
                  <BingoCard
                    card = {card}
                    selected = {metaData[card.id]}
                    selectBox = {selectBox}
                  />
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default BingoContainer;

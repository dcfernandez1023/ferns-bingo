import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import BingoCard from './BingoCard.js';
const BingoController = require('../controllers/bingoController.js');

const localStorageHelper = require('../controllers/localStorageHelper.js');

function BingoContainer() {

  const[cards, setCards] = useState([]);

  useEffect(() => {
    localStorageHelper.initializeStorage();
    setCards(localStorageHelper.getCards());
  }, []);

  function createCardCallback(newCard) {
    let newCards = cards.splice();
    newCards.push(newCard);
    setCards(newCards);
    localStorageHelper.updateCards(newCards);
  }

  function createCardCallbackOnError(error) {
    //TODO: handle errors more elegantly
    alert(error);
  }

  return (
    <Container fluid>
      <Row style = {{marginTop: "1%"}}>
        <Col>
          <h4>
            <Button variant = "success" style = {{marginRight: "1%"}}
              onClick = {() => {
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
                    grid = {card.grid}
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

import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import BingoCard from './BingoCard.js';
const BingoController = require('../controllers/bingoController.js');

const localStorageHelper = require('../controllers/localStorageHelper.js');

function BingoContainer() {

  const[cards, setCards] = useState();
  const[metaData, setMetaData] = useState();

  const[show, setShow] = useState(false);
  const[deleteShow, setDeleteShow] = useState(false);
  const[deleteId, setDeleteId] = useState();
  const[resetShow, setResetShow] = useState();
  const[resetId, setResetId] = useState();

  const [resetAllShow, setResetAllShow] = useState(false);
  const[deleteAllShow, setDeleteAllShow] = useState(false);

  const[isLoading, setIsLoading] = useState(false);

  const[toastShow, setToastShow] = useState(false);
  const[toastText, setToastText] = useState("");

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
    setIsLoading(false);
    setToastText("✔️ Card added successfully");
    setToastShow(true);
  }

  function callbackOnError(error) {
    //TODO: handle errors more elegantly
    alert(error);
    setIsLoading(false);
    setToastShow(true);
    setToastText("❌ Action failed")
  }

  function selectBox(id, row, col) {
    var newMetaData = JSON.parse(JSON.stringify(metaData));
    if(newMetaData[id] === undefined) {
      newMetaData[id] = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];
    }
    if(newMetaData[id][row][col] === 1) {
      newMetaData[id][row][col] = 0;
    }
    else {
      newMetaData[id][row][col] = 1;
    }
    setMetaData(newMetaData);
    localStorageHelper.updateMetaData(newMetaData);
  }

  function deleteCardCallback(id) {
    //update cards
    var newCards = [];
    for(var i = 0; i < cards.length; i++) {
      if(cards[i].id !== id) {
        var card = JSON.parse(JSON.stringify(cards[i]));
        newCards.push(card);
      }
    }
    var newMetaData = JSON.parse(JSON.stringify(metaData));
    delete newMetaData[id];
    setCards(newCards);
    setMetaData(newMetaData);
    localStorageHelper.updateCards(newCards);
    localStorageHelper.updateMetaData(newMetaData);
    setDeleteShow(false);
    setIsLoading(false);
    setToastText("✔️ Card deleted successfully");
    setToastShow(true);
  }

  function deleteAllCardsCallback() {
    localStorageHelper.updateCards([]);
    localStorageHelper.updateMetaData({});
    setCards([]);
    setMetaData({});
    setDeleteAllShow(false);
    setIsLoading(false);
    setToastText("✔️ All cards deleted successfully");
    setToastShow(true);
  }

  function resetCard() {
    if(resetId === undefined) {
      alert("Internal error. Could not reset card.");
      return;
    }
    var newMetaData = JSON.parse(JSON.stringify(metaData));
    newMetaData[resetId] = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];
    setMetaData(newMetaData);
    localStorageHelper.updateMetaData(newMetaData);
    setResetShow(false);
    setIsLoading(false);
    setToastShow(true);
    setToastText("✔️ Card reset successfully");
    setToastShow(true);
  }

  function resetAllCards() {
    var newMetaData = JSON.parse(JSON.stringify(metaData));
    var keys = Object.keys(newMetaData);
    for(var i = 0; i < keys.length; i++) {
      newMetaData[keys[i]] = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];
    }
    setMetaData(newMetaData);
    localStorageHelper.updateMetaData(newMetaData);
    setResetAllShow(false);
    setIsLoading(false);
    setToastShow(true);
    setToastText("✔️ All cards reset successfully");
    setToastShow(true);
  }

  if(cards === undefined || metaData === undefined) {
    return (
      <Container fluid>
        <Row  style = {{marginTop: "2%", textAlign: "center"}}>
          <Col>
            <Spinner animation = "grow" />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      {/*maximum card modal*/}
      <Modal
        show = {show}
        onHide = {() => {setShow(false)}}
      >
        <Modal.Header closeButton> Card Limit Reached </Modal.Header>
        <Modal.Body> Cannot add a new bingo card. The maximum limit is 4 cards. </Modal.Body>
        <Modal.Footer>
          <Button
            onClick = {() => {setShow(false)}}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      {/*delete card modal*/}
      <Modal
        show = {deleteShow}
        onHide = {() => {setDeleteShow(false)}}
      >
        <Modal.Header closeButton> Confirm Delete 🗑️ </Modal.Header>
        <Modal.Body> Are you sure you want to delete this bingo card? </Modal.Body>
        <Modal.Footer>
          <Button
            onClick = {() => {
              if(deleteId !== undefined) {
                setIsLoading(true);
                BingoController.deleteCard(deleteId,
                  deleteCardCallback,
                  callbackOnError
                );
              }
              else {
                alert("Internal error. Could not delete card.");
              }
            }}
          >
            Yes
          </Button>
          <Button variant = "secondary"
            onClick = {() => {setDeleteShow(false)}}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {/*reset card modal*/}
      <Modal
        show = {resetShow}
        onHide = {() => {setResetShow(false)}}
      >
        <Modal.Header closeButton> Confirm Reset 🧹 </Modal.Header>
        <Modal.Body> Are you sure you want to reset this bingo card? </Modal.Body>
        <Modal.Footer>
          <Button
            onClick = {() => {
              setIsLoading(true);
              resetCard();
            }}
          >
            Yes
          </Button>
          <Button variant = "secondary"
            onClick = {() => {setResetShow(false)}}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {/*delete all cards modal*/}
      <Modal
        show = {deleteAllShow}
        onHide = {() => {setDeleteAllShow(false)}}
      >
        <Modal.Header closeButton> Confirm Delete 🗑️ </Modal.Header>
        <Modal.Body> Are you sure you want to delete <strong> ALL </strong> bingo cards? </Modal.Body>
        <Modal.Footer>
          <Button
            onClick = {() => {
              setIsLoading(true);
              BingoController.deleteAllCards(cards,
                deleteAllCardsCallback,
                callbackOnError
              );
            }}
          >
            Yes
          </Button>
          <Button variant = "secondary"
            onClick = {() => {setDeleteAllShow(false)}}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {/*reset all cards modal*/}
      <Modal
        show = {resetAllShow}
        onHide = {() => {setResetAllShow(false)}}
      >
        <Modal.Header closeButton> Confirm Reset 🧹 </Modal.Header>
        <Modal.Body> Are you sure you want to reset <strong> ALL </strong> bingo cards? </Modal.Body>
        <Modal.Footer>
          <Button
            onClick = {() => {
              setIsLoading(true);
              resetAllCards();
            }}
          >
            Yes
          </Button>
          <Button variant = "secondary"
            onClick = {() => setResetAllShow(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Row style = {{marginTop: "2%"}}>
        <Col xs = {10}>
          <Button variant = "success" style = {{marginLeft: "1%", marginRight: "1%", float: "left"}} disabled = {isLoading}
            onClick = {() => {
              if(cards.length === 4) {
                setShow(true);
                return;
              }
              setIsLoading(true);
              BingoController.createCard(
                createCardCallback,
                callbackOnError
              );
            }}
          >
            +
          </Button>
          <DropdownButton id = "card-options" variant = "success" style = {{marginLeft: "1%", marginRight: "1.5%", float: "left"}}>
            <Dropdown.ItemText> <strong> Card Options </strong> </Dropdown.ItemText>
            <Dropdown.Item onClick = {() => setDeleteAllShow(true)}> Delete All </Dropdown.Item>
            <Dropdown.Item onClick = {() => setResetAllShow(true)}> Reset All </Dropdown.Item>
          </DropdownButton>
          <h4 style = {{marginTop: "1%"}}>
            Your Cards
          </h4>
        </Col>
        {isLoading ?
          <Col xs = {2} style = {{textAlign: "right", marginTop: "1%"}}>
            <Spinner animation = "border"/>
          </Col>
          :
          <div></div>
        }
      </Row>
      <Row style = {{marginTop: "1%"}}>
        <Col style = {{marginLeft: "1%"}}>
          {!isLoading ?
            <Toast
              autohide = {true}
              show = {toastShow}
              delay = {3000}
              onClose = {() => {
                setToastShow(false);
                setToastText("");
              }}
            >
              <Toast.Header>
                <strong className = "mr-auto"> Action Status </strong>
              </Toast.Header>
              <Toast.Body> {toastText} </Toast.Body>
            </Toast>
            :
            <div></div>
          }
        </Col>
      </Row>
      {cards.length === 0 ?
        <Row style = {{marginTop: "1%"}}>
          <Col style = {{marginLeft: "1.5%"}}> <p> You don't have any bingo cards. Click the + button to add a card. 🎅🎄 </p> </Col>
        </Row>
        :
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
                      setDeleteShow = {setDeleteShow}
                      setDeleteId = {setDeleteId}
                      setResetShow = {setResetShow}
                      setResetId = {setResetId}
                    />
                  </Col>
                </Row>
              </Col>
            );
          })}
          </Row>
        }
    </Container>
  );
}

export default BingoContainer;

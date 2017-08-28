# react-native-card-stack

![React Native Card Stack](https://github.com/ridgeO/react-native-card-stack/raw/master/ScreenCaptures/SwipeCards.gif)

Tinder really changed the game with it's card swiping interface. It's simple, visually appealing, and just plain fun.

Perhaps that's why it's taken the mobile UI world by storm. These days there is a "Tinder of..." just about everything from [Music](http://thebestsong.co/) to [Pet Adoption](https://barkbuddy.com/).

This component will make it easier to make your own "Tinder of..." by adding a stack of swipeable cards to your application. Based on the component built in our [Platypost](http://www.platypusindustries.com/posts/7).

## Quick Start
1. `npm install --save react-native-card-stack`
2. Import it `import CardStack from 'react-native-card-stack'`
3. Render it `<CardStack/>`

## Example
```javascript
'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import flattenStyle from 'flattenStyle';
import CardStack from 'react-native-card-stack';

export default class SwipeView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allCards: [],
      displayedCards: [],
    };
  }

  componentWillMount() {
    this.pullUsers();
  }

  async pullUsers() {
    try {
      let response = await fetch('https://randomuser.me/api/?results=100&gender=female');
      let result = await response.json();
      let resultKeyed = []
      for (var i = 0; i < result.results.length; i++){
        result.results[i].key = result.results[i].login.username;
        resultKeyed.push(result.results[i]);
      }
      this.setState({
        allCards: resultKeyed
      });
      let selection = []
      for (var i = 0; i < 3; i++){
        selection.push(this.state.allCards.shift(i))
      }
      this.setState({
        allCards: this.state.allCards,
        displayedCards: selection.reverse()
      });
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  handleAdd() {
    if (this.state.allCards.length > 0) {
      let newCard = this.state.allCards.shift()
      this.setState({
        displayedCards: [newCard, ...this.state.displayedCards]
      });
    }
  };

  handleRemove = (index) => {
    this.state.displayedCards.pop();
    this.setState({
      displayedCards: this.state.displayedCards
    });
    this.handleAdd();
  };

  renderCard(cardObject) {
    return(
      <View style={Styles.card}>
        <View style={Styles.cardTop}/>
        <View style={Styles.cardImageBorder}/>
        <Image source={{uri: cardObject.picture.large}} style={Styles.cardImage}/>
        <View style={Styles.cardText}>
          <Text style={Styles.cardTextMain}>{cardObject.name.first.toUpperCase()} {cardObject.name.last.toUpperCase()}</Text>
          <Text style={Styles.cardTextSecondary}>{cardObject.location.city.toUpperCase()} </Text>
          <Text style={Styles.cardTextSecondary}>{cardObject.location.state.toUpperCase()}</Text>
          <Text style={Styles.cardTextTerciary}>{cardObject.email}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <CardStack
        cardList={this.state.displayedCards}
        renderCard={this.renderCard}
        cardHeight={flattenStyle(Styles.card).height}
        cardWidth={flattenStyle(Styles.card).width}
        cardRotation={20}
        cardOpacity={0.5}
        onSwipeRight={this.handleRemove}
        onSwipeLeft={this.handleRemove}
        onSwipeUp={this.handleRemove}
        onSwipeDown={this.handleRemove}
        leftSwipeThreshold={-150}
        rightSwipeThreshold={150}
        upSwipeThreshold={-150}
        downSwipeThreshold={150}
      />
    );
  }
}

const Styles = StyleSheet.create({
  card: {
    height: 500,
    width: 350,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  cardTop: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 200,
    width: 350,
    backgroundColor: '#D3D3D3'
  },
  cardImage: {
    position: 'absolute',
    left: 85,
    top: 110,
    width: 180,
    height: 180,
    borderRadius: 90,
    borderColor: '#FFF',
    borderWidth: 4,
    backgroundColor: '#1E90FF'
  },
  cardImageBorder: {
    position: 'absolute',
    left: 83.5,
    top: 108.5,
    width: 183,
    height: 183,
    borderRadius: 91.5,
    backgroundColor: '#A9A9A9'
  },
  cardText: {
    position: 'absolute',
    left: 0,
    top: 300,
    width: 350,
    alignItems: 'center',
    padding: 20
  },
  cardTextMain: {
    textAlign: 'left',
    fontSize: 25,
    color: '#696969',
    backgroundColor: 'transparent',
    paddingBottom: 10
  },
  cardTextSecondary: {
    textAlign: 'left',
    fontSize: 18,
    color: 'grey',
    backgroundColor: 'transparent'
  },
  cardTextTerciary: {
    textAlign: 'left',
    fontSize: 18,
    color: '#696969',
    backgroundColor: 'transparent',
    paddingTop: 10
  }
});
```

## Props

| Name              | Type     | Description                                                 | Default      |
|-------------------|----------|-------------------------------------------------------------|--------------|
| cardList          | Array    | Data provided for each card                                 |              |
| renderCard        | Function | Renders a card with the data provided                       |              |
| cardHeight        | Number   | Height of the card in density-independent pixels            |              |
| cardWidth         | Number   | Width of the card in density-independent pixels             |              |
| cardRotation      | Number   | Maximum rotation of card in degrees when dragged            |              |
| cardOpacity       | Number   | Minimum opacity of card when dragged (0-1)                  |              |
| onSwipeRight      | Function | Function to execute when card is past rightSwipeThreshold   |              |
| onSwipeLeft       | Function | Function to execute when card is past leftSwipeThreshold    |              |
| onSwipeUp         | Function | Function to execute when card is past upSwipeThreshold      |              |
| onSwipeDown       | Function | Function to execute when card is past downSwipeThreshold    |              |
| leftSwipeThreshold | Number   | Maximum card can be moved left before triggering onSwipeLeft function |             |
| rightSwipeThreshold | Number  | Maximum card can be moved right before triggering onSwipeRight function |             |
| upSwipeThreshold  | Number   | Maximum card can be moved up before triggering onSwipeUp function |             |
| downSwipeThreshold | Number   | Maximum card can be moved down before triggering onSwipeDown function |             |

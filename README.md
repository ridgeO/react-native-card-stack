# react-native-card-stack

Still in beta. Looking to port over all of the goodness of http://www.platypusindustries.com/posts/7 including having the ability to pass a custom card to the list.

Stay tuned for updates to come.

![React Native Card Stack](https://github.com/ridgeO/react-native-card-stack/blob/master/ScreenCaptures/CardsSwipeapbleSmall.gif?raw=true)

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
      cards: [],
    };
  }

  componentWillMount() {
    for(let i = 0; i < 3; i++){
      this.handleAdd();
    }
  }

  async handleAdd() {
    try {
      let response = await fetch('https://randomuser.me/api');
      let result = await response.json();
      result.results[0].key = result.results[0].login.username
      this.setState({
        cards: [result.results[0], ...this.state.cards],
      });
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  handleRemove = (index) => {
    let start = this.state.cards.slice(0, index);
    let end = this.state.cards.slice(index + 1);
    this.setState({
      cards: start.concat(end),
    });
    this.handleAdd();
  };

  renderCard(cardObject) {
    return(
      <View style={Styles.card}>
        <Image source={{uri: cardObject.picture.large}} style={Styles.cardImage}/>
        <View style={Styles.cardText}>
          <Text style={Styles.cardTextMain}>{cardObject.name.first} {cardObject.name.last}</Text>
          <Text style={Styles.cardTextSecondary}>{cardObject.email}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <CardStack
        cardList={this.state.cards}
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
    borderColor: 'lightgrey',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  cardImage: {
    flex: 1,
    backgroundColor: '#1E90FF'
  },
  cardText: {
    margin: 20
  },
  cardTextMain: {
    textAlign: 'left',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  cardTextSecondary: {
    textAlign: 'left',
    fontSize: 15,
    color: 'grey',
    backgroundColor: 'transparent'
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

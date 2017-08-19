'use strict';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Styles from './Styles.js';
import Card from './Card.js';

export default class CardStack extends Component {

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

  render() {
    return (
      <FlatList
        style={Styles.cardContainer}
        contentContainerStyle={Styles.cardStack}
        data={this.state.cards}
        renderItem={({item, index}) => (
          <Card
            {...item}
            index={index}
            cardWidth={350}
            cardHeight={500}
            cardRotationDegrees={20}
            cardOpacityShift={0.5}
            onSwipeRight={this.handleRemove}
            onSwipeLeft={this.handleRemove}
            onSwipeUp={this.handleRemove}
            onSwipeDown={this.handleRemove}
            leftSwipeThreshold={-150}
            rightSwipeThreshold={150}
            upSwipeThreshold={-150}
            downSwipeThreshold={150}
            cardImage={item.picture.large}
            cardTextMain={`${item.name.first} ${item.name.last}`}
            cardTextSecondary={item.email}
            cardBorderWidth={1}
            cardBorderColor={'#d3d3d3'}
            cardBorderRadius={8}
            cardBackgroundColor={'#fff'}
          />
        )}
        keyExtractor={(item) => item.login.username}
        scrollEnabled={false}
      />
    );
  }
}

'use strict';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Styles from './Styles.js';
import Card from './Card.js';

export default class CardStack extends Component {


  render() {
    return (
      <FlatList
        style={Styles.cardContainer}
        contentContainerStyle={Styles.cardStack}
        data={this.props.cardList}
        renderItem={({item, index}) => (
          <Card
            {...item}
            index={index}
            {...this.props}
          />
        )}
        keyExtractor={(item) => item.login.username}
        scrollEnabled={false}
      />
    );
  }
}

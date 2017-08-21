'use strict';
import React, { Component } from 'react';
import { FlatList, Dimensions } from 'react-native';
import Card from './Card.js';
const DIMENSIONS = Dimensions.get('window');

export default class CardStack extends Component {

  render() {
    return (
      <FlatList
        style={{
          flex: 1,
          width: DIMENSIONS.width
        }}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        data={this.props.cardList}
        renderItem={({item, index}) => (
          <Card
            index={index}
            item={item}
            {...this.props}
          />
        )}
        keyExtractor={(item) => item.login.username}
        scrollEnabled={false}
      />
    );
  }
}

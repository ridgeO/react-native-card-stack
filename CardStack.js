'use strict';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Styles from './Styles.js';
import Card from './Card.js';

export default class CardStack extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
        users: [result.results[0], ...this.state.users],
      });
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  handleRemove = (index) => {
    let start = this.state.users.slice(0, index);
    let end = this.state.users.slice(index + 1);
    this.setState({
      users: start.concat(end),
    });
    this.handleAdd();
  };

  render() {
    return (
      <FlatList
        style={Styles.cardContainer}
        contentContainerStyle={Styles.cardStack}
        data={this.state.users}
        renderItem={({item, index}) => (
          <Card
            {...item}
            index={index}
            onSwipe={this.handleRemove}
          />
        )}
        keyExtractor={(item) => item.login.username}
        scrollEnabled={false}
      />
    );
  }
}

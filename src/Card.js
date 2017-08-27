'use strict';
import React, { Component } from 'react';
import {
  PanResponder,
  Animated
} from 'react-native';

export default class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y}
      ]),
      onPanResponderRelease: (e, {vx, vy}) => {
        if (this.state.pan.x._value < this.props.leftSwipeThreshold) {
          this.props.onSwipeLeft(this.props.index)
        } else if (this.state.pan.x._value > this.props.rightSwipeThreshold) {
          this.props.onSwipeRight(this.props.index)
        } else if (this.state.pan.y._value < this.props.upSwipeThreshold) {
          this.props.onSwipeUp(this.props.index)
        } else if (this.state.pan.y._value > this.props.downSwipeThreshold) {
          this.props.onSwipeDown(this.props.index)
        } else {
          Animated.spring(this.state.pan, {
            toValue: 0,
          }).start()
        }
      }
    });
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  getAnimatedViewStyle() {
    let {pan} = this.state;
    return [
      {position: 'absolute'},
      {left: this.props.cardWidth/2*-1},
      {top: this.props.cardHeight/2*-1},
      {transform: [{translateX: pan.x}, {translateY: pan.y},
      {rotate: pan.x.interpolate({inputRange: [this.props.leftSwipeThreshold, 0, this.props.rightSwipeThreshold], outputRange: [`-${this.props.cardRotation}deg`, '0deg', `${this.props.cardRotation}deg`]})}]},
      {opacity: pan.x.interpolate({inputRange: [this.props.leftSwipeThreshold, 0, this.props.rightSwipeThreshold], outputRange: [this.props.cardOpacity, 1, this.props.cardOpacity]})}
    ];
  }

  render() {
    return (
      <Animated.View style={this.getAnimatedViewStyle()} {...this.panResponder.panHandlers}>
        {this.props.renderCard(this.props.item)}
      </Animated.View>
    );
  }
}

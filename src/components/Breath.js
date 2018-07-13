import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native'
import { widthGrid, heightGrid } from 'mobile-grid'
import BALLOON from '../../assets/love-balloon.png'

export default class Breath extends React.Component {
  constructor() {
    super()

    this.state = {
      _animatedY: new Animated.Value(0),
      _animatedScale: new Animated.Value(1)
    }
  }

  componentDidMount() {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(this.state._animatedY, {
            toValue: -widthGrid*10,
            duration: 5000,
          }),
          Animated.timing(this.state._animatedY, {
            toValue: 0,
            duration: 5000,
          })
        ]),
        Animated.sequence([
          Animated.timing(this.state._animatedScale, {
            toValue: 2,
            duration: 5000,
          }),
          Animated.timing(this.state._animatedScale, {
            toValue: 1,
            duration: 5000,
          })
        ])
      ])
    ).start()
  }

  render() {
    const animatedStyle = {
      transform: [
        {translateY: this.state._animatedY},
        { scale: this.state._animatedScale }
      ]
    }

    const animatedScale = {
      transform: [
        { scale: this.state._animatedScale }
      ]
    }
    console.log(this.state._animatedScale)
    return(
      <View style={styles.container}>
        <Animated.Image source={BALLOON} style={[animatedStyle, styles.image]}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center'
  },
  image: {
    height: 150,
    width: 150,
  },
  message: {
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
  }
})
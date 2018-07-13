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
import SvgUri from 'react-native-svg-uri'
import { widthGrid, heightGrid } from 'mobile-grid';

export default class Espn extends React.Component {

  state = {
    _animated: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state._animated, {
          toValue: 20,
          duration: 2000,
        }),
        Animated.timing(this.state._animated, {
          toValue: 0,
          duration: 2000,
        }),
      ])
    ).start()
  }

  render() {
     
    const animatedStyleY = {
      transform: [
        {translateY: this.state._animated}
      ]
    }

    const animatedStyleX = {
      transform: [
        {translateX: this.state._animated}
      ]
    }

    return(
      <View style={styles.container}>
        <Image 
          source={{uri:'http://a.espncdn.com/prod/styles/pagetype/otl/20171127_fc100/images/fc100_mobileheader_logo.png'}}
          style={{width:widthGrid*12, height:heightGrid*12,position: 'absolute'}}
        />
          <Animated.View 
            style={[animatedStyleY, {alignSelf:'flex-end', position:'absolute', }]}
          >
            <SvgUri
              width={widthGrid*12 > 320 ? '200' : '150'}
              height={widthGrid*12 > 320 ? '200' : '150'}
              source={{uri:'http://a.espncdn.com/prod/styles/pagetype/otl/20171127_fc100/images/tsa_ronaldo.svg'}}
            />
          </Animated.View>
          <Animated.View 
            style={[animatedStyleX, {position:'absolute',}]}
          >
            <SvgUri
              width={widthGrid*12 > 320 ? '200' : '150'}
              height={widthGrid*12 > 320 ? '200' : '150'}
              source={{uri:'http://a.espncdn.com/prod/styles/pagetype/otl/20171127_fc100/images/tsa_neymar.svg'}}
            />
          </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
  },
})
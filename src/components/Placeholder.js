import React from 'react'
import {View, StyleSheet, Dimensions, Animated} from 'react-native'
import SinglePlaceholder from './SinglePlaceholder'

const {width, height} = Dimensions.get('window')
const gridWidth = width/12
const heightHeight = height/12

export default class Placeholder extends React.Component{

    state = {
        animated1: new Animated.Value(0),
        animated2: new Animated.Value(0),
        animated3: new Animated.Value(0),
        animated4: new Animated.Value(0),
        animated5: new Animated.Value(0)
    }

    componentDidMount() {
        Animated.stagger(100, [
            Animated.spring( this.state.animated1, {
                toValue:1,
            }),
            Animated.spring( this.state.animated2, {
                toValue:1,
            }),
            Animated.spring( this.state.animated3, {
                toValue:1,
            }),
            Animated.spring( this.state.animated4, {
                toValue:1,
            }),
            Animated.spring( this.state.animated5, {
                toValue:1,
            })
        ]).start()
    }
    
    render() {
        return(
            <View style={styles.container} >
                <Animated.View style={{opacity: this.state.animated1}} >
                    <SinglePlaceholder />
                </Animated.View>
                <Animated.View style={{opacity: this.state.animated2}} >
                    <SinglePlaceholder />
                </Animated.View>
                <Animated.View style={{opacity: this.state.animated3}} >
                    <SinglePlaceholder />
                </Animated.View>
                <Animated.View style={{opacity: this.state.animated4}} >
                    <SinglePlaceholder />
                </Animated.View>
                <Animated.View style={{opacity: this.state.animated5}} >
                    <SinglePlaceholder />
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

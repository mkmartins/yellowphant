import React from 'react'
import {View, Text, Animated, StyleSheet} from 'react-native'
import { widthGrid, heightGrid } from 'mobile-grid'

class SinglePlaceholder extends React.Component {

    state = {
        animation: new Animated.Value(0),
    }   
    
    componentDidMount() {
        Animated.loop(
            Animated.timing(this.state.animation, {
                duration: 1500,
                toValue: 1,
              })
        ).start()
    }

    render() {
        const progressInterpolate = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
            extrapolate: "clamp",
        })
        const colorInterpolate = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgb(22, 22, 22)", "rgb(74, 74, 74)"],
        })
        const progressStyle = {
            width: progressInterpolate,
            bottom: 0,
            backgroundColor: colorInterpolate,
        }  

        return(
            <View style={styles.placeholderContainer} >
                <View style={styles.placeholderTitle}>
                    <View style={StyleSheet.absoluteFill}>
                        <Animated.View  style={[progressStyle,styles.progress]} />
                    </View>
                </View>
                <View style={styles.placeholderText}>
                    <View style={StyleSheet.absoluteFill}>
                        <Animated.View  style={[progressStyle,styles.progress]} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    placeholderContainer: {
        height: heightGrid*2,
        width: widthGrid*11,
        marginTop: 10,
        borderBottomColor: '#fbbaba',
        borderBottomWidth: 0.5,
    },
    placeholderTitle: {
        backgroundColor: 'black',
        marginTop:10,
        width:widthGrid*4,
        height:40,
        left: 0,
        top: 0,    
    },
    placeholderText: {
        backgroundColor: 'black',
        marginTop:10,
        width:widthGrid*6,
        height:20,
        left: 0,
        top: 0,
    
    },
    progress: {
        position: "absolute",
        left: 0,
        top: 0,
      },    
})

export default SinglePlaceholder
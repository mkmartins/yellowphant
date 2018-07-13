import React from 'react'
import { MapView } from 'expo'
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import {Text} from 'react-native-ui-lib'
import LOGO from '../../assets/comic.jpg'
import openMap from 'react-native-open-maps'
import Icon from 'react-native-vector-icons/FontAwesome'

class DealDetail extends React.Component{
    render() {
        const {name, promotion, detail} = this.props.business
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Image source={LOGO} style={styles.logo}/>
                    </View>
                    <Text  style={{color:'black'}} text20>{name}</Text>
                    <Text  style={styles.promotion}>{promotion}</Text>
                </View>
                <Text>
                    {detail.address}{'\n'}{detail.phone}{'\n'}hours: {detail.hours}
                </Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: detail.coord.lat,
                        longitude: detail.coord.long,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }}
                />
                <TouchableOpacity 
                    onPress={()=>openMap({ latitude: detail.coord.lat, longitude: detail.coord.long })}
                    style={styles.direction}
                >
                    <View style={{flexDirection:"row"}}>
                        <Icon name="location-arrow" size={20} style={{color:"white"}}/>
                        <Text style={{color:'white'}}> Get Directions</Text>
                    </View>
                </TouchableOpacity> 
            </View>
        )
    }
}

const { height, width } = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
    },
    logoContainer:{
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: '#808080',
        shadowOpacity: 1.0,
    },
    logo: {
        borderRadius:3,
        borderColor: '#000',
        marginTop:30,
        width:150,
        height:75,
    },
    promotion: {
        color:'black',
        fontSize:20,
    },
    header: {
        alignItems:"center",
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '80%',
        marginBottom: 20,
    },
    map: { 
        width:"80%", 
        height: height/5, 
        borderRadius:3,
        borderColor: 'black',
        borderWidth:0.5,
        marginTop: 20,
    },
    direction: {
        height:50,
        justifyContent:"center",
        backgroundColor:"black",
    }
})

export default DealDetail
import React from 'react'
import { View, Text, StyleSheet, Animated, Dimensions, Image, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import LOGO from '../../assets/logo.png'
import { Actions } from 'react-native-router-flux';
import Placeholder from './Placeholder.js'

class DealsList extends React.Component{
    state = {
        dataLoaded:false,
        data: [
            {id:'1' ,name: 'Zupas',        promotion: 'Free Drink', detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} }, 
            {id:'2' ,name: 'Cafe Rio',     promotion: 'Free Dessert',   detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} },
            {id:'3' ,name: 'Keaders',      promotion: 'Free Combo',   detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} },
            {id:'4' ,name: 'Dollar Cuts Avenues',    promotion: '$5 Hair Cut',  detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} },
            {id:'5' ,name: 'Get Air',      promotion: 'Free Hour',   detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} },
            {id:'6' ,name: 'Spitz',        promotion: '40% off',      detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} },
            {id:'7' ,name: 'Red Iguana',   promotion: 'Free App',     detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} },
            {id:'8' ,name: 'Zupas',        promotion: 'Free Drink', detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} }, 
            {id:'9' ,name: 'Cafe Rio',     promotion: 'Free Chips',   detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} },
            {id:'11' ,name: 'Keaders',     promotion: 'Free Combo',   detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} },
            {id:'12' ,name: 'Dollar Cuts Avenues',   promotion: '$5 Hair Cut',  detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} },
            {id:'13' ,name: 'Get Air',    promotion: 'Free Hour',   detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} },
            {id:'10' ,name: 'Spitz',       promotion: '20% off',      detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} },
            {id:'14' ,name: 'Red Iguana',  promotion: 'Free App',     detail:{phone:"111-111-1111", hours:"10am-9pm",address:"963 Austin Ct. Provo Ut", coord:{lat:37.78825,long:-122.4324}} },
        ]
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({dataLoaded: true})
        }, 3000)
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text  style={{color:'black', fontSize:20, fontWeight:"100"}}>These businesses understand</Text>
                    <Text  style={{color:'black', fontSize:20, fontWeight:"100"}}>what you go through.</Text>
                </View>
                <View style={styles.list}>
                    {!this.state.dataLoaded && 
                        <ScrollView>
                            <Placeholder />
                        </ScrollView>
                    }
                    {this.state.dataLoaded &&
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({item}) => 
                                <TouchableOpacity onPress={()=>Actions.dealDetail({business:item})}>
                                <View style={styles.item}>
                                    <Text style={{ color: "black", fontSize:30 }}>
                                        {item.name}
                                    </Text>
                                    <Text style={{ color: "black", fontWeight:"100", marginBottom:5 }}>
                                        {item.promotion}
                                    </Text>
                                </View>
                                </TouchableOpacity>
                            }
                        />
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    list: {
        marginLeft: 15
    },
    item: {
        marginBottom: 10,
        borderBottomColor: '#fbbaba',
        borderBottomWidth: 0.5,
        width: '100%',
        marginTop: 10,
    },
})

export default DealsList
import React from 'react'
import { 
    View,
    StyleSheet,
    Image,
    ActivityIndicator,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    Modal,
    TouchableHighlight,
    Easing,
 } from 'react-native'
import { TextInput, Text, Button, Card, Colors } from 'react-native-ui-lib'
import LOGO from '../../assets/logo.png'
import COMIC from '../../assets/comic.jpg'
import { Actions } from 'react-native-router-flux'
import { getInfo, logOut } from '../actions'
import { connect } from 'react-redux'
import { widthGrid, heightGrid } from 'mobile-grid'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _animatedContainer: new Animated.Value(0),
            _animatedLogo: new Animated.ValueXY(),
            modalVisible: false,
        }
    }

    componentWillMount() {
        this.props.getInfo()

        const {width, height} = Dimensions.get("window")
        Animated.sequence([
            Animated.timing(this.state._animatedContainer, {
                toValue: 1,
                duration: 2000,
            }),
            Animated.loop(
                Animated.stagger(2000,[
                    Animated.spring(this.state._animatedLogo.x, {
                        toValue: width/2 - 50
                    }),
                    // Animated.timing(this.state._animatedLogo.y, {
                    //     toValue: height - 50,
                    // }),
                    Animated.timing(this.state._animatedLogo.x, {
                        toValue:0,
                    }),
                    Animated.spring(this.state._animatedLogo.x, {
                        toValue:50 - width/2
                    }),
                    // Animated.timing(this.state._animatedLogo.y, {
                    //     toValue:0,
                    // }),
                    Animated.timing(this.state._animatedLogo.x, {
                        toValue:0,
                    }),
                ])
            )
        ]).start()
    }

    setModalVisible(visible, value) {
        Animated.timing(this.state._animatedContainer, {
            toValue: value
        }).start()
        this.setState({modalVisible: visible});
    }

    render() {
        const animatedStyle = {opacity:this.state._animatedContainer}
        const animatedLogo = {transform: this.state._animatedLogo.getTranslateTransform()}
        const {height, width} = Dimensions.get("window")

        return(
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    alert('Modal has been closed.');
                    }}>
                    <View style={{alignItems:"center", justifyContent: "center", flex: 1}}>
                        <Image source={COMIC} style={styles.comic} />
                        <Button 
                            label="'X'"                        
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible, 1)
                            }}
                            style={{marginTop: 50}}
                        />
                    </View>
                </Modal>
                <View style={styles.header} />
                <View style={styles.logo}>
                    <TouchableWithoutFeedback
                        onPress={()=>this.setModalVisible(true, 0.3)}
                    >
                        <Animated.Image source={LOGO} style={[animatedLogo,{width: 50, height:50,zIndex: 1}]}/>
                    </TouchableWithoutFeedback>
                </View>
                <Animated.View style={animatedStyle}>
                    <View style={styles.card}>
                        <View style={{flex:2}}>
                            {this.props.image ?
                                <Image 
                                    source={{uri: this.props.image}} 
                                    style={{width: width/2, height: height/4, alignSelf:"center"}} 
                                /> : null
                            }
                            {!this.props.image && 
                                <ActivityIndicator size="large" color="white" />
                            }
                            <Button label="edit" link onPress={()=>alert("This feature is coming soon")} />
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.name}>{this.props.name ? this.props.name : "Wait for it..."}</Text>
                            <Text style={{alignSelf:"center"}}>is a member of</Text>
                            <Text style={styles.title}>The Yellowphant Club</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 20, marginLeft:30, marginRight:30,flex:1,}}>
                        <Button text70 white background-yellow30 label="Search Deals" fullWidth 
                            style={[styles.buttonContainer]}
                            onPress={()=> Actions.dealsList()}
                        />
                        <Button text70 white background-yellow30 label="Just Breathe" fullWidth 
                            style={[styles.buttonContainer]}
                            onPress={()=> Actions.breath()}
                            // onPress={()=>alert("This feature is coming soon")}
                        />
                        <Button text70 white background-yellow30 label="Log Out" fullWidth 
                            style={[styles.buttonContainer]}
                            onPress={()=>this.props.logOut()}
                        />
                    </View>
                </Animated.View>
            </View>
        )
    }
}

Colors.loadColors({
    yellow: '#ffff02',
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    header: {
        top: 0,
        height: heightGrid*3,
        width: widthGrid*12,
        backgroundColor: '#f3959f',
        position: "absolute",
    },
    logo: {
        marginTop:heightGrid*2,
    },
    card: {
        flex:1,
        width: widthGrid*10,
        borderRadius: 5,
        borderWidth: 0.3,
        borderColor: 'black',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop:15,
        paddingBottom: 5,
        backgroundColor: "white",
        shadowOffset:{  width: 5,  height: 5,  },
        shadowColor: '#808080',
        shadowOpacity: 1.0,
    },
    name: {
        fontSize: 30 ,
        fontWeight: "bold",
        alignSelf:"center",
    },
    title: {
        fontSize: 20,
        fontWeight: '300',
        alignSelf:"center",

    },
    buttonContainer: {
        marginBottom: 10,
        borderRadius: 10,
    },
    comic: {
        width: widthGrid*11, 
        height: widthGrid*9,
        borderColor: "#808080",
        borderWidth:1,
    }
})

mapStateToProps = state => {
    const {name, image} =  state.profile
    return{
        name, image
    }
}
 
export default connect(mapStateToProps, {getInfo, logOut})(Profile)
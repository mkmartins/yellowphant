import React from 'react'
import {View, TextInput, Text, Button, Toast} from 'react-native-ui-lib'
import { StyleSheet, Image, Animated, Dimensions, KeyboardAvoidingView, ActivityIndicator, Keyboard } from 'react-native'
import LOGO from "../../assets/logo.png"
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { onTextChange, onLogInPress, clearFields } from '../actions'
import { connect } from 'react-redux'

class LogIn extends React.Component {

    state = {
        email: "",
        password: "",
        _animatedMessage: new Animated.Value(0),
        _animatedEmail: new Animated.Value(0),
        _animatedPassword: new Animated.Value(0), 
        _animatedButtons: new Animated.Value(0),
        _animatedLogo: new Animated.ValueXY({x: -1000, y: 0})
      }

    componentDidMount() {
      this.props.clearFields()

      const { width } = Dimensions.get("window")
      Animated.sequence([
        Animated.spring(this.state._animatedLogo.x, {
          toValue: (width/2) - 80,
          duration: 20000,
        }),
        Animated.timing(this.state._animatedMessage, {
          toValue: 1,
          duration: 200,
        }),
        Animated.timing(this.state._animatedEmail, {
          toValue: 1,
          duration: 200,
        }),
        Animated.timing(this.state._animatedPassword, {
          toValue: 1,
          duration: 200,
        }),
        Animated.timing(this.state._animatedButtons, {
          toValue: 1,
          duration: 200,
        }),
      ]).start()
    }

    onLogInPress = () => {
      Keyboard.dismiss()
      this.props.onLogInPress(this.props.email, this.props.password)
    }


    render() {
        const animatedLogo = {
          transform: [{translateX: this.state._animatedLogo.getTranslateTransform()[0].translateX}]
        }
        const animatedMessage = {
          opacity: this.state._animatedMessage
        }
        const animatedEmail = {
          opacity: this.state._animatedEmail
        }
        const animatedPassword = {
          opacity: this.state._animatedPassword
        }
        const animatedButtons = {
          opacity: this.state._animatedButtons
        }
        return(
          <View style={styles.container}>
            <Animated.Image source={LOGO} style={[styles.logo, animatedLogo]} />
            <KeyboardAvoidingView style={styles.form} behavior="position" keyboardVerticalOffset={-110}>
              <Animated.View style={animatedMessage}>
                  <Text  style={{color:'white'}} text20>{this.props.loading ? "Loading..." : "hello again" }</Text>
              </Animated.View>
              <Animated.View style={animatedEmail}>
                <TextInput text50 placeholder="email" dark10 returnKeyType="next"
                  onChangeText={text => this.props.onTextChange(text, 'email')}
                  value={this.props.email}
                />
              </Animated.View>
              <Animated.View style={animatedPassword}>
                <TextInput text50 placeholder="password" secureTextEntry dark10 returnKeyType="send" keyboardType="email-address"
                  onChangeText={text => this.props.onTextChange(text, 'password')}
                  value={this.props.password}
                />
              </Animated.View>
              <Animated.View style={[animatedButtons, styles.button]}>
                <Button text70 white background-orange30 onPress={this.onLogInPress}>
                  {this.props.loading ? <ActivityIndicator size="small" color="white" /> : <Text style={{color:"white"}}>Log In</Text>}
                </Button>
                <Button link text70 orange30 label="Sign Up" marginT-20 
                  onPress={()=>Actions.signUp()} 
                />
              </Animated.View>
            </KeyboardAvoidingView>
            <Toast
              visible={this.props.error !== ""}
              message="Something is wrong with the email or password"
              position="relative"
              actions={[{label: 'Close', onPress: () => this.props.clearFields()}]}
              backgroundColor={"red"}
              height={Dimensions.get("window").height/6}
              centerMessage
            />
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3969f",
    flex:1,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop:50,
  },
  form: {
    margin: 30,
    flex: 1,
  },
  button: {
    marginTop: 40,
    marginLeft: 50,
    marginRight: 50,
  }
})

mapStateToProps = state => {
  const { email, password, error, loading} = state.auth
  return { email, password, error, loading}
}

export default connect(mapStateToProps, {onTextChange, onLogInPress, clearFields})(LogIn)
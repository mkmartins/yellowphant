import React from 'react'
import { View, TextInput, Text, Button, Toast } from 'react-native-ui-lib'
import { StyleSheet, Image, Animated, Dimensions, KeyboardAvoidingView, ActivityIndicator, Keyboard } from 'react-native'
import LOGO from "../../assets/logo.png"
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { onTextChange, onSignUpPress, clearFields } from '../actions'
import { connect } from 'react-redux'
import { ImagePicker, Permissions } from 'expo'

class SignUp extends React.Component {

    state = {
        image: "",
        showToast: false,
        _animatedMessage: new Animated.Value(0),
        _animatedEmail: new Animated.Value(0),
        _animatedPassword: new Animated.Value(0), 
        _animatedName: new Animated.Value(0),
        _animatedImage: new Animated.Value(0),
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
          duration: 500,
        }),
        Animated.timing(this.state._animatedName, {
          toValue: 1,
          duration:150
        }),
        Animated.timing(this.state._animatedEmail, {
          toValue: 1,
          duration: 150,
        }),
        Animated.timing(this.state._animatedPassword, {
          toValue: 1,
          duration: 150,
        }),
        Animated.timing(this.state._animatedImage, {
          toValue: 1,
          duration: 150,
        }),
        Animated.timing(this.state._animatedButtons, {
          toValue: 1,
          duration: 150,
        }),
      ]).start()
    }

    onSignUpPress = () => {
      Keyboard.dismiss()
      if(this.state.image && this.props.name) {
        this.props.onSignUpPress(this.props.email, this.props.password, this.props.name, this.state.image)
      } else {
        this.setState({showToast:true})
      }
    }

    _pickImage = async () => {
      const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
      const { cameraStatus } = await Permissions.getAsync(Permissions.CAMERA);
      if (status !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      }
      if (cameraStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.CAMERA)
      }
      let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
      });

      if (!result.cancelled) {
          this.setState({ image: result.uri })
      }

};


    render() {
        const animatedLogo = {
          transform: [{translateX: this.state._animatedLogo.getTranslateTransform()[0].translateX}]
        }
        const animatedMessage = {
          opacity: this.state._animatedMessage
        }
        const animatedName = {
          opacity: this.state._animatedName
        }
        const animatedEmail = {
          opacity: this.state._animatedEmail
        }
        const animatedPassword = {
          opacity: this.state._animatedPassword
        }
        const animatedImage = {
          opacity: this.state._animatedImage
        }
        const animatedButtons = {
          opacity: this.state._animatedButtons
        }
        return(
          <View style={styles.container}>
            <Animated.Image source={LOGO} style={[styles.logo, animatedLogo]} />
            <KeyboardAvoidingView style={styles.form} behavior="position" keyboardVerticalOffset={-110}>
              <Animated.View style={animatedMessage}>
                  <Text  style={{color:'white'}} text20>{this.props.loading ? "Loading..." : "welcome" }</Text>
              </Animated.View>
              <Animated.View style={animatedName} >
                <TextInput text50 placeholder="Full Name" dark10 returnKeyType="next" 
                  onChangeText={text => this.props.onTextChange(text, 'name')}
                  value={this.props.name}
                />
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
              <Animated.View style={[styles.pickImage, animatedImage]}>
                <Button link white onPress={this._pickImage} size="small">
                  <Icon name="camera" size={20} style={{color:"white"}}/>
                  <Text style={{color:"white"}}>{this.state.image ? " Awesome, thanks!" : " Click here to add a picture of you"}</Text>
                </Button>
              </Animated.View>
              <Animated.View style={[animatedButtons, styles.button]}>
                <Button text70 white background-orange30 onPress={this.onSignUpPress}>
                  {this.props.loading ? <ActivityIndicator size="small" color="white" /> : <Text style={{color:"white"}}>Sign Up</Text>}
                </Button>
                <Button link text70 orange30 label="Login" marginT-20 
                  onPress={()=>Actions.logIn()} 
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
            <Toast
              visible={this.state.showToast}
              message="You need to complete the form in order to sign up: Full Name, Email, Password, and Your Picture"
              position="relative"
              actions={[{label: 'Close', onPress: () => this.setState({showToast:false})}]}
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
  pickImage: {
    marginBottom: 40,
  },
  button: {
    marginLeft: 50,
    marginRight: 50,
  },
  error: {
    backgroundColor:'red',
    alignSelf:"center",
    justifyContent:"center" ,
    height:50,
  },
})

mapStateToProps = state => {
  const {name, email, password, error, loading} = state.auth
  return {name, email, password, error, loading}
}

export default connect(mapStateToProps, {onTextChange, onSignUpPress, clearFields})(SignUp)
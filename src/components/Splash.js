import React from 'react'
import { View, Image, ActivityIndicator } from 'react-native'
import { Text} from 'react-native-ui-lib'

const Splash  = () => {
    return(
        <View style={{flex:1, backgroundColor: "#f3969f",alignItems:"center", justifyContent:"center"}}>
            <ActivityIndicator size="large" color="white" />
        </View>
    )
}

export default Splash
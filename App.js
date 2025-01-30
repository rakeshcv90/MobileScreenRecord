import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/Navigation/Router';

const App = () => {
  return (
    // <View>
    //   <Text>safsdfsdfsdf</Text>
    // </View>
    <NavigationContainer >
    <Router />
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
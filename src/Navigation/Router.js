import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ActionType from '../screen/ActionType';
import VideoRecording from '../screen/VideoRecording';
import ScreenRecording from '../screen/ScreenRecording';
const Stack = createStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ActionType" component={ActionType} />
      <Stack.Screen name="VideoRecording" component={VideoRecording} />
      <Stack.Screen name="ScreenRecording" component={ScreenRecording} />
    </Stack.Navigator>
  );
};

export default Router;

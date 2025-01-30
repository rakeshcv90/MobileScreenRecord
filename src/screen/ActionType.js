import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const App = ({navigation}) => {
  const [selectedAction, setSelectedAction] = useState(null);
  const scaleScreenRecord = useState(new Animated.Value(1))[0];
  const scaleCameraRecord = useState(new Animated.Value(1))[0];

  const handleSelect = (action) => {
    setSelectedAction(action);
    setSelectedAction(action);
    if (action === 'Screen Record') {
      setTimeout(() => {
        navigation.navigate('ScreenRecording');
      }, 1000);
    } else {
      setTimeout(() => {
        navigation.navigate('VideoRecording');
      }, 1000);
    }
  };

  const handlePressIn = (scaleValue) => {
    Animated.timing(scaleValue, {
      toValue: 1.05,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scaleValue) => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <Text style={styles.title}>Choose Your Action</Text>
        <Text style={styles.subtitle}>
          Select one of the options below to start recording.
        </Text>
        <View style={styles.buttonContainer}>
          {/* Screen Record Button */}
          <TouchableWithoutFeedback
            onPress={() => handleSelect('Screen Record')}
            onPressIn={() => handlePressIn(scaleScreenRecord)}
            onPressOut={() => handlePressOut(scaleScreenRecord)}>
            <Animated.View
              style={[
                styles.button,
                selectedAction === 'Screen Record' && styles.selectedButton,
                { transform: [{ scale: scaleScreenRecord }] },
              ]}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/ios-filled/100/000000/video-call.png',
                }}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.buttonText,
                  selectedAction === 'Screen Record' &&
                    styles.selectedButtonText,
                ]}>
                Screen Record
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>

          {/* Camera Record Button */}
          <TouchableWithoutFeedback
            onPress={() => handleSelect('Camera Record')}
            onPressIn={() => handlePressIn(scaleCameraRecord)}
            onPressOut={() => handlePressOut(scaleCameraRecord)}>
            <Animated.View
              style={[
                styles.button,
                selectedAction === 'Camera Record' && styles.selectedButton,
                { transform: [{ scale: scaleCameraRecord }] },
              ]}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/ios-filled/100/000000/camera.png',
                }}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.buttonText,
                  selectedAction === 'Camera Record' &&
                    styles.selectedButtonText,
                ]}>
                Camera Record
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  button: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedButton: {
    backgroundColor: '#ff6f61',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedButtonText: {
    color: '#fff',
  },
});

export default App;

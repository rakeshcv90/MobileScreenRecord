// import {StyleSheet, Text, View, Button} from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
// const VideoRecording = () => {
//   const camera = useRef(null);
//   const devices = useCameraDevices();
//   const device = devices.back; // or devices.front for front camera
//   const [hasPermission, setHasPermission] = useState(false);

//   useEffect(() => {
//     const requestPermissions = async () => {
//       const cameraPermission = await Camera.requestCameraPermission();
//       const microphonePermission = await Camera.requestMicrophonePermission();

//       if (
//         cameraPermission === 'authorized' &&
//         microphonePermission === 'authorized'
//       ) {
//         setHasPermission(true);
//       } else {
//         Alert.alert(
//           'Permissions Required',
//           'Camera and microphone permissions are required.',
//         );
//       }
//     };

//     requestPermissions();
//   }, []);
//   if (!device) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text>Loading camera...</Text>
//       </View>
//     );
//   }

//   if (!hasPermission) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text>Waiting for permissions...</Text>
//       </View>
//     );
//   }
//   // if (!device) return <View />; // Wait for the camera device to load
//   const startRecording = async () => {
//     if (camera.current) {
//       const video = await camera.current.startRecording({
//         onRecordingFinished: video => console.log('Recording finished:', video),
//         onRecordingError: error => console.error('Recording error:', error),
//       });
//     }
//   };

//   const stopRecording = async () => {
//     if (camera.current) {
//       await camera.current.stopRecording();
//     }
//   };

//   return (
//     <View>
//       <Text>ASdasdsadsad</Text>
//       <View style={{flex: 1}}>
//         <Camera
//           ref={camera}
//           style={{flex: 1}}
//           device={device}
//           isActive={true}
//           video={true}
//           audio={true}
//         />
//         <Button title="Start Recording" onPress={startRecording} />
//         <Button title="Stop Recording" onPress={stopRecording} />
//       </View>
//     </View>
//   );
// };

// export default VideoRecording;

// const styles = StyleSheet.create({});
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Camera,
  getCameraDevice,
  useCameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import {PERMISSIONS, request} from 'react-native-permissions';

const VideoRecording = () => {
  const camera = useRef(null);
  const devices = Camera.getAvailableCameraDevices();
  const [currentCamera, setCurrentCamera] = useState('back');
  const device = getCameraDevice(devices, currentCamera);
  const [isRecording, setIsRecording] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  // const device = useCameraDevice('front')

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();
      const [cameraReady, setCameraReady] = useState(false);
      
      if (
        cameraPermission === 'granted' &&
        microphonePermission === 'granted'
      ) {
        setHasPermission(true);
      } else {
        Alert.alert(
          'Permissions Required',
          'Camera and microphone permissions are required.',
        );
      }
    };

    requestPermissions();
  }, []);

  const startRecording = async () => {
    if (camera.current && !isRecording && cameraReady) {
      setIsRecording(true);
      try {
        await camera.current.startRecording({
          onRecordingFinished: video => console.log('Recording finished:', video),
          onRecordingError: error => console.error('Recording error:', error),
        });
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    }
  };

  const stopRecording = async () => {
    if (camera.current && isRecording) {
      setIsRecording(false);
      try {
        await camera.current.stopRecording();
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }
  };

  const toggleCamera = () => {
    setCurrentCamera(prev => (prev === 'back' ? 'front' : 'back'));
  };
  const onCameraReady = () => {
    setCameraReady(true); // Camera is ready to start recording
  };
  return (
    <View style={{flex: 1}}>
      {/* <Camera
        ref={camera}
        style={{flex: 1}}
        device={device}
        isActive={true}
        video={true}
        audio={true}
        onReady={onCameraReady}
      /> */}
      <View style={styles.controls}>
        <Button
          title={isRecording ? 'Stop Recording' : 'Start Recording'}
          onPress={isRecording ? stopRecording : startRecording}
        />
        <Button title="Change Camera" onPress={toggleCamera} />
      </View>
    </View>
  );
};

export default VideoRecording;

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

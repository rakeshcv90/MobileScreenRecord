import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenRecorder from 'react-native-screen-mic-recorder';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Video from 'react-native-video';

const ScreenRecording = () => {
  const [status, setStatus] = useState('idle');
  const [mediaUri, setMediaUri] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);
  const startRecording = async () => {
    try {
      const options = {
        mic: true, // Enable mic recording
        androidBannerStopRecordingHandler: uri => {
          console.log(
            'Recording stopped from Android notification banner:',
            uri,
          );
          if (uri) {
            // setRecordedUri(uri);
            // setIsRecording(false);
          } else {
            console.warn('No URI returned from the recording');
          }
        },
      };

      const recordingStatus = await ScreenRecorder.startRecording(options);

      if (recordingStatus === 'started') {
        setStatus('recording');
        //   setIsRecording(true);
        //   Alert.alert('Recording started!');
      } else if (recordingStatus === 'userDeniedPermission') {
        Alert.alert(
          'Permission denied',
          'Please grant permission to record the screen.',
        );
      } else {
        Alert.alert('Recording failed', 'Unknown error occurred.');
      }
    } catch (error) {
      console.warn('Error starting recording:', error);
      Alert.alert('Error', 'There was an issue starting the recording.');
    }
  };

  const stopRecording = async () => {
    try {
      const uri = await ScreenRecorder.stopRecording();
      console.log('Recording stopped. URI:', uri);

      setMediaUri(uri);
      setStatus('stopped');
      setIsPreviewVisible(true);
      //   Alert.alert('Recording stopped!', `Video saved at: ${uri}`);
    } catch (error) {
      console.warn('Error stopping recording:', error);
      Alert.alert(
        'Error',
        `There was an issue stopping the recording: ${error.message}`,
      );
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        if (
          granted['android.permission.RECORD_AUDIO'] === 'granted' &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' &&
          granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted'
        ) {
          console.log('Android permissions granted');
        } else {
          console.log('Android permissions denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (Platform.OS === 'ios') {
      try {
        const micPermission = await request(PERMISSIONS.IOS.MICROPHONE);
        const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);

        if (
          micPermission === RESULTS.GRANTED &&
          cameraPermission === RESULTS.GRANTED
        ) {
          console.log('iOS permissions granted');
        } else {
          console.log('iOS permissions denied');
        }
      } catch (err) {
        console.warn('Error requesting iOS permissions:', err);
      }
    }
  };

  const handleClosePreview = () => {
    setIsPreviewVisible(false);
    setMediaUri(null);
    setStatus('idle');
  };

  const handleDownloadVideo = uri => {
    console.log('Download video:', uri);
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Screen Recorder</Text>
        <Text style={styles.subtitle}>Record your screen with ease</Text>
        <Text style={styles.statusText}>Status: {status}</Text>
        <View style={styles.buttonContainer}>
          {status === 'idle' && (
            <TouchableOpacity
              style={styles.startButton}
              onPress={startRecording}>
              <Text style={styles.buttonText}>Start Recording</Text>
            </TouchableOpacity>
          )}
          {status === 'recording' && (
            <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
              <Text style={styles.buttonText}>Stop Recording</Text>
            </TouchableOpacity>
          )}
        </View>

        {status === 'stopped' && mediaUri && isPreviewVisible && (
          <View style={styles.videoContainer}>
            <Video
              source={{uri: mediaUri}}
              style={styles.videoPlayer}
              controls
              resizeMode="contain"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClosePreview}>
                <Text style={styles.buttonText}>Close Preview</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => handleDownloadVideo(mediaUri)}>
                <Text style={styles.buttonText}>Download Video</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ScreenRecording;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(135deg, #6a11cb, #2575fc)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ff6f61',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#e53935',
    padding: 12,
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 10,
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  videoContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  videoPlayer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});

import React from 'react';
import { FileSystem } from 'expo';

import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';


export class SendMediaScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    newPhotos: false,
    type: 'back',
  };

  async componentDidMount() {
    let that = this;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    that.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  handleMountError = ({ message }) => console.error(message);

  onPictureSaved = async photo => {
    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
    });
    this.setState({ newPhotos: true });
  }

  render() {

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.7,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === 'back'
                        ? 'front'
                        : 'back',
                  });
                }}>
                <Image style={{margin: 10}} source={require('../assets/images/cameraFlipIcon.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.takePicture}
                style={{
                  flex: 1.2,
                  alignSelf: 'flex-end',
                  alignItems: 'flex-start',
                }}>
                <Image style={{ width: 70, height: 70, margin: 10 }} source={require('../assets/images/cameraButton.png')} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

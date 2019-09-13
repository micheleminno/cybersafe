import React from 'react';
import * as FileSystem from 'expo-file-system';

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

import moment from "moment";


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

    let currentDate = new Date();
    let formattedDate = moment(new Date()).format("YYYY-MM-DD_hh:mm:ss")
    let toLocation = FileSystem.documentDirectory + 'photos/' + formattedDate + '.jpg';

    await FileSystem.moveAsync({
      from: photo.uri,
      to: toLocation,
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
          <Camera ref={ref => {
            this.camera = ref;
          }} style={{ flex: 1 }} type={this.state.type}>
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

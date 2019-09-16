import React from 'react';
import * as FileSystem from 'expo-file-system';

import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  CameraRoll,
  ScrollView
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

    CameraRoll.saveToCameraRoll(photo.uri);
    this.setState({ newPhotos: true });
  }

  _renderPhotos(photos) {
    let images = [];
    for (let { node: photo } of photos.edges) {
      images.push(
        <Image
          source={photo.image}
          resizeMode="contain"
          style={{ height: 100, width: 100, resizeMode: 'contain' }}
        />
      );
    }
    return images;
  }

  async _getPhotosAsync() {

    let photos = await CameraRoll.getPhotos({ first: 4 });
    this.setState({ photos });
  }

  render() {

    const styles = require('../assets/style.json');
    let { photos } = this.state;

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
            <View>
            <ScrollView style={styles.container}>
             {photos
               ? this._renderPhotos(photos)
               : <Text style={styles.content}>Fetching photos...</Text>}
           </ScrollView>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

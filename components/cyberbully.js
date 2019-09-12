import React from 'react';
import { Button, Image, View, Text, ScrollView, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export class CyberbullyScreen extends React.Component {
  
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: 'Chi è il cyberbullo',

      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() {

    const styles = require('../assets/style.json');
    
    return (
      <ScrollView style={styles.container}>
         
        <Image
          source={require('../assets/images/schermata_1.jpg')}
          style={{ width: 300, height: 300, marginBottom: 30 }}
        />
         <Text style={{fontSize:16}}>Blah blah blah</Text>
        <Image
          source={require('../assets/images/schermata_2.jpg')}
          style={{ width: 300, height: 300, marginBottom: 30 }}
        />
        <Button
          title="Torna alla home"
          onPress={() => this.props.navigation.goBack()}
        />
      </ScrollView>
    );
  }
}
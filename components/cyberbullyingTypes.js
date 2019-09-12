import React from 'react';
import { Button, Image, View, Text, FlatList, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export class TypesScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: 'Tipi di cyberbullismo',

      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() {

    const data = require('../data.json');
    const styles = require('../assets/style.json');
    
    return (
      <View style={styles.container}>
        <FlatList
          data={data.types}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Text style={styles.itemTitle}>{item.key}</Text>
              <Text style={styles.content}>{item.value}</Text>
            </View>
          )}
        />
        <Button
          title="Torna alla home"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
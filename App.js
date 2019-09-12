import React from 'react';
import { Button, Image, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { TypesScreen } from './components/cyberbullyingTypes';
import { CyberbullyScreen } from './components/cyberbully';
import { InfoScreen } from './components/info';
import { SendMediaScreen } from './components/sendMedia';

class LogoTitle extends React.Component {
  render() {
    return <Text style={{ fontSize: 28, fontStyle: 'italic' }}>CS</Text>;
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: <LogoTitle />,
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('Info')}
          title="Info"
          color="#dddd"
        />
      ),
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, paddingBottom: 20, color: 'red' }}>
          CyberSafe
        </Text>
        <Image
          source={require('./assets/images/stop_cyberbullismo.jpg')}
          style={{ width: 250, height: 250, marginBottom: 30 }}
        />
        <Button
          title="Tipi di cyberbullismo"
          onPress={() => {
            this.props.navigation.navigate('Types');
          }}
        />
        <Button
          title="Chi è il cyberbullo"
          onPress={() => {
            this.props.navigation.navigate('Cyberbully');
          }}
        />
        <Button
          title="Spedisci foto o video alla polizia"
          onPress={() => {
            this.props.navigation.navigate('SendMedia');
          }}
        />
      </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Types: {
      screen: TypesScreen,
    },
    Cyberbully: {
      screen: CyberbullyScreen,
    },
    SendMedia: {
      screen: SendMediaScreen,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Info: {
      screen: InfoScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

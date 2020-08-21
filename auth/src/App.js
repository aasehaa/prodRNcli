import firebase from 'firebase';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Header, Button, Spinner} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {loggedIn: null};

  UNSAFE_componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyBikbi_r3QQvySQobXIb7tAyvcWaXdjlIo',
        authDomain: 'auth-aab43.firebaseapp.com',
        databaseURL: 'https://auth-aab43.firebaseio.com',
        projectId: 'auth-aab43',
        storageBucket: 'auth-aab43.appspot.com',
        messagingSenderId: '177364891632',
        appId: '1:177364891632:web:17596ad8c6df8024748f35',
        measurementId: 'G-6XYNVJ0CRF',
      });
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <Button onPress={() => firebase.auth().signOut}>Log out</Button>;
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;

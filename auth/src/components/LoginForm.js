import firebase from 'firebase';
import React, {Component} from 'react';
import {Button, Card, CardSection, Input, Spinner} from './common';
import {Text} from 'react-native';

class LoginForm extends Component {
  state = {email: '', password: '', error: '', loading: false};

  onButtonPress() {
    const {email, password} = this.state;

    this.setState({error: '', loading: true});

    firebase.auth().signInWithEmailAndPassword(email, password).then(this.onLoginSuccess.bind(this).catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(this.onLoginSuccess.bind(this)).catch(this.onLoginFail.bind(this)); 
      }); 
  
  }
  

  onLoginFail() {
      this.setState({ 
          error: 'Authentication failed', 
          loading: false
       }); 
  }

  onLoginSuccess() {
    //clear error messages
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
          />
        </CardSection>
        <CardSection>
          <Input
            secure={true}
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
          />
        </CardSection>

        <Text style={styles.errorText}>{this.state.error}</Text>

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorText: {
    color: 'red',
    fontSize: 20,
    alignSelf: 'center',
  },
};

export default LoginForm;

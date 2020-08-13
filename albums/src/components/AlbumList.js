import React, {Component} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

class AlbumList extends Component {
  componentWillMount() {
    axios
      .fetch('https://rallycoding.herokuapp.com/api/music_albums')
      .then((response) => response.json())
      .then((responseData) => console.log(responseData));
  }

  render() {
    return (
      <View>
        <Text>Album List!!!</Text>
      </View>
    );
  }
}

export default AlbumList;

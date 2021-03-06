import React, {
  ActivityIndicatorIOS,
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import Dashboard from './Dashboard';
import api from '../Utils/api';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }
  handleChange(e) {
    this.setState({
      username: e.nativeEvent.text
    })
  }
  handleSubmit() {
    // update our indicatorIOS spinner
    this.setState({
      isLoading: true
    });
    console.log('SUBMIT', this.state.username);
    // fetch data from github
    api.getBio(this.state.username)
      .then((res) => {
        console.log(res);
        if(res.message === 'Not Found') {
          this.setState({
            error: 'User not found',
            isLoading: false
          })
        } else {
          this.props.navigator.push({
            title: res.name || "Select an Option",
            component: Dashboard,
            passProps: {userInfo: res}
          });
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          })
        }
      })
    //
  }
  render() {
    let showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    )
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search for a Github User</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={(e) => this.handleChange(e)} />
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.handleSubmit()}
          underlayColor="white">
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#111"
          size="large">
        </ActivityIndicatorIOS>
        {showErr}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})

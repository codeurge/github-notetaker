import React, {
  Component,
  StyleSheet,
  View,
  WebView
} from 'react-native';

export default class Web extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView source={{uri: this.props.url}} />
      </View>

    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column'
  }
});

Web.propTypes = {
  url: React.PropTypes.string.isRequired
}

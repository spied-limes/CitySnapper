import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';
import { setDummyData, watchUserData } from '../redux/app-redux';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      dummyData: this.props.dummyData,
      userData: {},
    };
    this.props.watchUser();
  }
  componentDidMount() {
    // console.log('this.props.userData[1]: ', this.props.userData[1]);
  }

  componentDidUpdate() {
    // console.log('this.props.userData[1]: ', this.props.userData[1]);
  }

  onSetDummyDataPress = () => {
    this.props.setDummy(this.state.dummyData);
  };

  render() {
    // console.log('\nthis.props', this.props);
    // console.log('this.state: ', this.state);
    console.log('this.props.userData: ', this.props.userData);

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={{ paddingTop: 100 }}>{this.props.dummyData}</Text>
        <View style={styles.welcomeContainer} />
        <TextInput
          style={{ borderWidth: 1, width: 200, height: 40 }}
          value={this.state.dummyData}
          onChangeText={text => {
            this.setState({ dummyData: text });
          }}
        />
        <Button title="Set DummyData" onPress={this.onSetDummyDataPress} />
        {this.props.userData.length ? (
          <View>
            <Text>{this.props.userData[1].address}</Text>
            <Text>{this.props.userData[1].firstName}</Text>
            <Text>{this.props.userData[1].lastName}</Text>
          </View>
        ) : (
          <View />
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    dummyData: state.dummyData,
    userData: state.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDummy: text => {
      dispatch(setDummyData(text));
    },
    watchUser: () => dispatch(watchUserData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

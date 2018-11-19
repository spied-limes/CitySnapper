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
  // Button,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';
import { setDummyData, watchUserData } from '../redux/app-redux';
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label,
} from 'native-base';
import * as firebase from 'firebase';

import { firebaseConfig, signUpuser, loginUser, db } from '../App.js';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      // dummyData: this.props.dummyData,
      // userData: {},
      email: '',
      password: '',
    };
    // this.props.watchUser();
    this.signUpUser = this.signUpUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }
  componentDidMount() {
    // console.log('this.props.userData[1]: ', this.props.userData[1]);
  }

  componentDidUpdate() {
    // console.log('this.props.userData[1]: ', this.props.userData[1]);
  }

  // onSetDummyDataPress = () => {
  //   this.props.setDummy(this.state.dummyData);
  // };

  signUpUser(email, password) {
    try {
      if (this.state.password.length < 6) {
        console.log('Password must be longer than 6 characters');
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString());
    }
  }

  loginUser(email, password) {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user) {
          console.log(user);
        });
    } catch (error) {
      console.log(error.toString());
    }
  }

  render() {
    // console.log('\nthis.props', this.props);
    // console.log('this.state: ', this.state);
    console.log('this.props.userData: ', this.props.userData);

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Container>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
              />
            </Item>

            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
              />
            </Item>

            <Button
              style={{ marginTop: 15 }}
              full
              rounded
              success
              onPress={() =>
                this.loginUser(this.state.email, this.state.password)
              }
            >
              <Text style={{ color: 'white' }}>Login</Text>
            </Button>
            <Button
              style={{ marginTop: 15 }}
              full
              rounded
              primary
              onPress={() =>
                this.signUpUser(this.state.email, this.state.password)
              }
            >
              <Text style={{ color: 'white' }}>Sign Up</Text>
            </Button>
          </Form>
        </Container>
        {/* <Text style={{ paddingTop: 100 }}>{this.props.dummyData}</Text>
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
        )} */}
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
    // justifyContent: 'center',
  },
  loginFields: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
    justifyContent: 'center',
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

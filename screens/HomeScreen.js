import React from 'react';
import {
  ImageBackground,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  // Button,
} from 'react-native';
import { navigate } from 'react-navigation';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';
import { watchUserData, watchActivityData } from '../redux/app-redux';
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Header,
  Label,
  Tab,
  Tabs,
} from 'native-base';
import * as firebase from 'firebase';
import { writeUserData } from '../firebase/firebaseConfig';
import Layout from '../constants/Layout';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      // userData: {},
      email: '',
      password: '',
      logInForm: true,
    };
    // this.props.watchUser();
    this.loginUser = this.loginUser.bind(this);
  }
  componentDidMount() {
    // console.log('this.props.userData[1]: ', this.props.userData[1]);
  }

  componentDidUpdate() {
    // console.log('this.props.userData[1]: ', this.props.userData[1]);
  }

  async loginUser(email, password) {
    // unimplemented navigate to map screen from login successful
    // const { navigate } = this.props.navigation

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user) {
          console.log('userLoggedIn: ', user);
        });

      // alert box to user---------

      Alert.alert(
        'Login Status',
        'Login Successful',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              this.setState({
                email: '',
                password: '',
              });
            },
          },
        ],
        {
          cancelable: false,
        }
      );
    } catch (error) {
      console.log(error.toString());
      Alert.alert(
        'Login Status',
        'Login Failed',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }

  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      firebase.auth().currentUser &&
        console.log('currentUser: ', firebase.auth().currentUser.uid);
      // navigate('Auth');

      // alert box to user---------

      Alert.alert(
        'Logout Status',
        'Logout Successful',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              this.setState({
                email: '',
                password: '',
              });
            },
          },
        ],
        {
          cancelable: false,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // console.log('\nthis.props', this.props);
    // console.log('this.state: ', this.state);
    // console.log("this.props.userData: ", this.props.userData);
    // console.log("this.props.activities: ", this.props.activities);
    // console.log(
    //   "this.props.navigation.navigate",
    //   this.props.navigation.navigate
    // );

    const userId = firebase.auth().currentUser
      ? firebase.auth().currentUser.uid
      : undefined;
    return (
      <ScrollView style={styles.container}>
        <Container>
          <Tabs style={{ paddingVertical: 25 }}>
            <Tab heading="Log In">
              <ImageBackground
                source={require('../assets/images/BridgeToManhattan.jpg')}
                style={styles.welcomeImage}
              >
                {!userId ? (
                  <Form style={styles.formContainer}>
                    <Item floatingLabel>
                      <Label style={styles.inputText}>Email</Label>
                      <Input
                        style={styles.inputText}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={email => this.setState({ email })}
                      />
                    </Item>

                    <Item floatingLabel>
                      <Label style={styles.inputText}>Password</Label>
                      <Input
                        style={styles.inputText}
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
                      onPress={() => {
                        console.log('signUp pressed');
                        this.props.navigation.navigate('SignUp');
                      }}
                    >
                      <Text style={{ color: 'white' }}>Sign Up</Text>
                    </Button>
                  </Form>
                ) : (
                  <Form style={styles.formContainer}>
                    <Button
                      style={{ marginTop: 15 }}
                      full
                      rounded
                      primary
                      onPress={() => this.signOutUser()}
                    >
                      <Text style={{ color: 'white' }}>Log Out</Text>
                    </Button>
                  </Form>
                )}
              </ImageBackground>
            </Tab>

            {/* ########## SIGN UP TAB ########## */}

            <Tab heading="Sign Up">
              <ImageBackground
                source={require('../assets/images/BridgeToManhattan.jpg')}
                style={styles.welcomeImage}
              >
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

                  <Item floatingLabel>
                    <Label>First Name</Label>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={firstName => this.setState({ firstName })}
                    />
                  </Item>

                  <Item floatingLabel>
                    <Label>Last Name</Label>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={lastName => this.setState({ lastName })}
                    />
                  </Item>

                  <Item floatingLabel>
                    <Label>UserName</Label>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={username => this.setState({ username })}
                    />
                  </Item>

                  <Item floatingLabel>
                    <Label>Street Address</Label>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={streetAddress =>
                        this.setState({ streetAddress })
                      }
                    />
                  </Item>

                  <Item floatingLabel>
                    <Label>City</Label>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={city => this.setState({ city })}
                    />
                  </Item>

                  <Item floatingLabel>
                    <Label>State</Label>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={state => this.setState({ state })}
                    />
                  </Item>

                  <Item floatingLabel>
                    <Label>Zip Code</Label>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={zipCode => this.setState({ zipCode })}
                    />
                  </Item>

                  {/* the following should be a binary choice button or something
            <Item floatingLabel>
              <Label>Over 18?</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={isAdult => this.setState({ isAdult })}
              />
            </Item> */}

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
              </ImageBackground>
            </Tab>
          </Tabs>
        </Container>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    activities: state.activities,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    watchUser: () => dispatch(watchUserData()),
    watchActivities: () => dispatch(watchUserData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  welcomeImage: {
    width: undefined,
    height: '100%',
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 100,
    justifyContent: 'center',
    alignContent: 'flex-end',
  },
  loginFields: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  inputText: {
    color: 'white',
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
});

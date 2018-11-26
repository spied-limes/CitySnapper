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
import {
  watchUserData,
  watchActivityData,
  watchPlaceData,
} from '../redux/app-redux';
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
import { updateUserActivityData } from '../firebase/firebaseConfig';
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
      // logInForm: true,
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

      //below is prototype of activity object key =activityId in DB
      let userId = await firebase.auth().currentUser.uid;
      await updateUserActivityData('timesSquare', 1, {
        complete: false,
        active: true,
        points: 1,
      });
      // end of activity object prototype

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
              this.props.navigation.navigate('IntroSlider');
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
        [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.navigate('IntroSlider');

              console.log('OK Pressed');
            },
          },
        ],
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
    // const userId = firebase.auth().currentUser
    // ? firebase.auth().currentUser.uid
    // : undefined;
    console.log('this.props.places[0]: ', this.props.places[0]);
    return (
      <Container style={styles.container}>
        <ImageBackground
          source={require('../assets/images/BridgeToManhattan.jpg')}
          style={styles.welcomeImage}
        >
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
            {/* <Button
              style={{ marginTop: 15 }}
              full
              rounded
              info
              onPress={() => this.props.navigation.navigate('IntroSlider')}
            >
              <Text style={{ color: 'white' }}>Proceed as Guest</Text>
            </Button> */}
            {/* <Button
              style={{ marginTop: 15 }}
              full
              rounded
              disabled
              primary
              onPress={() => this.signOutUser()}
            >
              <Text style={{ color: "white" }}>Log Out</Text>
            </Button> */}
          </Form>
          {/* ##### Navigate to Map Screen for Auto-location */}
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    activities: state.activities,
    places: state.places,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    watchUser: () => dispatch(watchUserData()),
    watchActivities: () => dispatch(watchUserData()),
    watchPlaces: () => dispatch(watchPlaceData()),
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

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
  Alert,
  // Button,
} from 'react-native';
import { navigate } from 'react-navigation';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';
import { watchUserData, watchActivityData } from '../redux/app-redux';
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
import { writeUserData } from '../firebase/firebaseConfig';

class SignUpScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      activities: null,
      latitude: null /*want this to be current location*/,
      longitude: null /*want this to be current location*/,
    };

    this.signUpUser = this.signUpUser.bind(this);
  }

  async signUpUser(email, password) {
    try {
      if (this.state.password.length < 6) {
        Alert.alert(
          'Sign Up Failed',
          'Password must be longer than 6 characters',
          [
            // {
            //   text: 'Cancel',
            //   onPress: () => console.log('Cancel Pressed'),
            //   style: 'cancel',
            // },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          {
            cancelable: false,
          }
        );
        console.log('Password must be longer than 6 characters');
        return;
      }
      // create user in firebase auth page (email, pass, userId)
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // capture current userID directly after creation
      const userId = firebase.auth().currentUser.uid;
      console.log('HomeScreen auth() userId: ', userId);

      // custom func that (hopefully) writes a user entry in database matched by userId
      await writeUserData(userId, {
        name: this.state.name,
        email: this.state.email,
        activities: {
          activiyId: null,
        },
        latitude: '',
        longitude: '',
      });

      // alert box to user---------
      Alert.alert(
        'Sign Up Status',
        'Sign Up Successful',
        [
          // {
          //   text: 'Cancel',
          //   onPress: () => console.log('Cancel Pressed'),
          //   style: 'cancel',
          // },
          {
            text: 'OK',
            onPress: () => this.props.navigation.navigate('IntroSlider'),
          },
        ],
        {
          cancelable: false,
        }
      );
    } catch (error) {
      console.log(error.toString());
      Alert.alert(
        'Sign Up Status',
        'Sign Up Failed',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }

  render() {
    // console.log('\nthis.props', this.props);
    // console.log('this.state: ', this.state);
    this.props.userData.name &&
      console.log('this.props.userData: ', this.props.userData.name);
    // console.log('this.props.activities: ', this.props.activities);

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

            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={name => this.setState({ name })}
              />
            </Item>

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

          <View>{this.props.activities}</View>
        </Container>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
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
)(SignUpScreen);

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
    paddingTop: 50,
    justifyContent: 'center',
    paddingBottom: 450,
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

{
  /*  ##### TAB TEST SETUP

  <Tab heading="Sign Up">
  <ImageBackground
    source={require("../assets/images/BridgeToManhattan.jpg")}
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
            </Item> */
}

//       <Button
//         style={{ marginTop: 15 }}
//         full
//         rounded
//         primary
//         onPress={() =>
//           this.signUpUser(this.state.email, this.state.password)
//         }
//       >
//         <Text style={{ color: "white" }}>Sign Up</Text>
//       </Button>
//     </Form>
//   </ImageBackground>
// </Tab> */}

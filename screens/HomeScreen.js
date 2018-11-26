/* eslint-disable no-use-before-define */
/* eslint-disable quotes */
import React from "react";
import {
  Animated,
  ImageBackground,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
  // Button,
} from "react-native";
import { navigate } from "react-navigation";
import { connect } from "react-redux";
import { watchUserData, watchActivityData } from "../redux/app-redux";
import {
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item
} from "native-base";
import { loginUser, signUpUser } from "../components/UserEntryFunctions";

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // userData: {},
      email: "",
      password: "",
      name: "",
      logInForm: true
    };
  }

  /*
    ____                 __
   / __ \___  ____  ____/ /__  _____
  / /_/ / _ \/ __ \/ __  / _ \/ ___/
 / _, _/  __/ / / / /_/ /  __/ /
/_/ |_|\___/_/ /_/\__,_/\___/_/
*/
  render() {
    return (
      <Container style={styles.container}>
        <ImageBackground
          source={require("../assets/images/nyc.gif")}
          style={styles.welcomeImage}
        >
          <View style={styles.formBox}>
            <Image
              style={styles.logoImage}
              source={require("../assets/images/fake_logo.png")}
            />
            <View style={styles.toggleInputView}>
              <TouchableOpacity
                onPress={() => {
                  console.log("left button pressed");
                  LayoutAnimation.easeInEaseOut();
                  this.setState({ logInForm: true });
                }}
              >
                <Text style={styles.toggleButtons}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log("right button pressed");
                  LayoutAnimation.easeInEaseOut();
                  this.setState({ logInForm: false });
                }}
              >
                <Text style={styles.toggleButtons}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            {/*
    ______                   ______
   / ____/___  _________ ___/_  __/__  _________  ____ ________  __
  / /_  / __ \/ ___/ __ `__ \/ / / _ \/ ___/ __ \/ __ `/ ___/ / / /
 / __/ / /_/ / /  / / / / / / / /  __/ /  / / / / /_/ / /  / /_/ /
/_/    \____/_/  /_/ /_/ /_/_/  \___/_/  /_/ /_/\__,_/_/   \__, /
                                                          /____/
            */}
            {this.state.logInForm ? (
              <View>
                <Form style={styles.formBGColor}>
                  <Item>
                    <Icon active name="at" />
                    <Input
                      placeholder="E-Mail"
                      style={styles.inputText}
                      autoSugges
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={email => this.setState({ email })}
                    />
                  </Item>
                  <Item>
                    <Icon active name="lock" />
                    <Input
                      placeholder="Password"
                      style={styles.inputText}
                      secureTextEntry={true}
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={password => this.setState({ password })}
                    />
                  </Item>
                </Form>
                <Button
                  style={{ marginTop: 15 }}
                  full
                  rounded
                  success
                  onPress={() =>
                    loginUser(this.state.email, this.state.password)
                  }
                >
                  <Text style={{ color: "white" }}>Login</Text>
                </Button>
              </View>
            ) : (
              <View>
                <Form style={styles.formBGColor}>
                  <Item>
                    <Icon active name="person" />
                    <Input
                      placeholder="Name"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={name => this.setState({ name })}
                    />
                  </Item>

                  <Item>
                    <Icon active name="at" />
                    <Input
                      placeholder="E-Mail"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={email => this.setState({ email })}
                    />
                  </Item>

                  <Item>
                    <Icon active name="lock" />
                    <Input
                      placeholder="Password"
                      secureTextEntry={true}
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={password => this.setState({ password })}
                    />
                  </Item>
                </Form>
                <Button
                  style={{ marginTop: 15 }}
                  full
                  rounded
                  primary
                  onPress={() =>
                    signUpUser(this.state.email, this.state.password)
                  }
                >
                  <Text style={{ color: "white" }}>Sign Up</Text>
                </Button>
              </View>
            )}
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    activities: state.activities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    watchUser: () => dispatch(watchUserData()),
    watchActivities: () => dispatch(watchUserData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcomeImage: {
    width: undefined,
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignContent: "center"
  },
  logoImage: {
    alignItems: "center",
    width: 250,
    height: 250
  },
  formBox: {
    marginHorizontal: 50,
    paddingBottom: 50,
    paddingHorizontal: 25
  },
  toggleInputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20
  },
  toggleButtons: {
    color: "white",
    fontFamily: "Abril-FatFace",
    fontSize: 36,
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 1 },
    textShadowRadius: 3
  },
  formBGColor: {
    paddingTop: 5,
    paddingBottom: 15,
    paddingRight: 25,
    backgroundColor: "white",
    borderRadius: 10
  },
  inputText: {
    color: "black"
  }
});

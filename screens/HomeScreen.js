/* eslint-disable no-use-before-define */
/* eslint-disable quotes */
import React from "react";
import {
  ImageBackground,
  Image,
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
      logInForm: false
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
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Container style={styles.container}>
          <ImageBackground
            source={require("../assets/images/nyc.gif")}
            style={styles.welcomeImage}
          >
            <View style={styles.formBox}>
              <Image
                source={require("../assets/images/fake_logo.png")}
                width="50"
                height="50"
              />
              <View style={styles.toggleInputView}>
                <TouchableOpacity
                  underlayColor="black"
                  onPress={() => {
                    console.log("right button pressed");
                    LayoutAnimation.easeInEaseOut();
                    this.setState({ logInForm: false });
                  }}
                >
                  <Text
                    style={[
                      styles.toggleButtons,
                      !this.state.logInForm && styles.toggleInputSelected
                    ]}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  active={true}
                  underlayColor="black"
                  onPress={() => {
                    console.log("left button pressed");
                    LayoutAnimation.easeInEaseOut();
                    this.setState({ logInForm: true });
                  }}
                >
                  <Text
                    style={[
                      styles.toggleButtons,
                      this.state.logInForm && styles.toggleInputSelected
                    ]}
                  >
                    Log In
                  </Text>
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
                  <Button
                    style={{ marginTop: 15 }}
                    full
                    rounded
                    warning
                    onPress={() =>
                      this.props.navigation.navigate("IntroSlider")
                    }
                  >
                    <Text style={{ color: "black" }}>Go to IntroSlider</Text>
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
                  {/*
    ____        __  __
   / __ )__  __/ /_/ /_____  ____  _____
  / __  / / / / __/ __/ __ \/ __ \/ ___/
 / /_/ / /_/ / /_/ /_/ /_/ / / / (__  )
/_____/\__,_/\__/\__/\____/_/ /_/____/
                */}
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
                  <Button
                    style={{ marginTop: 15 }}
                    full
                    rounded
                    warning
                    onPress={() => this.props.navigation.navigate("Map")}
                  >
                    <Text style={{ color: "black" }}>Go to Map</Text>
                  </Button>
                </View>
              )}
            </View>
          </ImageBackground>
        </Container>
      </KeyboardAvoidingView>
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
  toggleInputSelected: {
    color: "white"
  },
  toggleButtons: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: "Abril-FatFace",
    fontSize: 36,
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
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
    color: "black",
    fontFamily: "Roboto"
  }
});

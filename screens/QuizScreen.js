import {
  Button,
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React from "react";
import { List, ListItem } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "react-navigation";

const { width, height } = Dimensions.get("window");
let arrnew = [];
const jsonData = {
  quiz: {
    question1: {
      correctoption: "2009",
      options: {
        option1: "2001",
        option2: "2009",
        option3: "1949",
        option4: "1984"
      },
      question: "In what year did the area became largely car-free ?",
      answer:
        "The area became largely car-free in 2009, with temporary pedestrian plazas and the closing of Broadway to automobiles."
    },
    question2: {
      correctoption: "340,000",
      options: {
        option1: "340,000",
        option2: "1,000,000",
        option3: "530,000",
        option4: "97,234"
      },
      question:
        "How many pedestrians pass through Times Square on a typical day?",
      answer:
        "On an average day, around 340,000 pedestrains pass through Time Sqaure, which makes it one of the worlds most visited tourist attractions"
    },
    question3: {
      correctoption: "true",
      options: {
        option1: "true",
        option2: "false"
      },
      question: `"Sardi's" is a very popular restaurant on "Restaurant Row", where famous celebrity caricature drawings line the walls. True or false?`,
      answer: `Known for the hundreds of caricatures of show-business celebrities that adorn its walls, Sardi's opened at its current location on March 5, 1927.`
    },
    question4: {
      correctoption: "1904",
      options: {
        option1: "1976",
        option2: "1919",
        option3: "1904",
        option4: "1956"
      },
      question:
        "In what year did the New York Times bring this area to life, by opening its offices atop a subway station?",
      answer:
        "Times Square was renamed from Longacre Square in 1904, when the New York Times opened up an office in the area."
    },
    question5: {
      correctoption: "141 feet",
      options: {
        option1: "121 feet",
        option2: "168 feet",
        option3: "141 feet",
        option4: "500 feet"
      },
      question: `How far does the ball in Times Square drop on New Years Eve?`,
      answer: `The ball drops 141 feet on New Years Eve, and the New Years Eve party was originally invented by the New York Times, and celebrated in Trinity Church in 1904. The event was originally created to attract people to the area.`
    }
  }
};

/*
   ____        _       ________
  / __ \__  __(_)___  / ____/ /___ ___________
 / / / / / / / /_  / / /   / / __ `/ ___/ ___/
/ /_/ / /_/ / / / /_/ /___/ / /_/ (__  |__  )
\___\_\__,_/_/ /___/\____/_/\__,_/____/____/
*/

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.qno = 0;
    this.score = 0;
    const jdata = jsonData.quiz;
    arrnew = Object.keys(jdata).map(function(k) {
      return jdata[k];
    });
    //console.log(jdata);
    //console.log(arrnew[1].answers);

    this.state = {
      question: arrnew[this.qno].question,
      answers: arrnew[this.qno].answer,
      options: arrnew[this.qno].options,
      correctoption: arrnew[this.qno].correctoption,
      quizComplete: false,
      viewAnswers: false
    };
  }

  /*
   ____        _       __  ___     __  __              __
  / __ \__  __(_)___  /  |/  /__  / /_/ /_  ____  ____/ /____
 / / / / / / / /_  / / /|_/ / _ \/ __/ __ \/ __ \/ __  / ___/
/ /_/ / /_/ / / / /_/ /  / /  __/ /_/ / / / /_/ / /_/ (__  )
\___\_\__,_/_/ /___/_/  /_/\___/\__/_/ /_/\____/\__,_/____/
  */

  prev() {
    if (this.qno > 0) {
      this.qno--;
      this.setState({
        question: arrnew[this.qno].question,
        options: arrnew[this.qno].options,
        correctoption: arrnew[this.qno].correctoption
      });
    }
  }
  next() {
    if (this.qno < arrnew.length - 1) {
      this.qno++;
      this.setState({
        question: arrnew[this.qno].question,
        options: arrnew[this.qno].options,
        correctoption: arrnew[this.qno].correctoption
      });
    } else {
      this.setState({
        quizComplete: true
      });
    }
  }

  checkAns(choice, ans) {
    if (choice === ans) {
      console.log("correct");
      this.score += 1;
    }
    this.next();
  }

  resetGame() {
    this.score = 0;
    this.qno = 0;

    this.setState({
      question: arrnew[this.qno].question,
      options: arrnew[this.qno].options,
      correctoption: arrnew[this.qno].correctoption,
      quizComplete: false,
      viewAnswers: false
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    let _this = this;
    const currentOptions = this.state.options;
    const correctoption = this.state.correctoption;

    /*
    ___                                  ____        __  __
   /   |  ____  ______      _____  _____/ __ )__  __/ /_/ /_____  ____  _____
  / /| | / __ \/ ___/ | /| / / _ \/ ___/ __  / / / / __/ __/ __ \/ __ \/ ___/
 / ___ |/ / / (__  )| |/ |/ /  __/ /  / /_/ / /_/ / /_/ /_/ /_/ / / / (__  )
/_/  |_/_/ /_/____/ |__/|__/\___/_/  /_____/\__,_/\__/\__/\____/_/ /_/____/
*/
    const options = Object.keys(currentOptions).map(function(k) {
      return (
        <TouchableOpacity
          key={k}
          style={styles.answerButton}
          onPress={() => _this.checkAns(currentOptions[k], correctoption)}
        >
          <Text style={styles.answerText}>{currentOptions[k]}</Text>
        </TouchableOpacity>
      );
    });
    /*
    ____                  ____       _____
   / __ \___  _______  __/ / /______/ ___/_____________  ___  ____
  / /_/ / _ \/ ___/ / / / / __/ ___/\__ \/ ___/ ___/ _ \/ _ \/ __ \
 / _, _/  __(__  ) /_/ / / /_(__  )___/ / /__/ /  /  __/  __/ / / /
/_/ |_|\___/____/\__,_/_/\__/____//____/\___/_/   \___/\___/_/ /_/
*/

    if (this.state.quizComplete && !this.state.viewAnswers) {
      return (
        <ImageBackground
          source={require("../assets/images/timesSquare.jpg")}
          style={styles.container}
        >
          <View style={styles.bgColorOverlay}>
            <View style={styles.results}>
              <Text style={styles.resultsScore}>
                Congrats! You got {this.score}/5 correct.
              </Text>
            </View>
            <View style={styles.retakeChoiceBox}>
              <View style={styles.retakeTextBox}>
                <Text style={styles.retakeText}>Retake Quiz?</Text>
              </View>

              <View style={styles.retakeChoices}>
                <TouchableOpacity
                  style={styles.answerButton}
                  onPress={() => this.resetGame()}
                >
                  <Text style={styles.answerText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.answerButton}
                  onPress={() => navigate("CheckIn", { name: "Times Square" })}
                >
                  <Text style={styles.answerText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.viewAnswersBox}>
              <Text>Answers</Text>
              <TouchableOpacity
                style={styles.answerButton}
                onPress={() => {
                  this.setState({
                    viewAnswers: true
                  });
                }}
              >
                <Text style={styles.answerText}>View All Answers</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      );
    }
    /*
 _    ___              ___
| |  / (_)__ _      __/   |  ____  ______      _____  __________
| | / / / _ \ | /| / / /| | / __ \/ ___/ | /| / / _ \/ ___/ ___/
| |/ / /  __/ |/ |/ / ___ |/ / / (__  )| |/ |/ /  __/ /  (__  )
|___/_/\___/|__/|__/_/  |_/_/ /_/____/ |__/|__/\___/_/  /____/
*/
    if (this.state.viewAnswers) {
      return (
        <ImageBackground
          source={require("../assets/images/timesSquare.jpg")}
          style={styles.container}
        >
          <View style={styles.bgColorOverlay}>
            <View style={styles.navBox}>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("CheckIn")}
                >
                  <Ionicons
                    name={
                      Platform.OS === "ios" ? `ios-arrow-back` : "md-arrow-back"
                    }
                    size={40}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.quizLocation}>Answers</Text>
              </View>
            </View>
            <View style={styles.longAnswersBox}>
              {arrnew.map(i => {
                return (
                  <View key={i["answer"]}>
                    <Text style={styles.longAnswers}>{i["answer"]}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.returnToCheckInBox}>
              <TouchableOpacity
                style={styles.answerButton}
                onPress={() => this.props.navigation.navigate("CheckIn")}
              >
                <Text style={styles.answerText}>Return to Check In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      );
    }

    /*
   ____        _       ____                 __
  / __ \__  __(_)___  / __ \___  ____  ____/ /__  _____
 / / / / / / / /_  / / /_/ / _ \/ __ \/ __  / _ \/ ___/
/ /_/ / /_/ / / / /_/ _, _/  __/ / / / /_/ /  __/ /
\___\_\__,_/_/ /___/_/ |_|\___/_/ /_/\__,_/\___/_/
*/
    return (
      <ImageBackground
        source={require("../assets/images/timesSquare.jpg")}
        style={styles.container}
      >
        <View style={styles.bgColorOverlay}>
          {/* ########## NAV BOX ########## */}
          <View style={styles.navBox}>
            <View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("CheckIn", {
                    name: "Times Square"
                  })
                }
              >
                <Ionicons
                  name={
                    Platform.OS === "ios" ? `ios-arrow-back` : "md-arrow-back"
                  }
                  size={40}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.quizLocation}>Times Square</Text>
            </View>
          </View>
          <View style={styles.questionBox}>
            <Text style={styles.question}>{this.state.question}</Text>
          </View>
          <View style={styles.answerBox}>{options}</View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  oval: {
    width: (width * 90) / 100,
    borderRadius: 20,
    backgroundColor: "green"
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: undefined,
    resizeMode: "cover"
  },
  bgColorOverlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,.35)"
  },
  navBox: {
    marginTop: 35,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  quizLocation: {
    color: "white",
    fontFamily: "Abril-FatFace",
    fontSize: 24,
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 2
  },
  questionBox: {
    flex: 3,
    justifyContent: "center",
    paddingHorizontal: 50
  },
  question: {
    alignItems: "center",
    color: "white",
    fontSize: 28,
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -5, height: 5 },
    textShadowRadius: 5
  },
  answerBox: {
    flex: 6,
    alignItems: "stretch"
  },
  answerButton: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  answerText: {
    color: "white",
    fontSize: 28,
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 2
  },
  results: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    paddingHorizontal: 20
  },
  resultsScore: {
    color: "white",
    fontSize: 30,
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -4, height: 4 },
    textShadowRadius: 4
  },
  retakeChoiceBox: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  retakeTextBox: {
    flex: 1
  },
  retakeText: {
    color: "white",
    fontSize: 24,
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -5, height: 5 },
    textShadowRadius: 5
  },
  retakeChoices: {
    flexDirection: "row",
    alignItems: "stretch",
    flex: 1,
    marginHorizontal: 25
  },
  viewAnswersBox: {
    flex: 2
  },
  viewAnswersButtons: {
    flex: 1,
    flexDirection: "row"
  },
  longAnswersBox: {
    flex: 8,
    justifyContent: "space-evenly"
  },
  longAnswers: {
    color: "white",
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 30,
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 3
  },
  returnToCheckInBox: {
    flex: 1
  },
  returnToCheckIn: {
    alignItems: "stretch"
  },
  welcome: {
    fontSize: 20,
    margin: 15,
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

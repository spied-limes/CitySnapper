import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");
let arrnew = [];
const jsonData = {
  quiz: {
    quiz1: {
      question1: {
        correctoption: "option4",
        options: {
          option1: "London Sqaure",
          option2: "Manhattan Sqaure",
          option3: "Big Apple Sqaure",
          option4: "Longacre Sqaure"
        },
        question: "What was the former name of Times Sqaure?"
      },
      question2: {
        correctoption: "option2",
        options: {
          option1: "2001",
          option2: "1917",
          option3: "1939",
          option4: "1956"
        },
        question: "When was Times Square’s NASDAQ sign installed?"
      }
    }
  }
};
export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.qno = 0;
    this.score = 0;

    const jdata = jsonData.quiz.quiz1;
    arrnew = Object.keys(jdata).map(function(k) {
      return jdata[k];
    });
    this.state = {
      question: arrnew[this.qno].question,
      options: arrnew[this.qno].options,
      correctoption: arrnew[this.qno].correctoption,
      countCheck: 0
    };
  }
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
        countCheck: 0,
        question: arrnew[this.qno].question,
        options: arrnew[this.qno].options,
        correctoption: arrnew[this.qno].correctoption
      });
    } else {
      this.props.quizFinish((this.score * 100) / 5);
    }
  }
  _answer(status, ans) {
    if (status == true) {
      const count = this.state.countCheck + 1;
      this.setState({ countCheck: count });
      if (ans == this.state.correctoption) {
        this.score += 1;
      }
    } else {
      const count = this.state.countCheck - 1;
      this.setState({ countCheck: count });
      if (this.state.countCheck < 1 || ans == this.state.correctoption) {
        this.score -= 1;
      }
    }
  }
  render() {
    let _this = this;
    const currentOptions = this.state.options;
    const options = Object.keys(currentOptions).map(function(k) {
      console.log(currentOptions);
      return (
        <View key={k} style={{ margin: 10 }}>
          <Button title={currentOptions[k]} />
        </View>
      );
    });

    return (
      <ScrollView style={{ backgroundColor: "#F5FCFF", paddingTop: 10 }}>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View style={{ margin: 10 }}>
              <Text>{this.state.question}</Text>
            </View>
            <View>{options}</View>
            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={() => this.prev()}
                title="Prev"
                color="#841584"
              />
              <View style={{ margin: 15 }} />

              <View style={{ flexDirection: "row" }}>
                <Button
                  onPress={() => this.next()}
                  title="Next"
                  color="#841584"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    alignItems: "center"
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

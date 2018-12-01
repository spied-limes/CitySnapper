/* eslint-disable quotes */
/* eslint-disable no-use-before-define */
import {
  Constants,
  Camera,
  FileSystem,
  Permissions,
  BarCodeScanner
} from "expo";
import React from "react";
import {
  Alert,
  Button,
  ImageBackground,
  Modal,
  Platform,
  Slider,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} from "react-native";
// import GalleryScreen from "../components/Gallery";
import { navigate } from "react-navigation";
import { BarIndicator } from "react-native-indicators";

import {
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons
} from "@expo/vector-icons";

const landmarkSize = 2;

const flashModeOrder = {
  off: "on",
  on: "auto",
  auto: "torch",
  torch: "off"
};

const flashIcons = {
  off: "flash-off",
  on: "flash-on",
  auto: "flash-auto",
  torch: "highlight"
};

const wbOrder = {
  auto: "sunny",
  sunny: "cloudy",
  cloudy: "shadow",
  shadow: "fluorescent",
  fluorescent: "incandescent",
  incandescent: "auto"
};

const wbIcons = {
  auto: "wb-auto",
  sunny: "wb-sunny",
  cloudy: "wb-cloudy",
  shadow: "beach-access",
  fluorescent: "wb-iridescent",
  incandescent: "wb-incandescent"
};

export default class CameraScreen extends React.Component {
  state = {
    flash: "off",
    zoom: 0,
    autoFocus: "on",
    type: "back",
    whiteBalance: "auto",
    ratio: "16:9",
    ratios: [],
    newPhotos: false,
    permissionsGranted: false,
    pictureSize: undefined,
    pictureSizes: [],
    pictureSizeId: 0,
    showGallery: false,
    showMoreOptions: false,
    modalVisible: false,
    showAnswer: false
  };
  static navigationOptions = { header: null };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      permissionsGranted: status === "granted"
    });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "photos"
    ).catch(e => {
      console.log(e, "Directory exists");
    });
  }

  getRatios = async () => {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  toggleView = () =>
    this.setState({
      showGallery: !this.state.showGallery,
      newPhotos: false
    });

  toggleMoreOptions = () =>
    this.setState({
      showMoreOptions: !this.state.showMoreOptions
    });

  toggleFacing = () =>
    this.setState({
      type: this.state.type === "back" ? "front" : "back"
    });

  toggleFlash = () =>
    this.setState({
      flash: flashModeOrder[this.state.flash]
    });

  setRatio = ratio => this.setState({ ratio });

  toggleWB = () =>
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance]
    });

  toggleFocus = () =>
    this.setState({
      autoFocus: this.state.autoFocus === "on" ? "off" : "on"
    });

  zoomOut = () =>
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1
    });

  zoomIn = () =>
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1
    });

  setFocusDepth = depth =>
    this.setState({
      depth
    });

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({
        // onPictureSaved: this.onPictureSaved});
      });
    }
  };

  showAlert = () => {
    Alert.alert(
      "Matching Success",
      "Your picture was an 81% match!",
      [
        {
          text: "OK",
          onPress: () => {
            this.props.navigation.navigate("CheckIn", {
              location: "Times Square"
            });
          }
        }
      ],
      {
        cancelable: false
      }
    );
  };

  handleMountError = ({ message }) => console.error(message);

  onPictureSaved = async photo => {
    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`
    });
    console.log(photo);
    this.setState({ newPhotos: true });
  };

  collectPictureSizes = async () => {
    if (this.camera) {
      const pictureSizes = await this.camera.getAvailablePictureSizesAsync(
        this.state.ratio
      );
      let pictureSizeId = 0;
      if (Platform.OS === "ios") {
        pictureSizeId = pictureSizes.indexOf("High");
      } else {
        // returned array is sorted in ascending order - default size is the largest one
        pictureSizeId = pictureSizes.length - 1;
      }
      this.setState({
        pictureSizes,
        pictureSizeId,
        pictureSize: pictureSizes[pictureSizeId]
      });
    }
  };

  previousPictureSize = () => this.changePictureSize(1);
  nextPictureSize = () => this.changePictureSize(-1);

  changePictureSize = direction => {
    let newId = this.state.pictureSizeId + direction;
    const length = this.state.pictureSizes.length;
    if (newId >= length) {
      newId = 0;
    } else if (newId < 0) {
      newId = length - 1;
    }
    this.setState({
      pictureSize: this.state.pictureSizes[newId],
      pictureSizeId: newId
    });
  };
  /*
 ██████╗  █████╗ ██╗     ██╗     ███████╗██████╗ ██╗   ██╗
██╔════╝ ██╔══██╗██║     ██║     ██╔════╝██╔══██╗╚██╗ ██╔╝
██║  ███╗███████║██║     ██║     █████╗  ██████╔╝ ╚████╔╝
██║   ██║██╔══██║██║     ██║     ██╔══╝  ██╔══██╗  ╚██╔╝
╚██████╔╝██║  ██║███████╗███████╗███████╗██║  ██║   ██║
 ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝
  */
  renderGallery = () => {
    // return <GalleryScreen onPress={this.toggleView.bind(this)} />;
    console.log("this is where the gallery would go");
  };

  renderNoPermissions = () => (
    <View style={styles.noPermissions}>
      <Text style={{ color: "white" }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>
  );

  renderTopBar = () => (
    <View style={styles.topBar}>
      {/* <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFacing}>
        <Ionicons name="ios-reverse-camera" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFlash}>
        <MaterialIcons
          name={flashIcons[this.state.flash]}
          size={32}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleWB}>
        <MaterialIcons
          name={wbIcons[this.state.whiteBalance]}
          size={32}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFocus}>
        <Text
          style={[
            styles.autoFocusLabel,
            {
              color: this.state.autoFocus === "on" ? "white" : "#6b6b6b"
            }
          ]}
        >
          AF
        </Text>
      </TouchableOpacity> */}
    </View>
  );

  renderBottomBar = () => (
    <View style={styles.bottomBar}>
      <View
        style={{
          flex: 8,
          justifyContent: "center",
          backgroundColor: "transparent"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
            this.showPhotoResults();
          }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons
            name="ios-radio-button-on"
            size={125}
            color="white"
            opacity="1"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black"
        }}
      >
        <Text style={styles.historicPhotoCaption}>Times Square, 1930</Text>
      </View>
    </View>
  );

  renderMoreOptions = () => (
    <View style={styles.options}>
      {/* <View style={styles.pictureSizeContainer}>
        <Text style={styles.pictureQualityLabel}>Resolution</Text>
        <View style={styles.pictureSizeChooser}>
          <TouchableOpacity
            onPress={this.previousPictureSize}
            style={{ paddingLeft: 6, paddingRight: 6 }}
          >
            <Ionicons name="md-arrow-dropleft" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.pictureSizeLabel}>
            <Text style={{ color: "white" }}>{this.state.pictureSize}</Text>
          </View>
          <TouchableOpacity
            onPress={this.nextPictureSize}
            style={{ paddingLeft: 6, paddingRight: 6 }}
          >
            <Ionicons name="md-arrow-dropright" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );

  /*
                        __          ______
   ________  ____  ____/ /__  _____/ ____/___ _____ ___  ___  _________ _
  / ___/ _ \/ __ \/ __  / _ \/ ___/ /   / __ `/ __ `__ \/ _ \/ ___/ __ `/
 / /  /  __/ / / / /_/ /  __/ /  / /___/ /_/ / / / / / /  __/ /  / /_/ /
/_/   \___/_/ /_/\__,_/\___/_/   \____/\__,_/_/ /_/ /_/\___/_/   \__,_/
*/
  renderCamera = () => {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log("Back button hit; Modal has been closed.");
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.processingBlocks} />
            {!this.state.showAnswer ? (
              <View style={styles.processingContainer}>
                <Text style={styles.processingTitle}>Processing...</Text>
                <View>
                  <BarIndicator color="white" count={5} size={60} />
                </View>
              </View>
            ) : (
              <View style={styles.processingContainer}>
                <View style={styles.answerBox}>
                  <Text style={styles.processingTitle}>Nice!</Text>
                </View>

                <View style={styles.answerBox}>
                  <Text style={styles.processingText}>
                    Your picture was an 81% match.
                  </Text>
                </View>
                <TouchableHighlight
                  style={styles.answerBoxButton}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    this.props.navigation.navigate("CheckIn", {
                      location: "Times Square"
                    });
                  }}
                >
                  <Text style={styles.modalReturnButtonText}>
                    Back to Activities
                  </Text>
                </TouchableHighlight>
              </View>
            )}
            <View style={styles.processingBlocks} />
          </View>
        </Modal>
        <ImageBackground
          source={require("../assets/images/OTS1.jpg")}
          style={styles.overlayImage}
        >
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.camera}
            onCameraReady={this.collectPictureSizes}
            type={this.state.type}
            flashMode={this.state.flash}
            autoFocus={this.state.autoFocus}
            zoom={this.state.zoom}
            whiteBalance={this.state.whiteBalance}
            ratio={this.state.ratio}
            pictureSize={this.state.pictureSize}
            onMountError={this.handleMountError}
            onFacesDetected={
              this.state.faceDetecting ? this.onFacesDetected : undefined
            }
            onFaceDetectionError={this.onFaceDetectionError}
            barCodeScannerSettings={{
              barCodeTypes: [
                BarCodeScanner.Constants.BarCodeType.qr,
                BarCodeScanner.Constants.BarCodeType.pdf417
              ]
            }}
            onBarCodeScanned={
              this.state.barcodeScanning ? this.onBarCodeScanned : undefined
            }
          >
            {this.renderTopBar()}
            {this.renderBottomBar()}
          </Camera>
        </ImageBackground>
        {this.state.faceDetecting && this.renderFaces()}
        {this.state.faceDetecting && this.renderLandmarks()}
        {this.state.showMoreOptions && this.renderMoreOptions()}
      </View>
    );
  };

  showPhotoResults = () => {
    setTimeout(() => {
      console.log("Timer done; setting new state.");
      this.setState({ showAnswer: true });
    }, 2000);
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    const content = this.state.showGallery
      ? this.renderGallery()
      : cameraScreenContent;
    return <View style={styles.container}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  overlayImage: {
    width: undefined,
    height: "100%",
    resizeMode: "cover",
    opacity: 0.5
  },
  camera: {
    flex: 1,
    justifyContent: "space-between"
  },
  topBar: {
    flex: 0.2,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: Constants.statusBarHeight / 2
  },
  bottomBar: {
    alignItems: "stretch",
    justifyContent: "center",
    flex: 0.25
  },
  noPermissions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  gallery: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  toggleButton: {
    flex: 0.25,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  autoFocusLabel: {
    fontSize: 20,
    fontWeight: "bold"
  },
  bottomButton: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  newPhotosDot: {
    position: "absolute",
    top: 0,
    right: -5,
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: "springgreen"
  },
  options: {
    flex: 1,
    position: "absolute",
    bottom: 100,
    left: 15,
    width: 150,
    height: 80,
    backgroundColor: "#000000BA",
    borderRadius: 10,
    padding: 10
  },
  pictureQualityLabel: {
    flex: 1,
    fontSize: 16,
    color: "white",
    flexDirection: "row"
  },
  pictureSizeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  pictureSizeChooser: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  pictureSizeLabel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexDirection: "row"
  },
  historicPhotoCaption: {
    fontSize: 24,
    fontFamily: "Abril-FatFace",
    color: "white"
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center"
  },
  processingContainer: {
    flex: 3,
    justifyContent: "center"
  },
  processingBlocks: {
    flex: 3.5
  },
  processingTitle: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "Abril-FatFace",
    color: "white"
  },
  processingText: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  },
  answerBox: {
    flex: 1,
    justifyContent: "space-between"
  },
  answerBoxButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalReturnButtonText: {
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    color: "white",
    fontSize: 20
  }
});

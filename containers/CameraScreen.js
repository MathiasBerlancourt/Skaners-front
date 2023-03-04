import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Constants from "expo-constants";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/PhotoButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";

export default function CameraScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("userId");
      setId(id);
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    setLoading(true);
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({
          skipProcessing: true,
        });
        const manip = await ImageManipulator.manipulateAsync(
          data.uri,
          [{ resize: { width: width * 2, height: height * 2 } }],
          { compress: 1, format: "jpeg" }
        );
        setImage(manip.uri);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const savePicture = async () => {
    setLoading(true);
    if (image) {
      try {
        const formData = new FormData();
        formData.append("picture", {
          uri: image,
          name: `my-pic.jpg`,
          type: `photo/jpg`,
        });
        formData.append("userId", id);

        const response = await axios.post(
          "https://site--skaners-back--jhlzj9jljvpm.code.run/user/addSkan",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const createTwoButtonAlert = () =>
          Alert.alert(
            "Message",
            "Le skan a été envoyé, tu recevras bientôt une réponse",
            [{ text: "OK" }]
          );

        createTwoButtonAlert();
        setImage(null);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const createTwoButtonAlert = () =>
          Alert.alert("Message", "Échec de l'envoi, réessaie plus tard", [
            { text: "OK" },
          ]);

        createTwoButtonAlert();
        console.log(error.message);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image && isFocused ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
          focusDepth={1}
          ratio={"16:9"}
        >
          <View style={styles.btnBox}>
            <View
              style={{
                alignItems: "flex-end",
                paddingHorizontal: 30,
              }}
            >
              <Button
                title=""
                icon="cross"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </View>
            <View style={styles.rightBtns}>
              <Button
                onPress={() =>
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  )
                }
                icon="flash"
                color={
                  flash === Camera.Constants.FlashMode.off ? "gray" : "#fff"
                }
              />
              <Button
                title=""
                icon="retweet"
                onPress={() => {
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.controlsPhoto}>
            {!loading && (
              <TouchableOpacity onPress={takePicture}>
                <Ionicons name="aperture" size={70} color={"#FF7E00"} />
              </TouchableOpacity>
            )}
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      {image && (
        <View style={styles.controls}>
          {!loading ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 50,
              }}
            >
              <Button
                title="Annuler"
                onPress={() => setImage(null)}
                icon="trash"
              />
              <Button title="Skanner" onPress={savePicture} icon="check" />
            </View>
          ) : (
            <ActivityIndicator
              style={styles.indicator}
              color={"#FF7E00"}
              size={"large"}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
  },
  controls: {
    flex: 0.6,
  },
  controlsPhoto: {
    alignItems: "center",
    paddingVertical: 30,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 20,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rightBtns: {
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    justifyContent: "space-between",
    marginHorizontal: 30,
    paddingHorizontal: 7,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
    justifyContent: "space-between",
  },
  topControls: {
    flex: 1,
  },
  indicator: {
    marginTop: 10,
  },
});

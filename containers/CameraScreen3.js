import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CameraScreen() {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getPermissionAndGetPicture = async () => {
    //Demander le droit d'accéder à la galerie
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      //ouvrir la galerie photo
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (result.cancelled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setSelectedPicture(result.assets[0].uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  const getPermissionAndTakePicture = async () => {
    //Demander le droit d'accéder à l'appareil photo
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      //ouvrir l'appareil photo
      const result = await ImagePicker.launchCameraAsync();
      // console.log(result);
      setSelectedPicture(result.assets[0].uri);
    } else {
      alert("Permission refusée");
    }
  };

  const sendPicture = async () => {
    setIsLoading(true);

    try {
      const id = await AsyncStorage.getItem("userId");
      const formData = new FormData();
      formData.append("picture", {
        uri: selectedPicture,
        name: `my-pic.jpeg`,
        type: `image/jpeg`,
      });

      formData.append("userId", id);
      const response = await axios.post(
        "http://localhost:3310/user/addSkan",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          //Si vous avez des headers à transmettre c'est par ici !
          //headers: { Authorization: "Bearer " + userToken },
          //transformRequest: (formData) => formData,
        }
      );

      if (response.data) {
        setIsLoading(false);
        alert("Photo Envoyée !");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Andromeda</Text>
      <Button
        title="Acccéder à la galerie photo"
        onPress={getPermissionAndGetPicture}
      />
      <Button
        title="Accéder à l'appareil photo"
        onPress={getPermissionAndTakePicture}
      />

      {selectedPicture && (
        <Image
          source={{ uri: selectedPicture }}
          style={{ height: 200, width: 200 }}
        />
      )}

      <Button title="Envoi d'une photo au backend" onPress={sendPicture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

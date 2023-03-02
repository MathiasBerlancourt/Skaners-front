import { View, Text } from "react-native";
import { Camera } from "react-native-vision-camera";
import { useEffect } from "react";
import axios from "axios";

const CameraScreen = () => {
  useEffect(() => {
    const cameraPermission = async () => {
      await Camera.getCameraPermissionStatus();
    };

    cameraPermission();
  }, []);
  return (
    <View>
      <Text>Je suis un CameraSCreen</Text>
    </View>
  );
};

export default CameraScreen;

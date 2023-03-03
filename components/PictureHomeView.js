import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const PictureHomeView = ({ route }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [like, setLike] = useState("false");

  const handleLike = () => {
    setLike(!like);
  };

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity
        style={{ position: "absolute", zIndex: 1, top: "90%", left: "85%" }}
        onPress={handleLike}
      >
        <AntDesign name={like ? "hearto" : "heart"} size={45} color="tomato" />
      </TouchableOpacity>
      <Image
        source={{ uri: route.params.url }}
        style={{ width: windowWidth, height: windowHeight * 0.8 }}
      />
    </View>
  );
};

export default PictureHomeView;

const styles = StyleSheet.create({});

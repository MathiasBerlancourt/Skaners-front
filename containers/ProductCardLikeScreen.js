import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductCardLikeScreen = ({ route, navigation }) => {
  const product = route.params.product;

  const size = 50;

  const sendData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      await axios.put(
        "https://site--skaners-back--jhlzj9jljvpm.code.run/user/unlikePicture",
        { userId: userId, skanId: product._id }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const showAlert = () => {
    Alert.alert(
      "Confirmation de suppression",
      "Es tu sur de vouloir supprimer cette paire?",
      [
        {
          text: "Oui",
          onPress: () => {
            sendData();
            navigation.goBack();
          },
          style: "default",
        },
        {
          text: "Non",
          onDismiss: () => {},
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };
  return (
    <View>
      <View style={styles.imgContainer}>
        <View>
          <Image style={styles.img} source={{ uri: product.pictureUrl }} />
        </View>
        <TouchableOpacity
          onPress={() => {
            showAlert();
          }}
        >
          <Entypo
            style={styles.delete}
            name="cross"
            size={size}
            color="#F86F00"
          />
        </TouchableOpacity>
      </View>
      {/* <Text>Marque : {product.sneakerName}</Text>
      <Text>Description : {product.description}</Text>
      <Text>Lien : {product.linkUrl}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  imgContainer: {
    alignContent: "center",
    justifyContent: "center",
    height: 400,
    marginTop: 50,
  },
  img: {
    width: 300,
    height: 400,

    resizeMode: "cover",
    borderRadius: 20,
    marginLeft: 50,
  },
  delete: {
    position: "absolute",
    bottom: 350,
    left: 300,
  },
});

export default ProductCardLikeScreen;

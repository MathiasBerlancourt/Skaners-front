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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ProductCardFavoriteScreen = ({ route, navigation }) => {
  const product = route.params.product;

  const size = 50;

  const sendData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      await axios.put(
        "https://site--skaners-back--jhlzj9jljvpm.code.run/user/unlikeSneaker",
        { userId: userId, sneakerId: product._id }
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
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: product.pictureUrl }} />
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
      </View>
      {/* <View style={styles.infosContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.labelColor}>Marque :</Text>
        <Text style={styles.text}>{product.sneakerName}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.labelColor}>Description : </Text>
        <Text style={styles.text}>{product.description}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.labelColor}>Lien : </Text>
        <Text style={styles.text}>{product.linkUrl}</Text>
      </View>
    </View> */}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    alignContent: "center",
    justifyContent: "center",
    height: 400,
    marginTop: hp("5%"),
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    width: wp("80%"),
    height: hp("60%"),
    resizeMode: "cover",
    borderRadius: 20,
  },
  infosContainer: {
    width: wp("90%"),
    marginHorizontal: 20,
    marginTop: hp("7%"),
  },
  delete: {
    position: "absolute",
    bottom: hp("50%"),
    left: wp("25%"),
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("2.5%"),
  },

  text: {
    fontSize: hp("2%"),
    fontFamily: "LouisGeorge",
  },

  labelColor: {
    color: "#717171",
    fontSize: hp("2%"),
    fontFamily: "LouisGeorge",
  },
});

export default ProductCardFavoriteScreen;
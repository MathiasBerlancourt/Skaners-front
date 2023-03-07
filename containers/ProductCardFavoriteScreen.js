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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { API_URL } from "react-native-dotenv";

const ProductCardFavoriteScreen = ({ route, navigation }) => {
  const product = route.params.product;

  const size = 50;

  const sendData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");
      const headers = {
        Authorization: "Bearer " + token,
      };
      await axios({
        method: "PUT",
        url: `${API_URL}/user/unlikeSneaker`,
        data: { userId: userId, sneakerId: product._id },
        headers: headers,
      });
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
    <KeyboardAwareScrollView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: product.picture }} />
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
      <View style={styles.infosContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelColor}>Marque :</Text>
          <Text style={styles.text}>{product.brand}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.labelColor}>Nom : </Text>
          <Text style={styles.text}>{product.name}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.labelColor}>Prix : </Text>
          <Text style={styles.text}>{product.price}</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "lightgrey",
    flex: 1,
  },
  container: {
    alignContent: "center",
    justifyContent: "center",
    height: hp("50%"),
    width: wp("80%"),
    marginHorizontal: wp("10%"),
    marginTop: hp("3%"),
    backgroundColor: "white",
    borderRadius: 20,
  },
  imgContainer: {
    // justifyContent: "center",
    // alignItems: "center",
  },

  img: {
    width: wp("80%"),
    height: hp("60%"),
    resizeMode: "contain",
    borderRadius: 20,
  },
  infosContainer: {
    width: wp("90%"),
    marginHorizontal: 20,
    marginTop: hp("7%"),
  },
  delete: {
    position: "absolute",
    bottom: hp("46%"),
    left: wp("60%"),
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

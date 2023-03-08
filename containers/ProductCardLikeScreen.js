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

const ProductCardLikeScreen = ({ route, navigation }) => {
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
        url: `${API_URL}/user/unlikePicture`,
        data: { userId: userId, pictureId: product._id },
        headers: headers,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const showAlert = () => {
    Alert.alert(
      "Confirmation",
      "Es-tu sur de vouloir retirer cette photo de tes favoris ?",
      [
        {
          text: "Oui",
          onPress: async () => {
            await sendData();
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
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: product.url }} />
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
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
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

export default ProductCardLikeScreen;

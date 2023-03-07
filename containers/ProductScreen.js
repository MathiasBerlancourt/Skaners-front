import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { API_URL } from "react-native-dotenv";
import Loading from "../components/Loading";
const ProductScreen = ({ route, token }) => {
  const [sneakersData, setSneakersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userSneakers, setUserSneakers] = useState();
  const [like, setLike] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const [responseSneakers, responseUserInfo] = await Promise.all([
          axios.get(`${API_URL}/sneakers/${route.params.id}`),
          axios.get(`${API_URL}/user/info/${userId}`, {
            headers: { Authorization: "Bearer " + token },
          }),
        ]);
        responseUserInfo.data.sneakers.find((sneaker) => {
          setLike(
            JSON.stringify(sneaker._id) === JSON.stringify(route.params.id)
          );
        });
        setSneakersData(responseSneakers.data);
        setUserSneakers(responseUserInfo.data.sneakers);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const likeSneaker = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const headers = { Authorization: "Bearer " + token };
      const bodyParams = { userId: userId, sneakerId: route.params.id };
      const response = await axios({
        method: "PUT",
        url: `${API_URL}/user/likeSneaker`,

        headers: headers,
        data: bodyParams,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const unlikeSneaker = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const headers = { Authorization: "Bearer " + token };
      const bodyParams = { userId: userId, sneakerId: route.params.id };
      const response = await axios({
        method: "PUT",
        url: `${API_URL}/user/unlikeSneaker`,
        headers: headers,
        data: bodyParams,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.productScreenContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: sneakersData.picture }}
              resizeMode="contain"
              style={{
                width: wp("100%"),
                height: wp("100%"),
              }}
            />
            <View style={styles.priceContainer}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "LouisGeorge",
                  fontSize: 18,
                }}
              >
                PRIX RETAIL
              </Text>

              <Text
                style={{
                  color: "black",
                  fontFamily: "LouisGeorge",
                  fontSize: 18,
                }}
              >
                {sneakersData.price / 100} €{" "}
              </Text>
            </View>

            <View style={styles.containerNameAndLike}>
              <TouchableOpacity
                onPress={() => {
                  setLike(!like);
                  if (like) {
                    unlikeSneaker();
                  } else {
                    likeSneaker();
                  }
                }}
              >
                {like ? (
                  <AntDesign
                    name="heart"
                    size={30}
                    style={{ paddingBottom: 10, color: "#FF7E00" }}
                  />
                ) : (
                  <AntDesign
                    name="hearto"
                    size={30}
                    style={{ paddingBottom: 10, color: "#FF7E00" }}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.sneakerName}>
                {"     "}
                {sneakersData.name.toUpperCase()}
              </Text>
            </View>

            <View>
              <View
                style={{
                  backgroundColor: "#FF7E00",
                  height: 1,
                  width: wp("90%"),
                  marginBottom: 20,
                }}
              ></View>
              <View>
                <Text style={styles.brandAndColor}>
                  MARQUE : {sneakersData.brand.toUpperCase()}
                </Text>
                <Text style={styles.brandAndColor}>
                  COLORIS : {sneakersData.color.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default ProductScreen;

const styles = StyleSheet.create({
  productScreenContainer: {
    height: hp("75%"),
    width: wp("100%"),
    backgroundColor: "white",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  priceContainer: {
    backgroundColor: "#717171",
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 40,
    width: wp("45%"),
    alignItems: "center",
  },
  containerNameAndLike: {
    flexDirection: "row",
    marginHorizontal: "10%",
    alignItems: "flex-start",
  },
  sneakerName: {
    fontFamily: "LouisGeorge",
    fontSize: 20,
    fontWeight: 100,

    textAlign: "center",
    justifyContent: "space-between",
  },
  lineBetween: {
    width: wp("45%"),
    borderBottomColor: "black",
    backgroundColor: "black",
  },
  brandAndColor: {
    fontSize: 15,
    color: "#717171",
  },
});

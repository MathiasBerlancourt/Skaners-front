import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./Loading";
import axios from "axios";
import { API_URL } from "react-native-dotenv";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

const FavoritesCategory = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState();
  const [refreshData, setRefreshData] = useState();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const brandTab = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const headers = {
          Authorization: "Bearer " + token,
        };
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          return;
        }
        const response = await axios({
          method: "GET",
          url: `${API_URL}/user/info/${userId}`,
          headers: headers,
        });
        setData(response.data.sneakers.reverse());

        setIsLoad(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [isFocused, refreshData]);
  return isLoad ? (
    <View style={styles.background}>
      <ScrollView>
        <View>
          {data.map((sneaker) => {
            if (!brandTab.includes(sneaker.brand)) brandTab.push(sneaker.brand);
          })}
          {brandTab.map((brand, index) => {
            return (
              <View key={index} style={styles.brandContainer}>
                <Text style={styles.textBrand}>{brand.toUpperCase()}</Text>
                <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
                  {data.map((sneaker, index) => {
                    if (sneaker.brand === brand) {
                      return (
                        <View key={index} style={styles.sneakerContainer}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("ProductCardFavoriteScreen", {
                                product: sneaker,
                                refreshData: refreshData,
                                setRefreshData: setRefreshData,
                              });
                            }}
                          >
                            <Image
                              style={styles.img}
                              source={{ uri: sneaker.picture }}
                            />
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <AntDesign
                                name="heart"
                                size={18}
                                color="#FF7E00"
                              />
                              <Text numberOfLines={2} style={styles.textName}>
                                {sneaker.name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    }
                  })}
                </ScrollView>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },

  brandContainer: { height: hp("22%") },

  textBrand: {
    color: "white",
    backgroundColor: "black",
    height: hp("5%"),
    paddingHorizontal: 10,
    paddingVertical: hp("1%"),
    fontSize: 16,
    fontFamily: "LemonMilk",
  },
  sneakerContainer: {
    marginLeft: 15,
    flex: 1,
    width: wp("35%"),
  },

  textName: {
    textAlign: "center",
    maxWidth: wp("28%"),
    height: hp("5%"),
    paddingHorizontal: 5,
    marginLeft: 3,
    fontSize: 12,
    fontFamily: "LemonMilk",
  },

  img: {
    width: wp("30%"),
    height: hp("12%"),
    resizeMode: "cover",
  },
});

export default FavoritesCategory;

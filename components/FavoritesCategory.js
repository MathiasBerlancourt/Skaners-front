import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./Loading";
import axios from "axios";
import { API_URL } from "react-native-dotenv";

const FavoritesCategory = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          return;
        }
        const response = await axios.get(`${API_URL}/user/info/${userId}`);
        setData(response.data.sneakers.reverse());

        setIsLoad(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [isFocused]);
  return isLoad ? (
    <View style={styles.background}>
      <ScrollView>
        <View style={styles.favoriteContainer}>
          {data.map((sneaker, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("ProductCardFavoriteScreen", {
                    product: sneaker,
                  });
                }}
              >
                <Image
                  style={styles.img}
                  source={{ uri: sneaker.pictureUrl }}
                />
              </TouchableOpacity>
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
  favoriteContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  img: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
});

export default FavoritesCategory;

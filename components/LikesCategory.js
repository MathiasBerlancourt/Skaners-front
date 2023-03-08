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

const LikesCategory = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("userToken");
        const headers = {
          Authorization: "Bearer " + token,
        };

        if (!userId) {
          return;
        }
        const response = await axios({
          method: "GET",
          url: `${API_URL}/user/info/${userId}`,
          headers: headers,
        });
        setData(response.data.likes.reverse());

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
        <View style={styles.likeContainer}>
          {data.map((picture, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("ProductCardLikeScreen", {
                    product: picture,
                  });
                }}
              >
                <Image style={styles.img} source={{ uri: picture.url }} />
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
  likeContainer: {
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
export default LikesCategory;

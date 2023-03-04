import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import Loading from "./Loading";

const SkansCategory = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      try {
        const response = await axios.get(
          `https://site--skaners-back--jhlzj9jljvpm.code.run/user/info/${userId}`
        );
        setData(response.data.skans.reverse());

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
        <View style={styles.skanContainer}>
          {data.map((skan, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("ProductCardSkanScreen", {
                    product: skan,
                  });
                }}
              >
                <Image style={styles.img} source={{ uri: skan.pictureUrl }} />
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
  skanContainer: {
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

export default SkansCategory;

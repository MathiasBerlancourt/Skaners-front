import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Loading from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState([]);
  const [skans, setSkans] = useState([]);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const [responseParcourir, responseLikes] = await Promise.all([
          axios.get(
            "https://site--skaners-back--jhlzj9jljvpm.code.run/pictures"
          ),
          axios.get(
            `https://site--skaners-back--jhlzj9jljvpm.code.run/user/info/${userId}`
          ),
        ]);
        setSkans(responseLikes.data.skans.reverse());
        setPictures(responseParcourir.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error : ", error.message);
      }
    };

    fetchPictures();
  }, []);

  if (isLoading === true) {
    return <Loading />;
  } else
    return (
      <ScrollView>
        <View style={{ paddingTop: 10, backgroundColor: "white" }}>
          <Text style={styles.title}>MES DERNIERS LIKES</Text>
          <ScrollView horizontal={true}>
            <View style={styles.likesContainer}>
              {Array.isArray(skans) &&
                skans.map((skan, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate("HomeView", {
                          url: skan.pictureUrl,
                        });
                      }}
                    >
                      <Image
                        source={{ uri: skan?.pictureUrl }}
                        key={skan.id}
                        style={{
                          height: 0.13 * height,
                          width: 0.6 * width,
                          borderRadius: 10,
                          marginHorizontal: 3,
                          marginVertical: 5,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
            </View>
          </ScrollView>
          <Text style={styles.title}>PARCOURIR</Text>
          <View style={styles.layoutContainer}>
            {Array.isArray(pictures) &&
              pictures.map((elem, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("HomeView", { url: elem.url });
                    }}
                  >
                    <Image
                      key={elem.id}
                      source={{ uri: elem.url }}
                      style={{
                        height: 0.2 * height,
                        width: 0.43 * width,
                        borderRadius: 10,
                        marginVertical: 4,
                        marginHorizontal: 4,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </ScrollView>
    );
}
const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 15,
    fontFamily: "LemonMilkBold",
    textAlign: "left",
    color: "#FF7E00",
    paddingLeft: 15,
    fontFamily: "LouisGeorge",
  },
  pictureContainer: {
    paddingHorizontal: 0,
  },
  likesContainer: { flexDirection: "row" },
  layoutContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  pictureSneakers: {
    resizeMode: "cover",
    borderRadius: 2,
  },
});

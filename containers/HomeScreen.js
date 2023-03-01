import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { MasonryFlashList } from "@shopify/flash-list";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState([]);
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await axios.get(
          "https://site--skaners-back--jhlzj9jljvpm.code.run/pictures"
        );
        setPictures(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPictures();
  }, []);
  if (isLoading) {
    return <ActivityIndicator />;
  } else
    return (
      <ScrollView>
        <Text style={styles.title}>Parcourir</Text>
        <View
          style={[styles.pictureContainer, { width: width, height: height }]}
        >
          <MasonryFlashList
            data={pictures}
            numColumns={2}
            estimatedItemSize={200}
            refreshing={true}
            getColumnFlex={(items, index, maxColumns, extraData) => {
              return index === 1 ? 1 : 2;
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("HomeView", { url: item.url });
                }}
              >
                <Image
                  source={{ uri: item.url }}
                  style={styles.pictureSneakersLarge}
                />
              </TouchableOpacity>
            )}
          />
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
    color: "tomato",
    fontWeight: "bold",
  },
  pictureContainer: {
    paddingHorizontal: 40,
  },
  pictureSneakersLarge: {
    resizeMode: "cover",
    height: 180,
    width: "100%",
    gap: 5,

    borderRadius: 15,
  },
  pictureSneakersShort: {
    resizeMode: "cover",
    height: 60,
    width: "100%",
  },
});

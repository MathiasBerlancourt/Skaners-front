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
} from "react-native";
import axios from "axios";
import { MasonryFlashList } from "@shopify/flash-list";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState([]);
  const navigation = useNavigation();
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
        <Text>Favroris</Text>
        <ScrollView style={styles.pictureContainer}>
          <Text style={styles.title}>Parcourir</Text>
          <MasonryFlashList
            data={pictures}
            numColumns={2}
            estimatedItemSize={200}
            refreshing={true}
            getColumnFlex={(items, index, maxColumns, extraData) => {
              return index === 1 ? 1 : 2;
            }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.url }}
                style={styles.pictureSneakersLarge}
              />
            )}
          />
        </ScrollView>
      </ScrollView>
    );
}
const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
    textAlign: "center",
  },
  pictureContainer: {
    borderColor: "pink",
    borderWidth: 4,
    // flex: 1,
    // flexWrap: "wrap",

    // alignContent: "flex-start",
  },
  pictureSneakersLarge: {
    resizeMode: "cover",
    height: 180,
    width: "100%",

    borderRadius: 15,
  },
  pictureSneakersShort: {
    resizeMode: "cover",
    height: 60,
    width: 150,
    borderColor: "purple",
    borderWidth: 4,
  },
});

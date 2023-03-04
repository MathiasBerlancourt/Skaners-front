import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  Text,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";
import Loading from "../components/Loading";

const SearchScreen = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sneakers, setSneakers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const handleName = (name) => {
    setName(name);
  };
  const handleBrand = (brand) => {
    setBrand(brand);
  };
  const handleColor = (color) => {
    setColor(color);
  };

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await axios.get(
          `https://site--skaners-back--jhlzj9jljvpm.code.run/sneakers?name=${name}&brand=${brand}&color=${color}`
        );
        setSneakers(response.data);

        setErrorMessage("");
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setErrorMessage(error);
      }
    };
    fetchSneakers();
  }, [name, brand, color]);

  return (
    <View style={{ height: height, backgroundColor: "whitesmoke" }}>
      <View style={styles.titleContainer}>
        <FontAwesome name="search" size={18} color="#FF7E00" />
        <Text style={styles.titleSearch}> Rechercher</Text>
      </View>
      <View
        style={[
          { height: 0.2 * height, alignItems: "center" },
          styles.searchContainer,
        ]}
      >
        <TextInput
          placeholderTextColor="#717171"
          placeholder="Modele..."
          style={styles.input}
          onChangeText={handleName}
          value={name}
        ></TextInput>
        <TextInput
          placeholderTextColor="#717171"
          placeholder="Marque..."
          style={styles.input}
          onChangeText={handleBrand}
          value={brand}
        ></TextInput>
        <TextInput
          placeholderTextColor="#717171"
          placeholder="Couleur..."
          style={styles.input}
          onChangeText={handleColor}
          value={color}
        ></TextInput>
      </View>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={sneakers}
          renderItem={({ item }) => {
            return (
              <View style={{ alignItems: "center", backgroundColor: "white" }}>
                <Text style={{ fontWeight: "bold", color: "gray" }}>
                  {item.name}
                </Text>
                <Image
                  source={{ uri: item.picture }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "lightgray",
    height: "20%",
    borderRadius: 20,
    paddingLeft: 20,
    width: "80%",
  },

  titleContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    height: 35,
    alignItems: "baseline",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  titleSearch: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    textAlign: "left",
    color: "#FF7E00",
    fontWeight: "bold",
    marginTop: 4,
  },

  searchContainer: {
    justifyContent: "space-evenly",
  },
});

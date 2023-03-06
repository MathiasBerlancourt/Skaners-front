import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Loading from "../components/Loading";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const SearchScreen = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [sneakers, setSneakers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const height = Dimensions.get("window").height;
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const navigation = useNavigation();

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
          `${API_URL}/sneakers?name=${name}&brand=${brand}&color=${color}`
        );
        setSneakers(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSneakers();
  }, [name, brand, color]);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          return setDisplaySearchBar(!displaySearchBar);
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.titleSearch}>
            <Ionicons name="md-search-outline" size={18} color="#FF7E00" />{" "}
            RECHERCHER
          </Text>
          {displaySearchBar ? (
            <SimpleLineIcons
              name="arrow-up"
              size={18}
              color="#FF7E00"
              style={{ paddingHorizontal: 15 }}
            />
          ) : (
            <SimpleLineIcons
              name="arrow-down"
              size={18}
              color="#FF7E00"
              style={{ paddingHorizontal: 15 }}
            />
          )}
        </View>
      </TouchableOpacity>
      {displaySearchBar && (
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
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={sneakers}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProductScreen", {
                    id: item._id,
                  });
                }}
              >
                <View
                  style={{
                    height: "auto",
                    alignItems: "center",
                    backgroundColor: "white",

                    borderRadius: 30,
                    paddingVertical: 15,
                    marginVertical: 3,
                    marginHorizontal: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "gray" }}>
                    {item.name}
                  </Text>
                  <Image
                    source={{ uri: item.picture }}
                    style={{ width: 200, height: 200 }}
                  />
                </View>
              </TouchableOpacity>
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

    height: 35,
    alignItems: "baseline",

    justifyContent: "space-between",
    backgroundColor: "white",
  },
  titleSearch: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 22,
    textAlign: "left",
    color: "#FF7E00",
    fontWeight: "bold",
    marginTop: 4,
    fontFamily: "LouisGeorge",
    paddingHorizontal: 15,
  },

  searchContainer: {
    justifyContent: "space-evenly",
  },
});

import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Loading from "../components/Loading";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { API_URL } from "react-native-dotenv";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const SearchScreen = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [sneakers, setSneakers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const height = Dimensions.get("window").height;
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const navigation = useNavigation();
  const dropdownController = useRef(null);
  const searchRef = useRef(null);

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
            {
              height: hp("30%"),
              alignItems: "center",
            },
            styles.searchContainer,
          ]}
        >
          <View style={styles.inputsContainer}>
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
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => {
                setBrand("");
                setColor("");
                setName("");
              }}
              style={styles.clearButton}
            >
              <Text>EFFACER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setDisplaySearchBar(false);
              }}
              style={styles.validateButton}
            >
              <Text>FERMER</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <View style={{ paddingHorizontal: 9 }}>
          <FlatList
            data={sneakers}
            numColumns={2}
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
                      height: hp("20%"),
                      alignItems: "center",
                      backgroundColor: "white",
                      width: wp("45%"),
                      borderRadius: 8,
                      borderRadius: 10,
                      paddingVertical: 15,
                      marginVertical: 5,
                      marginHorizontal: 5,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "gray",
                        fontSize: 10,
                        paddingHorizontal: 8,
                        paddingBottom: 5,
                      }}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    <Image
                      source={{ uri: item.picture }}
                      style={{ width: wp("37%"), height: hp("12%") }}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "gray",
                        fontSize: 12,
                        paddingRight: 75,
                        marginTop: 10,
                      }}
                      numberOfLines={1}
                    >
                      {item.brand.toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  inputsContainer: {
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "lightgray",
    height: hp("5%"),
    borderRadius: 20,
    paddingLeft: 20,
    width: wp("80%"),
  },

  titleContainer: {
    flexDirection: "row",
    height: hp("7%"),
    alignItems: "center",
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
    paddingVertical: hp("2%"),

    fontFamily: "LouisGeorge",
    paddingHorizontal: 15,
  },

  searchContainer: {
    backgroundColor: "white",
  },
  modalButtons: {
    flexDirection: "row",
  },
  validateButton: {
    height: hp("4%"),
    backgroundColor: "#FF7E00",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 20,
    // marginTop: 30,
    // marginBottom: 20,
    width: wp("20%"),
  },
  clearButton: {
    height: hp("4%"),
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderColor: "#717171",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 20,
    // marginTop: 30,
    // marginBottom: 20,
    width: wp("20%"),
  },
});

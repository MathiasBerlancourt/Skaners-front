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
              height: hp("80%"),
              alignItems: "center",
            },
            styles.searchContainer,
          ]}
        >
          {/* <SelectDropdown
            search="true"
            data={brands}
            buttonStyle={styles.input}
            dropdownStyle={styles.input}
            dropdownOverlayColor="transparent"
            dropdownBackgroundColor="#717171"
            rowStyle={{
              height: hp("3%"),
              backgroundColor: "whitesmoke",
              borderStartWidth: 0,
              borderStyle: "none",
            }}
            rowTextStyle={{
              fontSize: 14,
              color: "#717171",
              textAlign: "left",
            }}
            buttonTextStyle={{
              color: "#717171",
              textAlign: "left",
              fontSize: 14,
            }}
            searchInputStyle={{ height: hp("3%"), width: wp("80%") }}
            searchPlaceHolder="Marque..."
            dropdownIconPosition="right"
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setBrand(selectedItem);
            }}
            defaultButtonText={"Marque..."}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          /> */}
          <View style={{ justifyContent: "space-around" }}>
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
            {/* <AutocompleteDropdown
              useFilter={true}
              clearOnFocus={true}
              closeOnBlur={true}
              showClear={false}
              closeOnSubmit={true}
              showChevron={false}
              suggestionsListMaxHeight={hp("20%")}
              suggestionsListContainerStyle={{}}
              placeholder={"Marque..."}
              placeholderTextColor={"#717171"}
              ref={searchRef}
              value={brand}
              containerStyle={{
                width: wp("80%"),
                borderRadius: "20",
                backgroundColor: "#717171",
              }}
              controller={(controller) => {
                dropdownController.current = controller;
              }}
              dataSet={[
                { id: "1", title: "adidas" },
                { id: "2", title: "Converse" },
                { id: "3", title: "Air Jordan" },
                { id: "4", title: "Champion" },
                { id: "5", title: "Gucci" },
                { id: "6", title: "Nike" },
                { id: "7", title: "Vans" },
              ]}
            /> */}

            <TextInput
              placeholderTextColor="#717171"
              placeholder="Couleur..."
              style={styles.input}
              onChangeText={handleColor}
              value={color}
            ></TextInput>
          </View>
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
            <Text>TERMINER</Text>
          </TouchableOpacity>
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
                        fontWeight: "bold",
                        color: "gray",
                        fontSize: 12,
                        paddingHorizontal: 8,
                      }}
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>
                    <Image
                      source={{ uri: item.picture }}
                      style={{ width: wp("33%"), height: hp("10%") }}
                    />
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
  input: {
    backgroundColor: "lightgray",
    height: hp("5%"),
    borderRadius: 20,
    paddingLeft: 20,
    width: wp("80%"),
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
    backgroundColor: "white",
  },
  validateButton: {
    height: 50,
    backgroundColor: "#FF7E00",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    width: wp("50%"),
  },
  clearButton: {
    height: 50,
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderColor: "#717171",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    width: wp("50%"),
  },
});

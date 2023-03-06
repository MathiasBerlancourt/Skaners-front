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
import SelectDropdown from "react-native-select-dropdown";
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

const SearchScreen = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [sneakers, setSneakers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const height = Dimensions.get("window").height;
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("");

  const brands = [
    "Air Jordan",
    "adidas",
    "Converse",
    "Champion",
    "Gucci",
    "Nike",
    "Vans",
  ];

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
              height: 0.2 * height,
              alignItems: "center",
            },
            styles.searchContainer,
          ]}
        >
          <SelectDropdown
            search="true"
            data={brands}
            buttonStyle={styles.input}
            buttonTextStyle={styles.inputText}
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
            dropdownStyle={styles.dropdownStyle}
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
          />
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

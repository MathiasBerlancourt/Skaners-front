import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { FlatList } from "react-native-web";

const SearchScreen = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sneakers, setSneakers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleName = (name) => {
    setName(name);
  };
  const handleBrand = (brand) => {
    setBrand(brand);
  };
  const handleColor = (color) => {
    setColor(color);
  };
  console.log("variable name name : ", name);
  console.log("variable brand : ", brand);
  console.log("variable color : ", color);

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await axios.get(
          `https://site--skaners-back--jhlzj9jljvpm.code.run/sneakers?name=${name}&brand=${brand}&color=${color}`
        );
        setSneakers(response.data);
        console.log("resultat recherche sneakers : ", sneakers);

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
    <KeyboardAwareScrollView>
      <View style={styles.searchContainer}>
        <TextInput
          placeholderTextColor="whitesmoke"
          placeholder="Modele"
          style={styles.input}
          onChangeText={handleName}
          value={name}
        ></TextInput>
        <TextInput
          placeholderTextColor="whitesmoke"
          placeholder="Marque"
          style={styles.input}
          onChangeText={handleBrand}
          value={brand}
        ></TextInput>
        <TextInput
          placeholderTextColor="whitesmoke"
          placeholder="Couleur"
          style={styles.input}
          onChangeText={handleColor}
          value={color}
        ></TextInput>
      </View>
      <View>
        <FlatList data={sneakers} />
      </View>
    </KeyboardAwareScrollView>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "lightgray",

    paddingLeft: 10,
  },
  searchContainer: {
    height: "100%",
  },
});

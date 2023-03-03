import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";

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
    <ScrollView>
      <View style={styles.searchContainer}>
        <TextInput
          placeholderTextColor="#717171"
          placeholder="Modele"
          style={styles.input}
          onChangeText={handleName}
          value={name}
        ></TextInput>
        <TextInput
          placeholderTextColor="#717171"
          placeholder="Marque"
          style={styles.input}
          onChangeText={handleBrand}
          value={brand}
        ></TextInput>
        <TextInput
          placeholderTextColor="#717171"
          placeholder="Couleur"
          style={styles.input}
          onChangeText={handleColor}
          value={color}
        ></TextInput>
      </View>
      {/* ce n'est pas possible de mettre une FlatList comme ça, ça affiche un msg d'erreur */}
      <View>{/* <FlatList data={sneakers} /> */}</View>
    </ScrollView>
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

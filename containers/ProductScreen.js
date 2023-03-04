import { useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
const ProductScreen = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const [like, setLike] = useState("false");

  const handleLike = () => {
    setLike(!like);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        response = await axios.get(
          `https://site--skaners-back--jhlzj9jljvpm.code.run/sneakers/${route.params.id}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log("response.data :", response.data);
      } catch (error) {
        console.log("error : ", error);
      }
    };
    fetchData();
  }, []);
  if (isLoading) {
    return (
      <View>
        <Text>Composant de chargement</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.productScreenContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: data.picture }}
            resizeMode="contain"
            style={{
              width: wp("50%"),
              height: wp("50%"),
              borderWidth: 3,
            }}
          />
          <View style={styles.priceContainer}>
            <Text>PRIX RETAIL</Text>

            <Text>{data.price / 100} € </Text>
          </View>
          <Text></Text>
          <Text>
            <TouchableOpacity onPress={handleLike}>
              <AntDesign
                name={like ? "hearto" : "heart"}
                size={45}
                color="tomato"
              />
            </TouchableOpacity>
            {data.name}
          </Text>
          <Text>MARQUE : {data.brand}</Text>
          <Text>COLOR : {data.color}</Text>
        </View>
        <Text>Je suis la product screen</Text>
      </View>
    );
  }
};

export default ProductScreen;

const styles = StyleSheet.create({
  productScreenContainer: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: "yellow",
  },
  imageContainer: {
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "blue",
    alignItems: "center",
    alignContent: "center",
    heignt: "100%",
  },
  priceContainer: {
    borderWidth: 4,
    borderColor: "red",
  },
});

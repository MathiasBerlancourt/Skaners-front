import { useRoute } from "@react-navigation/native";
import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
const ProductScreen = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  console.log(route.params.id);
  console.log(
    `https://site--skaners-back--jhlzj9jljvpm.code.run/sneakers/${route.params.id}`
  );
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
      <View>
        <Image
          source={{ uri: data.picture }}
          resizeMode="contain"
          style={{ width: wp("50%"), height: wp("50%"), borderWidth: 3 }}
        />
        <Text>Je suis la product screen</Text>
      </View>
    );
  }
};

export default ProductScreen;

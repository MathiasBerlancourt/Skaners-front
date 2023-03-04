import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
const ProductScreen = () => {
  const [data, setData] = useState(null);
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
        console.log("response.data :", response.data);
      } catch (error) {
        console.log("error : ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>Je suis la product screen</Text>
    </View>
  );
};

export default ProductScreen;

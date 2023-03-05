import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.productScreenContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: data.picture }}
              resizeMode="contain"
              style={{
                width: wp("100%"),
                height: wp("100%"),
                borderWidth: 3,
              }}
            />
            <View style={styles.priceContainer}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "LouisGeorge",
                  fontSize: 18,
                }}
              >
                PRIX RETAIL
              </Text>

              <Text
                style={{
                  color: "black",
                  fontFamily: "LouisGeorge",
                  fontSize: 18,
                }}
              >
                {data.price / 100} €{" "}
              </Text>
            </View>

            <View style={styles.containerNameAndLike}>
              <TouchableOpacity onPress={handleLike}>
                <AntDesign
                  name={like ? "hearto" : "heart"}
                  size={30}
                  style={{ paddingBottom: 10, color: "#FF7E00" }}
                />
              </TouchableOpacity>
              <Text style={styles.sneakerName}>
                {"     "}
                {data.name.toUpperCase()}
              </Text>
            </View>

            <View>
              <View
                style={{
                  backgroundColor: "#FF7E00",
                  height: 1,
                  width: wp("90%"),
                  marginBottom: 20,
                }}
              ></View>
              <View>
                <Text style={styles.brandAndColor}>
                  MARQUE : {data.brand.toUpperCase()}
                </Text>
                <Text style={styles.brandAndColor}>
                  COLORIS : {data.color.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default ProductScreen;

const styles = StyleSheet.create({
  productScreenContainer: {
    height: hp("75%"),
    width: wp("100%"),
    backgroundColor: "white",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  priceContainer: {
    backgroundColor: "#717171",
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 40,
    width: wp("45%"),
    alignItems: "center",
  },
  containerNameAndLike: {
    flexDirection: "row",
    marginHorizontal: "10%",
    alignItems: "flex-start",
  },
  sneakerName: {
    fontFamily: "LouisGeorge",
    fontSize: 20,
    fontWeight: 100,

    textAlign: "center",
    justifyContent: "space-between",
  },
  lineBetween: {
    width: wp("45%"),
    borderBottomColor: "black",
    backgroundColor: "black",
  },
  brandAndColor: {
    fontSize: 15,
    color: "#717171",
  },
});

import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

import { useRoute, useNavigation } from "@react-navigation/native";

const ProductCardScreenSkan = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const product = route.params.product;
  const idUser = route.params.idUser;
  const refreshData = route.params.refreshData;
  const setRefreshData = route.params.setRefreshData;
  const size = 50;

  const [isDelete, setIsDelete] = useState(false);

  const showAlert = () => {
    Alert.alert(
      "Confirmation de suppression",
      "Es tu sur de vouloir supprimer cette paire?",
      [
        {
          text: "Oui",
          onPress: () => {
            setIsDelete(true);
            navigation.goBack();
          },
          style: "default",
        },
        {
          text: "Non",
          onDismiss: () => {},
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  useEffect(() => {
    const sendData = async () => {
      try {
        if (!isDelete) {
          return;
        }
        const response = await axios.put(
          "https://site--skaners-back--jhlzj9jljvpm.code.run/user/unlikeSkan",
          { userId: idUser, skanId: product._id }
        );
        setRefreshData(!refreshData);
      } catch (error) {
        console.log(error.message);
      }
    };

    sendData();
  }, [isDelete]);
  return (
    <View>
      <View style={styles.imgContainer}>
        <View>
          <Image style={styles.img} source={{ uri: product.pictureUrl }} />
        </View>
        <TouchableOpacity
          onPress={() => {
            showAlert();
          }}
        >
          <Entypo
            style={styles.delete}
            name="cross"
            size={size}
            color="#F86F00"
          />
        </TouchableOpacity>
      </View>
      <Text>Marque : {product.sneakerName}</Text>
      <Text>Description : {product.description}</Text>
      <Text>Lien : {product.linkUrl}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  imgContainer: {
    alignContent: "center",
    justifyContent: "center",
    height: 400,
    marginTop: 50,
  },
  img: {
    width: 300,
    height: 400,

    resizeMode: "cover",
    borderRadius: 20,
    marginLeft: 50,
  },
  delete: {
    position: "absolute",
    bottom: 350,
    left: 300,
  },
});

export default ProductCardScreenSkan;

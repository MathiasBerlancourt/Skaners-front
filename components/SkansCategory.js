import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SkansCategory = () => {
  const [idUser, setIdUser] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState();
  const [refreshData, setRefreshData] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getId = async () => {
      const idUser = await AsyncStorage.getItem("userId");
      setIdUser(idUser);
    };

    const fetchData = async () => {
      try {
        if (!idUser) {
          return;
        }
        const response = await axios.get(
          `https://site--skaners-back--jhlzj9jljvpm.code.run/user/info/${idUser}`
        );
        setData(response.data.skans);

        setIsLoad(true);
      } catch (error) {
        console.log(error.message);
      }
    };

    getId();
    fetchData();
  }, [idUser, refreshData]);

  return isLoad ? (
    <View style={styles.background}>
      <ScrollView>
        <View style={styles.skanContainer}>
          {data.map((skan) => {
            return (
              <TouchableOpacity
                key={skan._id}
                onPress={() => {
                  navigation.navigate("ProductCardSkan", {
                    product: skan,
                    idUser: idUser,
                    setRefreshData: setRefreshData,
                    refreshData: refreshData,
                  });
                }}
              >
                <Image style={styles.img} source={{ uri: skan.pictureUrl }} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  ) : (
    <Text>Is loading</Text>
  );
};
const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  skanContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  img: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
});

export default SkansCategory;

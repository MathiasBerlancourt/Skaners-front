import { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import axios from "axios";

const SkansCategory = () => {
  const [idUser, setIdUser] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState();

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
  }, []);

  return isLoad ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        {data.map((skan) => {
          return (
            <Image
              style={{ width: 300, height: 300 }}
              source={{ uri: skan.pictureUrl }}
            />
          );
        })}
      </View>
    </View>
  ) : (
    <Text>Is loading</Text>
  );
};

export default SkansCategory;

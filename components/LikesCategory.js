import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

const LikesCategory = () => {
  const [idUser, setIdUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!idUser) {
          return;
        }
        const response = await axios.get(
          `https://site--skaners-back--jhlzj9jljvpm.code.run/user/info/${idUser}`
        );
        setData(response.data.likes);

        setIsLoad(true);
      } catch (error) {
        console.log(error.message);
      }
    };
  });
  return (
    <View>
      <Text>Je suis LikesCategory</Text>
    </View>
  );
};

export default LikesCategory;

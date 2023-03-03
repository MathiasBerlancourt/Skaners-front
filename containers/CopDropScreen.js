import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import TinderCard from "react-tinder-card";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CopDropScreen = () => {
  const [lastDirection, setLastDirection] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState();
  const [idLike, setIdLike] = useState();
  const [idUser, setIdUser] = useState();

  useEffect(() => {
    const sendLike = async () => {
      try {
        if (lastDirection !== "right") {
          return;
        }
        const response = await axios.put(
          "https://site--skaners-back--jhlzj9jljvpm.code.run/user/likeSkan",
          { skanId: idLike, userId: idUser }
        );
        console.log(response.data);
        setLastDirection("");
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--skaners-back--jhlzj9jljvpm.code.run/allSkans"
        );

        // condition isCheck puis filter du tableau pr afficher seulement les skans valider
        // condition parcourir le tab skans du user (req) et faire un filter include des skans valider qui sont pas like

        setData(response.data);

        setIsLoad(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getId = async () => {
      const idUser = await AsyncStorage.getItem("userId");
      setIdUser(idUser);
    };
    getId();
    fetchData();
    sendLike();
  }, [lastDirection]);

  const swiped = (direction, id) => {
    setLastDirection(direction);
    if (direction === "right") {
      setIdLike(id);
    }
  };

  return isLoad ? (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {data.map((shoe) => (
          <TinderCard key={shoe._id} onSwipe={(dir) => swiped(dir, shoe._id)}>
            <View style={styles.card}>
              <ImageBackground
                style={styles.cardImage}
                source={{ uri: shoe.pictureUrl }}
              ></ImageBackground>
            </View>
          </TinderCard>
        ))}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.copText}>COP</Text>
        <Text style={styles.dropText}>DROP</Text>
      </View>
    </View>
  ) : (
    <Text>Loading</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  cardContainer: {
    height: 500,
    width: Dimensions.get("screen").width,
  },
  card: {
    marginVertical: Dimensions.get("screen").height / 8,
    marginHorizontal: Dimensions.get("screen").width / 12,
    position: "absolute",
    width: 300,
    height: 300,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
  },

  cardImage: {
    width: 300,
    height: 300,
    overflow: "hidden",
    borderLeftColor: "black",
    borderRightColor: "orange",
    borderTopColor: "orange",
    borderBottomColor: "black",
    borderWidth: 3,
    borderStyle: "solid",
    borderRadius: 20,
  },
  textContainer: {
    flexDirection: "row",
  },
  copText: {
    backgroundColor: "orange",
    borderRadius: 10,
    fontSize: 30,
    width: 110,
    height: 60,
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 10,
  },

  dropText: {
    backgroundColor: "black",
    borderRadius: 15,
    fontSize: 30,
    width: 110,
    height: 60,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 10,
  },

  infoText: {
    height: 28,
    justifyContent: "center",
    // zIndex: -100,
    backgroundColor: "yellow",
  },
});

export default CopDropScreen;

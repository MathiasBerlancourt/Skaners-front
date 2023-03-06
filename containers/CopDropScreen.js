import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, StyleSheet, Image } from "react-native";
import TinderCard from "react-tinder-card";
import axios from "axios";
import logo from "../assets/Images/skanerslogoS.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import sparks from "../assets/Json/effectSparksCopDrop.json";
import { useRef } from "react";
import { API_URL } from "react-native-dotenv";

const CopDropScreen = ({ token }) => {
  const [lastDirection, setLastDirection] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState();
  const [idLike, setIdLike] = useState();
  const [idUser, setIdUser] = useState();
  const [playAnimation, setPlayAnimation] = useState(false);
  const animation = useRef(null);

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    const sendLike = async () => {
      try {
        if (lastDirection !== "right") {
          return;
        }
        await axios({
          method: "PUT",
          url: `${API_URL}/user/likeSkan`,
          data: {
            skanId: idLike,
            userId: idUser,
          },
          headers: headers,
        });
        setPlayAnimation(false);
        setLastDirection("");
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${API_URL}/allSkans`,
          headers: headers,
        });
        if (!idUser) {
          return;
        }
        // je filtre le tableau une premiere fois pour avoir que les skans validés
        const tempTab = response.data.filter((sneaker) => sneaker.isChecked);

        // je filtre une 2 eme fois pour avoir que les skans validés qui ne viennent pas de notre user et je setData

        setData(tempTab.filter((sneaker) => sneaker.userId !== idUser));

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
  }, [lastDirection, idUser, playAnimation]);

  const swiped = (direction, id) => {
    setLastDirection(direction);
    if (direction === "right") {
      setPlayAnimation(true);
      setIdLike(id);
    }
  };

  return isLoad ? (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {data.length > 0 ? (
          data.map((shoe) => (
            <TinderCard key={shoe._id} onSwipe={(dir) => swiped(dir, shoe._id)}>
              <View style={styles.card}>
                <ImageBackground
                  style={styles.cardImage}
                  source={{ uri: shoe.pictureUrl }}
                ></ImageBackground>
              </View>
            </TinderCard>
          ))
        ) : (
          <Text>Quel crack t'as swipe toutes les paires</Text>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.dropText}>DROP</Text>
        <View>
          <Text style={styles.copText}>COP</Text>
          <View style={styles.sparksContainer}>
            {lastDirection === "right" ? (
              <LottieView
                ref={animation}
                autoPlay
                loop={false}
                style={styles.sparks}
                source={sparks}
              />
            ) : null}
          </View>
        </View>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
      </View>
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "white",
  },
  card: {
    position: "absolute",
    width: wp("100%"),
    height: hp("100%"),
  },

  cardImage: {
    flex: 1,
  },
  textContainer: {
    flexDirection: "row",
    flex: 1,
    position: "absolute",
    bottom: hp("2%"),
    left: wp("20%"),
  },
  copText: {
    backgroundColor: "#FF7E00",
    borderRadius: 20,
    fontSize: 30,
    width: wp("31%"),
    height: hp("7%"),
    lineHeight: hp("7%"),
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 10,
    fontFamily: "LouisGeorge",
    paddingLeft: 20,
  },

  dropText: {
    backgroundColor: "black",
    borderRadius: 20,
    fontSize: 30,
    width: wp("31%"),
    height: hp("7%"),
    lineHeight: hp("7%"),
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 10,
    fontFamily: "LouisGeorge",
    paddingRight: hp("3%"),
  },

  logo: {
    width: wp("12%"),
    height: hp("6%"),
  },
  logoContainer: {
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 6,
    borderRadius: 200,
    position: "absolute",
    left: wp("24%"),
    bottom: hp("1%"),
  },

  sparksContainer: {
    position: "absolute",
    left: wp("7%"),
    bottom: hp("0.01%"),
  },
  sparks: {
    // flex: 1,
    width: 250,
    height: 100,
  },
  // infoText: {
  //   height: 28,
  //   justifyContent: "center",
  //   // zIndex: -100,
  //   backgroundColor: "yellow",
  // },
});

export default CopDropScreen;

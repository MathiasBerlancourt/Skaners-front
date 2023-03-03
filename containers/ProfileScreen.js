import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen({ setToken, setId, refresh }) {
  const [data, setData] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const id = await AsyncStorage.getItem("userId");

        if (id) {
          const response = await axios.get(
            `https://site--skaners-back--jhlzj9jljvpm.code.run/user/info/${id}`
          );

          setData(response.data);
          setId(id);
        } else {
          alert("Bad request");
        }
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [refresh]);

  return (
    <View style={styles.container}>
      <View>
        {data.adminRank > 0 && (
          <TouchableOpacity
            style={styles.btnAdmin}
            onPress={() => {
              navigation.navigate("SkansCheck", { id: data._id });
            }}
          >
            <Text style={styles.btnAdminTxt}>ADMIN</Text>
          </TouchableOpacity>
        )}
        <View style={styles.avatarBox}>
          <Image
            source={
              data.pictureUrl
                ? { uri: data.pictureUrl }
                : require("../assets/Images/blank_pfp.png")
            }
            style={styles.avatar}
          />
          <Text style={styles.name}>{data.firstName}</Text>
          <Text>{data.userName}</Text>
        </View>
        <View style={styles.parameters}>
          <Text style={styles.paramsTitle}>PARAMETRES</Text>
          <View style={styles.infoBox}>
            <Text style={styles.labelColor}>Nom d'utilisateur</Text>
            <Text>{data.userName}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.labelColor}>Adresse e-mail</Text>
            <Text>{data.email}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.labelColor}>Numéro de téléphone</Text>
            <Text>{data.phoneNumber}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.labelColor}>Pointure</Text>
            <Text>{data.shoeSize} EU</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.labelColor}>Marque favorite</Text>
            <Text>{data.favoriteBrand}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UpdateProfile", {
              elem: data,
            });
          }}
        >
          <Text style={styles.updateText}>Mettre à jour les informations</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setToken(null);
          setId(null);
        }}
      >
        <Text style={styles.btnTxt}>Deconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
  },

  avatar: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    borderRadius: 100,
    borderColor: "#717171",
    borderWidth: 2,
  },

  btnAdmin: {
    position: "absolute",
    zIndex: 1,
    padding: hp("2%"),
    borderRadius: wp("2%"),
    right: 0,
    top: hp("2%"),
    backgroundColor: "red",
  },

  btnAdminTxt: {
    color: "white",
    fontWeight: "bold",
  },

  name: {
    fontFamily: "LouisGeorge",
    fontSize: hp("3%"),
    textAlign: "center",
    color: "#515151",
    marginTop: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  avatarBox: {
    paddingVertical: 20,
    marginBottom: 10,
    alignItems: "center",
  },

  parameters: {
    width: wp("90%"),
  },

  paramsTitle: {
    fontSize: hp("2%"),
    marginBottom: hp("2.5%"),
  },

  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("2.5%"),
  },

  labelColor: {
    color: "#717171",
  },

  btn: {
    height: 50,
    backgroundColor: "#000",
    borderRadius: 15,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 40,
  },

  btnTxt: {
    fontFamily: "LouisGeorge",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  updateText: {
    fontSize: hp("2%"),
    textAlign: "center",
    fontWeight: 500,
    textDecorationLine: "underline",
  },
});

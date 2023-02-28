import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from "axios";

export default function ProfileScreen({ setToken, setId }) {
  const [data, setData] = useState({});

  useEffect(() => {
    try {
      const fetchData = async () => {
        const id = await AsyncStorage.getItem("userId");

        if (id) {
          const response = await axios.get(
            `https://site--skaners-back--jhlzj9jljvpm.code.run/user/info/${id}`
          );

          setData(response.data);
        } else {
          alert("Noooooo");
        }
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarBox}>
        <Image
          source={
            data.pictureUrl
              ? { uri: data.pictureUrl }
              : require("../assets/Images/blank_pfp.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{data.username}</Text>
      </View>
      {data.adminRank && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            console.log("admin");
          }}
        >
          <Text style={styles.btnTxt}>Admin Panel</Text>
        </TouchableOpacity>
      )}
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
    justifyContent: "space-between",
    backgroundColor: "white",
    flex: 1,
  },

  avatar: {
    height: 150,
    width: 150,
    resizeMode: "cover",
    borderRadius: 100,
    borderColor: "#717171",
    borderWidth: 2,
  },

  name: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  avatarBox: {
    paddingVertical: 20,
    marginBottom: 10,
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
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

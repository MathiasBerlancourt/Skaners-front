import {
  Text,
  TextInput,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API_URL } from "react-native-dotenv";

const SingleSkanScreen = ({ route, navigation }) => {
  const data = route.params.elem;

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");

  const updateCheck = {
    skanId: data._id,
    sneakerName: name,
    description: desc,
    linkUrl: link,
  };

  const sendSkanResponse = async () => {
    try {
      await axios.put(`${API_URL}/checkSkan`, updateCheck);
      const createTwoButtonAlert = () =>
        Alert.alert("Message", "Le skan a été checké", [
          { text: "OK", onPress: () => navigation.navigate("SkansCheck") },
        ]);

      createTwoButtonAlert();
    } catch (error) {
      console.log(error.message);
      alert("Votre requête a échoué");
    }
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <Image
          style={{
            height: 350,
            width: 500,
          }}
          source={{ uri: data.pictureUrl }}
          resizeMode="contain"
        />
        <View style={styles.inputBox}>
          <TextInput
            onChangeText={(e) => {
              setName(e);
            }}
            value={name}
            style={styles.input}
            placeholder={"Marque de la paire"}
            placeholderTextColor="#414141"
          />
          <TextInput
            onChangeText={(e) => {
              setDesc(e);
            }}
            value={desc}
            style={styles.input}
            placeholderTextColor="#414141"
            placeholder={"Modèle de la paire"}
          />
          <TextInput
            onChangeText={(e) => {
              setLink(e);
            }}
            value={link}
            style={styles.input}
            placeholderTextColor="#414141"
            placeholder={"Lien de la paire"}
          />
        </View>
        <TouchableOpacity style={styles.btnCheck} onPress={sendSkanResponse}>
          <Text style={styles.btnCheckTxt}>Check</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SingleSkanScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },

  inputBox: {
    paddingHorizontal: "10%",
    width: "100%",
  },

  input: {
    fontSize: hp("2%"),
    fontFamily: "LouisGeorge",
    padding: 10,
    marginVertical: hp("1.5%"),
    backgroundColor: "lightgray",
    borderRadius: 20,
  },

  btnCheck: {
    height: 50,
    backgroundColor: "green",
    borderRadius: 15,
    width: wp(80),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: hp("2.5%"),
  },

  btnCheckTxt: {
    color: "white",
    fontFamily: "LouisGeorgeBold",
    textAlign: "center",
    fontSize: 23,
  },
});

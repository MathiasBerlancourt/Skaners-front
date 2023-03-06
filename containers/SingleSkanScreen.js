import {
  Text,
  TextInput,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
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
            backgroundColor: "black",
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
            placeholder={"Nom de la paire"}
          />
          <TextInput
            onChangeText={(e) => {
              setDesc(e);
            }}
            value={desc}
            style={styles.input}
            placeholder={"Description de la paire"}
          />
          <TextInput
            onChangeText={(e) => {
              setLink(e);
            }}
            value={link}
            style={styles.input}
            placeholder={"Lien de la paire"}
          />
        </View>
        <TouchableOpacity style={styles.btnCheck} onPress={sendSkanResponse}>
          <Text style={styles.btnCheckTxt}>CHECK</Text>
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
    marginBottom: "4%",
  },

  input: {
    fontSize: 18,
    padding: 10,
    marginVertical: 15,
    borderBottomWidth: 1,
    position: "relative",
  },

  btnCheck: {
    backgroundColor: "green",
    height: 50,
    width: 300,
    marginBottom: 25,
    justifyContent: "center",
  },

  btnCheckTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

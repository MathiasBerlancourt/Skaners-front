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

const SingleSkanScreen = ({ route, navigation, refresh, setRefresh }) => {
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
      await axios.put(
        "https://site--skaners-back--jhlzj9jljvpm.code.run/checkSkan",
        updateCheck
      );
      const createTwoButtonAlert = () =>
        Alert.alert("Message", "Le skan a été checké", [
          { text: "OK", onPress: () => navigation.navigate("SkansCheck") },
        ]);

      setRefresh(!refresh);

      createTwoButtonAlert();
    } catch (error) {
      console.log(error.message);
      alert("Votre requête a échoué");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          style={{ height: 200, width: 500 }}
          source={{ uri: data.pictureUrl }}
          resizeMode="cover"
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
              setLink(e);
            }}
            value={link}
            style={styles.input}
            placeholder={"Lien de la paire"}
          />
          <TextInput
            onChangeText={(e) => {
              setDesc(e);
            }}
            value={desc}
            style={styles.textArea}
            placeholder={"Description de la paire"}
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
    borderWidth: 2,
    position: "relative",
  },
  textArea: {
    fontSize: 18,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginVertical: 25,
    height: 100,
    borderColor: "black",
    borderWidth: 2,
  },

  btnCheck: {
    backgroundColor: "green",
    height: 50,
    width: 300,
    justifyContent: "center",
  },

  btnCheckTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

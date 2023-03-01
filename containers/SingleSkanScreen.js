import { Text, TextInput, Image, View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";

const SingleSkanScreen = () => {
  const { params } = useRoute();

  console.log(params);

  const sendSkanResponse = async () => {};

  return (
    <View>
      <Image
        style={{ height: 200, width: 500 }}
        source={{ uri: params.picture }}
        resizeMode="stretch"
      />
      <View style={styles.inputBox}>
        <TextInput style={styles.input} placeholder={"Nom de la paire"} />
        <TextInput style={styles.input} placeholder={"Lien de la paire"} />
        <TextInput
          style={styles.textArea}
          placeholder={"Description de la paire"}
        />
      </View>
    </View>
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
    fontSize: "18em",
    padding: 10,
    marginVertical: 15,
    borderWidth: 2,
    position: "relative",
  },
  textArea: {
    fontSize: "18em",
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginVertical: 25,
    height: 100,
    borderColor: "black",
    borderWidth: 2,
  },
});

import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

const SkansCheckScreen = ({ route, navigation, refresh, setRefresh }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (route.params.id) {
          const response = await axios.get(
            `https://site--skaners-back--jhlzj9jljvpm.code.run/allSkans`
          );

          setData(response.data.reverse());
        } else {
          alert("Noooooo");
        }
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [refresh]);

  const handleSkanDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://site--skaners-back--jhlzj9jljvpm.code.run/deleteSkan/${id}`
      );
      setRefresh(!refresh);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView>
      <Text>Nombre d'éléments à skanner : {data.length}</Text>
      {Array.isArray(data) &&
        data.map((elem, i) => {
          return (
            elem.isChecked === false && (
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  navigation.navigate("SingleSkan", {
                    elem,
                  });
                }}
                key={i}
              >
                <Image
                  style={{
                    height: 200,
                    width: 300,
                    borderColor: "#717171",
                    borderWidth: 3,
                    marginVertical: 10,
                  }}
                  source={{ uri: elem.pictureUrl }}
                />
                <TouchableOpacity
                  style={styles.btnDelete}
                  onPress={() => {
                    handleSkanDelete(elem._id);
                  }}
                >
                  <Text style={styles.btnDeleteTxt}>Delete</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btnDelete: {
    backgroundColor: "red",
    flex: 1,
    height: 50,
    justifyContent: "center",
  },

  btnDeleteTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

export default SkansCheckScreen;

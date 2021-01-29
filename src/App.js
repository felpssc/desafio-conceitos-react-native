import React, { useEffect, useState } from "react";
import api from "./services/api";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    await api.post(`/repositories/${id}/like`);
    const response = await api.get("/repositories");

    setRepository([...response.data]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Text style={styles.title}>GoStack</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={(repo) => repo.id}
          renderItem={({ item: repo, techs = repo.techs }) => (
            <View key={repo} style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repo.title}</Text>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={styles.techsContainer}
              >
                {techs.map((tech) => {
                  return (
                    <Text key={repo.tech} style={styles.tech}>
                      {tech}
                    </Text>
                  );
                })}
              </ScrollView>

              <View style={styles.likesContainer}>
                <Text style={styles.likeText}>💜 {repo.likes} curtidas</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={() => handleLikeRepository(repo.id)}
              >
                <Text style={styles.buttonText}>{"Curtir <3"}</Text>
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    fontSize: 24,
    backgroundColor: "#7159c1",
    textAlign: "center",
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 3,
  },
  repository: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5A5A5A",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
    overflow: "scroll",
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    borderRadius: 3,
    width: "100%",
    textAlign: "center",
  },
});

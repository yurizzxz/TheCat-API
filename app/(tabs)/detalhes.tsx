import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function DetalhesScreen() {
  const { id, url, width, height } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image source={{ uri: String(url) }} style={styles.image} />
      <Text style={styles.text}>🐱 ID: {id}</Text>
      <Text style={styles.text}>📏 Largura: {width}</Text>
      <Text style={styles.text}>📐 Altura: {height}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});

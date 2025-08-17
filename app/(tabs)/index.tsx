import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default function ListaScreen() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchCats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Cat[]>(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      );
      setCats(response.data);
    } catch (error) {
      setError("Erro ao carregar gatinhos 😿. Tente novamente." );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  if (error)
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <TouchableOpacity onPress={fetchCats}>
          <Text style={{ color: "blue", marginTop: 8 }}>🔄 Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <FlatList
      data={cats}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push({ pathname: "/detalhes", params: { ...item } })}
        >
          <Image source={{ uri: item.url }} style={styles.image} />
          <Text>ID: {item.id}</Text>
          <Text>Width: {item.width}</Text>
          <Text>Height: {item.height}</Text>
              
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    elevation: 2,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

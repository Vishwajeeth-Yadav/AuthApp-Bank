import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

// Define the valid product routes and icons
const products = [
  { id: "1", name: "Banking Accounts", route: "../products/BankingAccounts", icon: "account-balance" },
  { id: "2", name: "Credit Cards", route: "../products/CreditCards", icon: "credit-card" },
  { id: "3", name: "SIM Cards", route: "../products/SimCards", icon: "sim-card" },
  { id: "4", name: "Insurance", route: "../products/Insurance", icon: "security" },
  { id: "5", name: "Other Services", route: "../products/OtherServices", icon: "miscellaneous-services" },
] as const; // Ensure TypeScript infers literal types

export default function Products() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push(item.route)}>
            <MaterialIcons name={item.icon as keyof typeof MaterialIcons.glyphMap} size={28} color="#007bff" />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

import { View, Text, StyleSheet, ScrollView } from "react-native";
import DashboardCard from "@/components/DashboardCard";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome Back, User 👋</Text>
      <Text style={styles.subtitle}>Here's a quick summary of your account.</Text>

      <View style={styles.cardContainer}>
        <DashboardCard title="Total Orders" value="42" icon="shopping-cart" color="#007bff" />
        <DashboardCard title="Pending Tasks" value="5" icon="event-note" color="#ff9800" />
      </View>

      <View style={styles.cardContainer}>
        <DashboardCard title="Messages" value="12" icon="message" color="#4caf50" />
        <DashboardCard title="Notifications" value="3" icon="notifications" color="#e91e63" />
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityBox}>
        <Text style={styles.activityText}>✅ Order #1245 has been shipped.</Text>
        <Text style={styles.activityText}>🕒 Your subscription renews in 3 days.</Text>
        <Text style={styles.activityText}>📢 New update available for your profile.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  activityBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  activityText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
});

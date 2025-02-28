import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthLoading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("jwt_token");

      if (jwtToken) {
        router.replace("/Dashboard"); // Redirect to Dashboard
      } else {
        router.replace("/main"); // Redirect to Login
      }
    } catch (error) {
      console.error("Auth Check Error:", error);
      router.replace("/login"); // If error, go to Login
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6200EE" />
    </View>
  );
};

export default AuthLoading;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

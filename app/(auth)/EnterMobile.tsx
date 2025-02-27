import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EnterMobile(): JSX.Element {
  const router = useRouter();
  const [mobile, setMobile] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await AsyncStorage.getItem("jwt_token");
      if (!storedToken) {
        Alert.alert("Session Expired", "Please log in again.");
        router.replace("/(auth)/login");
      } else {
        setToken(storedToken);
      }
      setCheckingAuth(false);
    };

    checkAuth();
  }, []);

  const handleSendOTP = async () => {
    if (!token) return; // Prevent request if no token

    if (!/^\d{10}$/.test(mobile.trim())) {
      Alert.alert("Error", "Enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://dev.safeaven.com/api/accounts/ask-mobile",
        { mobile },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        Alert.alert("Success", "OTP sent to your mobile.");
        router.push(`/(auth)/VerifyMobile?mobile=${encodeURIComponent(mobile)}`);
      } else {
        throw new Error(response.data.message || "Failed to send OTP.");
      }
    } catch (error: any) {
      console.error("Send OTP Error:", error);
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a1b9a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.content}>
        <Text style={styles.heading}>Enter Your Mobile Number</Text>
        <Text style={styles.subText}>We’ll send an OTP for verification.</Text>

        {/* Mobile Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobile}
          onChangeText={setMobile}
          editable={!loading}
        />
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} disabled={loading}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextButton, loading && styles.disabledButton]}
          onPress={handleSendOTP}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.nextText}>Next</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // Light purple for subtle theme change
    padding: 20,
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#00000",
  },
  subText: {
    fontSize: 16,
    color: "#6a1b9a",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  backText: {
    fontSize: 16,
    color: "#4a148c",
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  nextText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

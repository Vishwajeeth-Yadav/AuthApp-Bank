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
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VerifyMobile(): JSX.Element {
  const router = useRouter();
  const { mobile } = useLocalSearchParams<{ mobile: string }>();
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  // Mask mobile number, showing only the last 4 digits
  const maskedMobile = mobile ? `XXXXXXXX${mobile.slice(-4)}` : "XXXXXXXXXX";

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

  const handleVerifyOTP = async () => {
    if (!token) return; // Prevent request if no token

    if (otp.length !== 4) {
      Alert.alert("Error", "Enter a valid 4-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://dev.safeaven.com/api/accounts/verify-mobile-otp",
        { mobile, otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        Alert.alert("Success", "Mobile number verified.");
        router.push("/(auth)/EnterPersonalInfo"); // Navigate to next step
      } else {
        throw new Error(response.data.message || "Invalid OTP.");
      }
    } catch (error: any) {
      console.error("Verify OTP Error:", error);
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!token) return;

    setResendLoading(true);
    try {
      const response = await axios.post(
        "https://dev.safeaven.com/api/accounts/resend-mobile-otp",
        { mobile },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        Alert.alert("Success", "New OTP sent to your mobile.");
      } else {
        throw new Error(response.data.message || "Failed to resend OTP.");
      }
    } catch (error: any) {
      console.error("Resend OTP Error:", error);
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setResendLoading(false);
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
        <Text style={styles.heading}>Verify Mobile Number</Text>
        <Text style={styles.subText}>Enter the OTP sent to {maskedMobile}</Text>

        {/* OTP Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="numeric"
          maxLength={4}
          value={otp}
          onChangeText={setOtp}
          editable={!loading}
        />

        {/* Resend OTP */}
        <TouchableOpacity onPress={handleResendOTP} disabled={resendLoading} style={styles.resendButton}>
          <Text style={[styles.resendText, resendLoading && styles.disabledText]}>
            {resendLoading ? "Resending..." : "Resend OTP"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} disabled={loading}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextButton, loading && styles.disabledButton]}
          onPress={handleVerifyOTP}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.nextText}>Verify</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    color: "#000000",
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
  resendButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  resendText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledText: {
    color: "#aaa",
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

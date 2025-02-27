import { useState, useRef } from "react";
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

export default function VerifyEmail(): JSX.Element {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      Alert.alert("Error", "Please enter the OTP.");
      return;
    }
    if (otp.length !== 4) {
      Alert.alert("Error", "OTP must be a 4-digit number.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://dev.safeaven.com/api/signup/verify-email-otp", {
        email,
        otp
      });

      if (response.status === 200) {
        Alert.alert("Success", "Email verified successfully!");
        router.push({ pathname: "/(auth)/SetPassword", params: { email } });
      } else {
        throw new Error(response.data?.message || "Invalid OTP, please try again.");
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
      const errorMessage = error.response?.data?.message || "Invalid OTP, please try again.";
      Alert.alert("Verification Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await axios.post("https://dev.safeaven.com/api/signup/resend-email-otp", { email });
      Alert.alert("Success", "A new OTP has been sent to your email.");
    } catch (error) {
      console.error("Resend OTP error:", error);
      Alert.alert("Error", "Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.content}>
        <Text style={styles.heading}>Verify Your Email</Text>
        <Text style={styles.subText}>Enter the OTP sent to:</Text>
        <View style={styles.emailBox}>
          <Text style={styles.emailText}>{email}</Text>
        </View>

        {/* OTP Input */}
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Enter OTP"
          placeholderTextColor="#A1A1A1"
          keyboardType="number-pad"
          maxLength={4}
          autoFocus
          value={otp}
          onChangeText={setOtp}
          editable={!loading}
        />

        {/* Resend OTP */}
        <TouchableOpacity onPress={handleResendOTP} disabled={resendLoading}>
          <Text style={[styles.resendText, resendLoading && styles.disabledText]}>
            {resendLoading ? "Resending OTP..." : "Resend OTP"}
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
    backgroundColor: "#f8f9fa",
    padding: 20,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
    textAlign: "center",
  },
  emailBox: {
    backgroundColor: "#eef2ff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 20,
    backgroundColor: "#fff",
    color: "#333",
    textAlign: "center",
    width: "80%",
    letterSpacing: 4,
    marginBottom: 10,
  },
  resendText: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "600",
    marginTop: 10,
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
    color: "#555",
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


import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, Snackbar, Card, Divider } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangeEmail = () => {
    const [newEmail, setNewEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [snackbar, setSnackbar] = useState({ visible: false, message: "", type: "success" });
    const router = useRouter();

    const handleSendOTP = async () => {
        if (!newEmail) {
            setSnackbar({ visible: true, message: "Please enter your new email", type: "error" });
            return;
        }

        try {
            setLoading(true);
            const jwt_token = await AsyncStorage.getItem("jwt_token");
            const response = await fetch("https://dev.safeaven.com/api/accounts/change-email", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt_token}` },
                body: JSON.stringify({ email: newEmail }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to send OTP");

            setOtpSent(true);
            setSnackbar({ visible: true, message: "OTP sent successfully!", type: "success" });
        } catch (error: any) {
            setSnackbar({ visible: true, message: error.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp) {
            setSnackbar({ visible: true, message: "Please enter the OTP", type: "error" });
            return;
        }

        try {
            setLoading(true);
            const jwt_token = await AsyncStorage.getItem("jwt_token");
            const response = await fetch("https://dev.safeaven.com/api/accounts/verify-change-email-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt_token}` },
                body: JSON.stringify({ email: newEmail, otp }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Email change failed");

            setSnackbar({ visible: true, message: "Email changed successfully!", type: "success" });
            setNewEmail("");
            setOtp("");
            setOtpSent(false);
        } catch (error: any) {
            setSnackbar({ visible: true, message: error.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Change Email" titleStyle={styles.cardTitle} />
                <Divider />
                <Card.Content>
                    {/* New Email Input */}
                    <TextInput
                        label="New Email"
                        value={newEmail}
                        onChangeText={setNewEmail}
                        style={styles.input}
                        mode="flat"
                        keyboardType="email-address"
                    />

                    {/* OTP Input (Only Show After Sending OTP) */}
                    {otpSent && (
                        <TextInput
                            label="Enter OTP"
                            value={otp}
                            onChangeText={setOtp}
                            style={styles.input}
                            mode="flat"
                            keyboardType="numeric"
                        />
                    )}

                    {/* Buttons */}
                    {!otpSent ? (
                        <Button mode="contained" onPress={handleSendOTP} loading={loading} disabled={loading} style={styles.button}>
                            Send OTP
                        </Button>
                    ) : (
                        <>
                            <Button mode="contained" onPress={handleVerifyOTP} loading={loading} disabled={loading} style={styles.button}>
                                Verify & Change Email
                            </Button>
                            <Button mode="text" onPress={handleSendOTP} disabled={loading} style={styles.resendButton}>
                                Resend OTP
                            </Button>
                        </>
                    )}

                    <Button mode="text" onPress={() => router.back()} style={styles.backButton}>
                        Back
                    </Button>
                </Card.Content>
            </Card>

            {/* Snackbar for alerts */}
            <Snackbar
                visible={snackbar.visible}
                onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
                style={snackbar.type === "error" ? styles.snackbarError : styles.snackbarSuccess}
            >
                {snackbar.message}
            </Snackbar>
        </View>
    );
};

export default ChangeEmail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#F8F9FA",
    },
    card: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "#FFF",
    },
    cardTitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "#FF9800",
    },
    input: {
        backgroundColor: "transparent",
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
        backgroundColor: "#FF9800",
        borderRadius: 5,
    },
    resendButton: {
        marginTop: 5,
        alignSelf: "center",
    },
    backButton: {
        marginTop: 10,
        alignSelf: "center",
    },
    snackbarError: {
        backgroundColor: "#D32F2F",
    },
    snackbarSuccess: {
        backgroundColor: "#388E3C",
    },
});

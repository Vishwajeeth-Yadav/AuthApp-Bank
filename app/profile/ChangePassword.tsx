import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, Button, Snackbar, Card, Divider, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [secureText, setSecureText] = useState({ current: true, new: true, confirm: true });
    const [snackbar, setSnackbar] = useState({ visible: false, message: "", type: "success" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setSnackbar({ visible: true, message: "All fields are required", type: "error" });
            return;
        }
        if (newPassword.length < 6) {
            setSnackbar({ visible: true, message: "Password must be at least 6 characters", type: "error" });
            return;
        }
        if (newPassword !== confirmPassword) {
            setSnackbar({ visible: true, message: "Passwords do not match", type: "error" });
            return;
        }

        try {
            setLoading(true);
            const jwt_token = await AsyncStorage.getItem("jwt_token");
            const response = await fetch("https://dev.safeaven.com/api/accounts/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt_token}`,
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to update password");

            setSnackbar({ visible: true, message: "Password changed successfully!", type: "success" });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            setSnackbar({ visible: true, message: error.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Change Password" titleStyle={styles.cardTitle} />
                <Divider />
                <Card.Content>
                    {/* Current Password */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            label="Current Password"
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            secureTextEntry={secureText.current}
                            style={styles.input}
                            mode="flat"
                            right={
                                <TextInput.Icon
                                    icon={secureText.current ? "eye-off" : "eye"}
                                    onPress={() => setSecureText({ ...secureText, current: !secureText.current })}
                                />

                            }
                            theme={{
                                colors: {
                                    text: "#000",
                                    primary: "#FF9800",
                                    placeholder: "#666",
                                },
                            }}
                        />
                    </View>

                    {/* New Password */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            label="New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={secureText.new}
                            style={styles.input}
                            mode="flat"
                            right={
                                <TextInput.Icon
                                    icon={secureText.new ? "eye-off" : "eye"}
                                    onPress={() => setSecureText({ ...secureText, new: !secureText.new })}
                                />
                            }
                            theme={{
                                colors: {
                                    text: "#000",
                                    primary: "#FF9800",
                                    placeholder: "#666",
                                },
                            }}
                        />
                    </View>

                    {/* Confirm Password */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            label="Confirm New Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={secureText.confirm}
                            style={styles.input}
                            mode="flat"
                            right={
                                <TextInput.Icon
                                    icon={secureText.confirm ? "eye-off" : "eye"}
                                    onPress={() => setSecureText({ ...secureText, confirm: !secureText.confirm })}
                                />
                            }
                            theme={{
                                colors: {
                                    text: "#000",
                                    primary: "#FF9800",
                                    placeholder: "#666",
                                },
                            }}
                        />
                    </View>

                    {/* Buttons */}
                    <Button
                        mode="contained"
                        onPress={handleChangePassword}
                        loading={loading}
                        disabled={loading}
                        style={styles.button}
                    >
                        Change Password
                    </Button>

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

export default ChangePassword;

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
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    input: {
        flex: 1,
        borderRadius:10

    },
    button: {
        marginTop: 10,
        backgroundColor: "#FF9800",
        borderRadius: 5,
    },
    backButton: {
        marginTop: 10,
        alignSelf: "center",
        color:"black"
    },
    snackbarError: {
        backgroundColor: "#D32F2F",
    },
    snackbarSuccess: {
        backgroundColor: "#388E3C",
    },
});

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";

export const checkUserProgress = async (jwtToken: string) => {
  try {
    const response = await axios.get("https://dev.safeaven.com/api/accounts/progress", {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    if (response.status === 200) {
      const { isEmailVerified, isMobileVerified, hasCompletedProfile, hasPasswordSet } = response.data;

      // Determine the next step
      if (!isEmailVerified) {
        router.replace("/(auth)/VerifyEmail");
      } else if (!hasPasswordSet) {
        router.replace("/(auth)/SetPassword");
      } else if (!isMobileVerified) {
        router.replace("/(auth)/EnterMobile");
      } else if (!hasCompletedProfile) {
        router.replace("/(auth)/EnterPersonalInfo");
      } else {
        router.replace("/(app)/Dashboard"); // Registration fully completed
      }
    } else {
      throw new Error("Failed to fetch progress.");
    }
  } catch (error) {
    console.error("Error fetching user progress:", error);
    Alert.alert("Error", "Unable to fetch account progress. Please try again.");
  }
};

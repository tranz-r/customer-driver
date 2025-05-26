import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight, LogIn } from "lucide-react-native";
import RoleSelector from "./components/RoleSelector";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<
    "customer" | "driver" | null
  >(null);

  const handleRoleSelect = (role: "customer" | "driver") => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    setIsLoading(true);
    // Simulate loading for demo purposes
    setTimeout(() => {
      setIsLoading(false);
      if (selectedRole === "customer") {
        router.push("/customer/dashboard");
      } else if (selectedRole === "driver") {
        router.push("/driver/dashboard");
      }
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Tranzr</Text>
        <Text style={styles.subtitle}>Removal Service Platform</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Select your role</Text>
        <Text style={styles.description}>
          Choose how you want to use Tranzr today. Your experience will be
          tailored based on your selection.
        </Text>

        <RoleSelector
          onSelectRole={handleRoleSelect}
          selectedRole={selectedRole}
        />

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedRole && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={!selectedRole || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.buttonText}>Continue</Text>
                <ArrowRight size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Sign in</Text>
          <LogIn size={16} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      <View style={styles.authOptions}>
        <Text style={styles.authText}>Or sign in with</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{
                uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=google",
              }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{
                uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=apple",
              }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 24,
    lineHeight: 24,
  },
  actionContainer: {
    marginTop: 32,
  },
  continueButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  disabledButton: {
    backgroundColor: "#A5B4FC",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    gap: 4,
  },
  loginText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4F46E5",
  },
  authOptions: {
    alignItems: "center",
    marginBottom: 20,
  },
  authText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 8,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  socialText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
});

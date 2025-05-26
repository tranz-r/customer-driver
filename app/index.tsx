import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowRight,
  LogIn,
  Truck,
  User,
  Mail,
  Lock,
  X,
} from "lucide-react-native";
import { mockAuthentication } from "./utils/mockData";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDriverLogin, setIsDriverLogin] = useState(false);
  const [showCustomerLoginModal, setShowCustomerLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");

  const handleGetStarted = () => {
    router.push("/customer/create-job");
  };

  const handleCustomerLogin = () => {
    setIsLoading(true);
    // Use mock authentication function
    mockAuthentication(email, password, (success) => {
      setIsLoading(false);
      if (success) {
        setShowCustomerLoginModal(false);
        router.push("/customer/dashboard");
      } else {
        // For prototyping, we'll just log the error and still allow login
        console.log(
          "Authentication would fail in production, but allowing for prototype",
        );
        setShowCustomerLoginModal(false);
        router.push("/customer/dashboard");
      }
    });
  };

  const handleCustomerSignup = () => {
    setIsLoading(true);
    // Use mock authentication for signup too
    mockAuthentication(email, password, (success) => {
      setIsLoading(false);
      // For prototyping, always consider signup successful
      setShowCustomerLoginModal(false);
      router.push("/customer/dashboard");
    });
  };

  const handleDriverLogin = () => {
    setIsDriverLogin(true);
  };

  const handleCustomerView = () => {
    setIsDriverLogin(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Customer Login/Signup Modal */}
          <Modal
            visible={showCustomerLoginModal}
            animationType="slide"
            transparent={true}
          >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
              <View className="bg-white w-[90%] max-w-md rounded-xl p-6 shadow-xl">
                <View className="flex-row justify-between items-center mb-6">
                  <Text className="text-2xl font-bold">
                    {isRegistering ? "Create Account" : "Welcome Back"}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowCustomerLoginModal(false)}
                  >
                    <X size={24} color="#6b7280" />
                  </TouchableOpacity>
                </View>

                {isRegistering && (
                  <View className="mb-4">
                    <Text className="text-gray-700 mb-2">Full Name</Text>
                    <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                      <User size={20} color="#6b7280" />
                      <TextInput
                        className="flex-1 ml-2"
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                      />
                    </View>
                  </View>
                )}

                <View className="mb-4">
                  <Text className="text-gray-700 mb-2">Email</Text>
                  <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                    <Mail size={20} color="#6b7280" />
                    <TextInput
                      className="flex-1 ml-2"
                      placeholder="Enter your email"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View className="mb-6">
                  <Text className="text-gray-700 mb-2">Password</Text>
                  <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                    <Lock size={20} color="#6b7280" />
                    <TextInput
                      className="flex-1 ml-2"
                      placeholder="Enter your password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                  </View>
                </View>

                <TouchableOpacity
                  className="bg-blue-600 py-3 rounded-lg mb-4"
                  onPress={
                    isRegistering ? handleCustomerSignup : handleCustomerLogin
                  }
                  disabled={isLoading}
                >
                  <Text className="text-white font-bold text-center text-lg">
                    {isLoading
                      ? "Please wait..."
                      : isRegistering
                        ? "Sign Up"
                        : "Sign In"}
                  </Text>
                </TouchableOpacity>

                <View className="flex-row items-center my-4">
                  <View className="flex-1 h-[1px] bg-gray-300" />
                  <Text className="mx-4 text-gray-500">OR</Text>
                  <View className="flex-1 h-[1px] bg-gray-300" />
                </View>

                <View className="flex-row space-x-4 mb-6">
                  <TouchableOpacity
                    className="flex-1 flex-row items-center justify-center bg-white border border-gray-300 py-3 rounded-lg"
                    onPress={() => console.log("Google login")}
                  >
                    <Image
                      source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
                      }}
                      style={{ width: 20, height: 20 }}
                    />
                    <Text className="ml-2 font-medium">Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-1 flex-row items-center justify-center bg-black py-3 rounded-lg"
                    onPress={() => console.log("Apple login")}
                  >
                    <Image
                      source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
                      }}
                      style={{ width: 20, height: 20, tintColor: "white" }}
                    />
                    <Text className="ml-2 font-medium text-white">Apple</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => setIsRegistering(!isRegistering)}
                >
                  <Text className="text-blue-600 text-center">
                    {isRegistering
                      ? "Already have an account? Sign In"
                      : "Don't have an account? Sign Up"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
            {!isDriverLogin ? (
              // Customer View
              <>
                <View style={styles.heroSection}>
                  <Text style={styles.heroTitle}>Moving Made Simple</Text>
                  <Text style={styles.heroDescription}>
                    Get instant quotes for your removal needs with our
                    AI-powered platform. Upload photos, videos, get a quote, and
                    book your move in minutes.
                  </Text>

                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1600518464441-9306b5986a39?w=500&q=80",
                    }}
                    style={styles.heroImage}
                  />

                  <View style={styles.featureRow}>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureTitle}>Quick Quotes</Text>
                      <Text style={styles.featureText}>
                        AI-powered instant pricing
                      </Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureTitle}>Verified Drivers</Text>
                      <Text style={styles.featureText}>
                        Professional service
                      </Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureTitle}>Easy Booking</Text>
                      <Text style={styles.featureText}>Book in minutes</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleGetStarted}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Text style={styles.buttonText}>Get Started</Text>
                      <ArrowRight size={20} color="#fff" />
                    </>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              // Driver Login View
              <View style={styles.loginContainer}>
                <View style={styles.loginHeader}>
                  <Truck size={32} color="#4F46E5" />
                  <Text style={styles.loginTitle}>Driver Login</Text>
                </View>

                <Text style={styles.loginDescription}>
                  Sign in to access your driver dashboard, manage jobs, and
                  track earnings.
                </Text>

                <View style={styles.authOptions}>
                  <Text style={styles.authText}>Sign in with</Text>
                  <View style={styles.socialButtons}>
                    <TouchableOpacity
                      style={styles.socialButton}
                      onPress={() => console.log("Google login")}
                    >
                      <Image
                        source={{
                          uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
                        }}
                        style={styles.socialIcon}
                      />
                      <Text style={styles.socialText}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.socialButton, { backgroundColor: "#000" }]}
                      onPress={() => console.log("Apple login")}
                    >
                      <Image
                        source={{
                          uri: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
                        }}
                        style={[styles.socialIcon, { tintColor: "white" }]}
                      />
                      <Text style={[styles.socialText, { color: "white" }]}>
                        Apple
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.emailLoginButton}
                  onPress={() => router.push("/driver/dashboard")}
                >
                  <LogIn size={18} color="#4F46E5" />
                  <Text style={styles.emailLoginText}>Continue with Email</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.footer}>
            {!isDriverLogin ? (
              <TouchableOpacity
                style={styles.driverToggle}
                onPress={handleDriverLogin}
              >
                <Truck size={16} color="#4F46E5" />
                <Text style={styles.driverToggleText}>I'm a driver</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.driverToggle}
                onPress={handleCustomerView}
              >
                <User size={16} color="#4F46E5" />
                <Text style={styles.driverToggleText}>I'm a customer</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
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
    width: "100%",
    maxWidth: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  heroSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  featureItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "100%",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  loginHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  loginDescription: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  authOptions: {
    width: "100%",
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
    width: "100%",
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
  emailLoginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: 14,
    width: "100%",
    gap: 8,
  },
  emailLoginText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4F46E5",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  driverToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 10,
  },
  driverToggleText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4F46E5",
  },
});

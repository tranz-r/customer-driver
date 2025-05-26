import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { User, Truck } from "lucide-react-native";

interface RoleSelectorProps {
  onSelectRole?: (role: "customer" | "driver") => void;
}

const RoleSelector = ({ onSelectRole = () => {} }: RoleSelectorProps) => {
  const router = useRouter();

  const handleRoleSelection = (role: "customer" | "driver") => {
    onSelectRole(role);

    // Navigate to the appropriate dashboard based on role
    if (role === "customer") {
      router.push("/customer/dashboard");
    } else {
      router.push("/driver/dashboard");
    }
  };

  return (
    <View className="w-full max-w-[350px] bg-white p-6 rounded-xl shadow-md">
      <Text className="text-xl font-bold text-center mb-4">
        Select your role
      </Text>

      <View className="flex-row justify-between space-x-4">
        {/* Customer Role Card */}
        <TouchableOpacity
          className="flex-1 bg-blue-50 p-4 rounded-lg border border-blue-200 items-center"
          onPress={() => handleRoleSelection("customer")}
          activeOpacity={0.7}
        >
          <View className="bg-blue-100 p-3 rounded-full mb-2">
            <User size={24} color="#1e40af" />
          </View>
          <Text className="font-semibold text-blue-900 mb-1">Customer</Text>
          <Text className="text-xs text-center text-blue-700">
            Request removals and track your jobs
          </Text>
        </TouchableOpacity>

        {/* Driver Role Card */}
        <TouchableOpacity
          className="flex-1 bg-green-50 p-4 rounded-lg border border-green-200 items-center"
          onPress={() => handleRoleSelection("driver")}
          activeOpacity={0.7}
        >
          <View className="bg-green-100 p-3 rounded-full mb-2">
            <Truck size={24} color="#166534" />
          </View>
          <Text className="font-semibold text-green-900 mb-1">Driver</Text>
          <Text className="text-xs text-center text-green-700">
            Accept jobs and manage deliveries
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RoleSelector;

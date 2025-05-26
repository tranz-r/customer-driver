import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import {
  MapPin,
  Clock,
  DollarSign,
  Play,
  Pause,
  RotateCw,
  Check,
  Menu,
  Bell,
  User,
} from "lucide-react-native";

interface Job {
  id: string;
  status: "available" | "assigned" | "in_progress" | "paused" | "completed";
  pickup: string;
  dropoff: string;
  estimatedTime: string;
  payment: number;
  distance: string;
  customerName: string;
  items: string[];
}

export default function DriverDashboard() {
  const [activeTab, setActiveTab] = useState<
    "available" | "current" | "history"
  >("current");

  // Mock data for jobs
  const availableJobs: Job[] = [
    {
      id: "job1",
      status: "available",
      pickup: "123 Main St, London",
      dropoff: "456 Park Ave, London",
      estimatedTime: "2 hours",
      payment: 120,
      distance: "5.2 miles",
      customerName: "John Smith",
      items: ["Sofa", "Dining Table", "Bed Frame"],
    },
    {
      id: "job2",
      status: "available",
      pickup: "789 Oak Rd, London",
      dropoff: "101 Pine St, London",
      estimatedTime: "1.5 hours",
      payment: 90,
      distance: "3.8 miles",
      customerName: "Emma Johnson",
      items: ["Wardrobe", "Bookshelf", "TV Stand"],
    },
  ];

  const currentJobs: Job[] = [
    {
      id: "job3",
      status: "in_progress",
      pickup: "222 Elm St, London",
      dropoff: "333 Maple Ave, London",
      estimatedTime: "2.5 hours",
      payment: 150,
      distance: "6.1 miles",
      customerName: "Sarah Williams",
      items: ["Refrigerator", "Washing Machine", "Couch"],
    },
  ];

  const historyJobs: Job[] = [
    {
      id: "job4",
      status: "completed",
      pickup: "444 Cedar Ln, London",
      dropoff: "555 Birch Rd, London",
      estimatedTime: "1 hour",
      payment: 75,
      distance: "2.5 miles",
      customerName: "Michael Brown",
      items: ["Desk", "Office Chair", "Filing Cabinet"],
    },
    {
      id: "job5",
      status: "completed",
      pickup: "666 Willow Way, London",
      dropoff: "777 Spruce St, London",
      estimatedTime: "3 hours",
      payment: 180,
      distance: "7.3 miles",
      customerName: "David Jones",
      items: ["King Bed", "Dresser", "Nightstands", "Dining Set"],
    },
  ];

  const renderJobActionButton = (job: Job) => {
    switch (job.status) {
      case "available":
        return (
          <TouchableOpacity
            className="bg-blue-500 py-2 px-4 rounded-lg"
            onPress={() => console.log("Accept job", job.id)}
          >
            <Text className="text-white font-bold text-center">Accept Job</Text>
          </TouchableOpacity>
        );
      case "assigned":
        return (
          <TouchableOpacity
            className="bg-green-500 py-2 px-4 rounded-lg flex-row items-center justify-center space-x-2"
            onPress={() => console.log("Start job", job.id)}
          >
            <Play size={16} color="white" />
            <Text className="text-white font-bold">Start Job</Text>
          </TouchableOpacity>
        );
      case "in_progress":
        return (
          <View className="flex-row space-x-2">
            <TouchableOpacity
              className="bg-amber-500 py-2 px-4 rounded-lg flex-row items-center justify-center flex-1"
              onPress={() => console.log("Pause job", job.id)}
            >
              <Pause size={16} color="white" />
              <Text className="text-white font-bold ml-1">Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-green-600 py-2 px-4 rounded-lg flex-row items-center justify-center flex-1"
              onPress={() => console.log("Complete job", job.id)}
            >
              <Check size={16} color="white" />
              <Text className="text-white font-bold ml-1">Complete</Text>
            </TouchableOpacity>
          </View>
        );
      case "paused":
        return (
          <TouchableOpacity
            className="bg-blue-500 py-2 px-4 rounded-lg flex-row items-center justify-center"
            onPress={() => console.log("Resume job", job.id)}
          >
            <RotateCw size={16} color="white" />
            <Text className="text-white font-bold ml-1">Resume Job</Text>
          </TouchableOpacity>
        );
      case "completed":
        return (
          <View className="bg-gray-100 py-2 px-4 rounded-lg">
            <Text className="text-gray-500 font-bold text-center">
              Completed
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderJobCard = (job: Job) => {
    return (
      <View key={job.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <View className="flex-row justify-between items-start mb-3">
          <View>
            <Text className="text-lg font-bold">Job #{job.id.slice(-4)}</Text>
            <Text className="text-gray-500">{job.customerName}</Text>
          </View>
          <View className="bg-blue-100 px-3 py-1 rounded-full">
            <Text className="text-blue-800 font-medium">
              {job.status === "in_progress"
                ? "In Progress"
                : job.status === "available"
                  ? "Available"
                  : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </Text>
          </View>
        </View>

        <View className="space-y-2 mb-4">
          <View className="flex-row items-center">
            <MapPin size={16} className="text-gray-500" />
            <Text className="text-gray-700 ml-2">Pickup: {job.pickup}</Text>
          </View>
          <View className="flex-row items-center">
            <MapPin size={16} className="text-gray-500" />
            <Text className="text-gray-700 ml-2">Dropoff: {job.dropoff}</Text>
          </View>
          <View className="flex-row items-center">
            <Clock size={16} className="text-gray-500" />
            <Text className="text-gray-700 ml-2">
              Est. Time: {job.estimatedTime}
            </Text>
          </View>
          <View className="flex-row items-center">
            <DollarSign size={16} className="text-gray-500" />
            <Text className="text-gray-700 ml-2">Payment: £{job.payment}</Text>
          </View>
        </View>

        <View className="mb-4">
          <Text className="font-medium mb-1">Items:</Text>
          <Text className="text-gray-700">{job.items.join(", ")}</Text>
        </View>

        {renderJobActionButton(job)}
      </View>
    );
  };

  const renderJobList = () => {
    switch (activeTab) {
      case "available":
        return availableJobs.length > 0 ? (
          availableJobs.map(renderJobCard)
        ) : (
          <View className="bg-white rounded-xl p-8 items-center justify-center">
            <Text className="text-gray-500 text-center">
              No available jobs at the moment.
            </Text>
            <Text className="text-gray-500 text-center mt-1">
              Check back soon!
            </Text>
          </View>
        );
      case "current":
        return currentJobs.length > 0 ? (
          currentJobs.map(renderJobCard)
        ) : (
          <View className="bg-white rounded-xl p-8 items-center justify-center">
            <Text className="text-gray-500 text-center">
              You have no active jobs.
            </Text>
            <Text className="text-gray-500 text-center mt-1">
              Check available jobs to get started!
            </Text>
          </View>
        );
      case "history":
        return historyJobs.length > 0 ? (
          historyJobs.map(renderJobCard)
        ) : (
          <View className="bg-white rounded-xl p-8 items-center justify-center">
            <Text className="text-gray-500 text-center">
              No job history yet.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-white">
        <TouchableOpacity>
          <Menu size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Driver Dashboard</Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity>
            <Bell size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <User size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Preview */}
      <View className="h-40 bg-gray-200 relative">
        <Image
          source="https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=800&q=80"
          className="w-full h-full"
          contentFit="cover"
        />
        <TouchableOpacity className="absolute bottom-3 right-3 bg-white p-2 rounded-lg shadow-md">
          <Text className="font-medium">Open Map</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View className="flex-row bg-white mb-4">
        <TouchableOpacity
          className={`flex-1 py-3 ${activeTab === "current" ? "border-b-2 border-blue-500" : ""}`}
          onPress={() => setActiveTab("current")}
        >
          <Text
            className={`text-center font-medium ${activeTab === "current" ? "text-blue-500" : "text-gray-500"}`}
          >
            Current
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 ${activeTab === "available" ? "border-b-2 border-blue-500" : ""}`}
          onPress={() => setActiveTab("available")}
        >
          <Text
            className={`text-center font-medium ${activeTab === "available" ? "text-blue-500" : "text-gray-500"}`}
          >
            Available
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 ${activeTab === "history" ? "border-b-2 border-blue-500" : ""}`}
          onPress={() => setActiveTab("history")}
        >
          <Text
            className={`text-center font-medium ${activeTab === "history" ? "text-blue-500" : "text-gray-500"}`}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Job List */}
      <ScrollView className="flex-1 px-4 pb-4">{renderJobList()}</ScrollView>
    </SafeAreaView>
  );
}

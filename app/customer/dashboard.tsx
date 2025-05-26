import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useNavigation } from "expo-router";
import {
  MapPin,
  Package,
  Clock,
  AlertCircle,
  Plus,
  ChevronRight,
  Truck,
  FileText,
} from "lucide-react-native";
import {
  mockActiveJobs,
  mockPastJobs,
  mockAuthentication,
  mockSaveNote,
} from "../utils/mockData";
import NoteModal from "../components/NoteModal";

interface Job {
  id: string;
  status: "scheduled" | "en-route" | "on-site" | "complete";
  address: string;
  date: string;
  time: string;
  items: number;
  estimatedHours: number;
  driverName?: string;
  driverImage?: string;
  driverEta?: string;
  note?: string;
}

const CustomerDashboard = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [activeJobs, setActiveJobs] = useState<Job[]>(mockActiveJobs);
  const [pastJobs, setPastJobs] = useState<Job[]>(mockPastJobs);

  // Note modal state
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    // For demo purposes, we'll just use the showLoginModal state
    if (isLoggedIn) {
      setShowLoginModal(false);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggingIn(true);
    // Use mock authentication function
    mockAuthentication(email, password, (success) => {
      setIsLoggingIn(false);
      if (success) {
        setIsLoggedIn(true);
        setShowLoginModal(false);
      } else {
        // For prototyping, we'll just log the error and still allow login
        console.log(
          "Authentication would fail in production, but allowing for prototype",
        );
        setIsLoggedIn(true);
        setShowLoginModal(false);
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data
    setTimeout(() => {
      // For prototyping, we could simulate getting new data
      const newJob = {
        id: `TRZ-${Math.floor(100000 + Math.random() * 900000)}`,
        status: Math.random() > 0.5 ? "scheduled" : "en-route",
        address: "New Address, London, UK",
        date: "2023-07-01",
        time: "13:00-15:00",
        items: Math.floor(Math.random() * 10) + 1,
        estimatedHours: Math.floor(Math.random() * 3) + 1,
      };

      // Randomly decide whether to add a new job for demo purposes
      if (Math.random() > 0.7) {
        setActiveJobs((prev) => [newJob, ...prev]);
      }

      setRefreshing(false);
    }, 1000);
  }, []);

  const handleCreateJob = () => {
    router.push("/customer/create-job");
  };

  const getStatusColor = (status: Job["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500";
      case "en-route":
        return "bg-yellow-500";
      case "on-site":
        return "bg-purple-500";
      case "complete":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: Job["status"]) => {
    switch (status) {
      case "scheduled":
        return "Scheduled";
      case "en-route":
        return "Driver En Route";
      case "on-site":
        return "Driver On Site";
      case "complete":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const handleOpenNoteModal = (job: Job) => {
    setSelectedJob(job);
    setShowNoteModal(true);
  };

  const handleSaveNote = (note: string) => {
    if (!selectedJob) return;

    mockSaveNote(selectedJob.id, note, (success) => {
      if (success) {
        // Update the job in the appropriate list
        if (selectedJob.status === "complete") {
          setPastJobs(
            pastJobs.map((job) =>
              job.id === selectedJob.id ? { ...job, note } : job,
            ),
          );
        } else {
          setActiveJobs(
            activeJobs.map((job) =>
              job.id === selectedJob.id ? { ...job, note } : job,
            ),
          );
        }
      }
    });
  };

  const renderJobCard = (job: Job) => {
    const isJobIdFormat = job.id.startsWith("TRZ-");

    return (
      <TouchableOpacity
        key={job.id}
        className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
        onPress={() => console.log(`View job ${job.id} details`)}
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View
                className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(job.status)}`}
              />
              <Text className="text-sm font-medium text-gray-600">
                {getStatusText(job.status)}
              </Text>
            </View>
            <View className="flex-row items-start mb-2">
              <MapPin size={16} color="#4b5563" className="mt-1 mr-2" />
              <Text className="flex-1 text-gray-800 font-medium">
                {job.address}
              </Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Clock size={16} color="#4b5563" className="mr-2" />
              <Text className="text-gray-600">
                {job.date}, {job.time}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Package size={16} color="#4b5563" className="mr-2" />
              <Text className="text-gray-600">
                {job.items} items · {job.estimatedHours} hrs estimated
              </Text>
            </View>
          </View>
          <ChevronRight size={20} color="#9ca3af" />
        </View>

        {job.status === "en-route" && job.driverName && (
          <View className="mt-4 pt-4 border-t border-gray-100">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                {job.driverImage ? (
                  <Image
                    source={{ uri: job.driverImage }}
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                ) : (
                  <View className="w-10 h-10 rounded-full bg-gray-200" />
                )}
                <View className="ml-3">
                  <Text className="font-medium">{job.driverName}</Text>
                  <Text className="text-sm text-gray-500">Your driver</Text>
                </View>
              </View>
              <View className="flex-row items-center bg-blue-50 px-3 py-1 rounded-full">
                <Truck size={14} color="#3b82f6" className="mr-1" />
                <Text className="text-sm text-blue-600">
                  ETA {job.driverEta}
                </Text>
              </View>
            </View>
          </View>
        )}

        {isJobIdFormat && (
          <View className="mt-3 pt-3 border-t border-gray-100">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-gray-500">Payment Reference</Text>
              <Text className="font-medium text-blue-600">{job.id}</Text>
            </View>
          </View>
        )}

        {/* Note section */}
        <View className="mt-3 pt-3 border-t border-gray-100">
          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-medium text-gray-700">Notes</Text>
            <TouchableOpacity
              className="bg-gray-100 p-2 rounded-full"
              onPress={() => handleOpenNoteModal(job)}
            >
              <FileText size={16} color="#4b5563" />
            </TouchableOpacity>
          </View>
          {job.note ? (
            <Text className="text-sm text-gray-600 mt-1">{job.note}</Text>
          ) : (
            <Text className="text-sm text-gray-400 mt-1 italic">
              No notes added
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Login Modal */}
      <Modal visible={showLoginModal} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white w-[90%] max-w-md rounded-xl p-6 shadow-xl">
            <Text className="text-2xl font-bold text-center mb-6">Sign In</Text>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2">Email</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 mb-2">Password</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              className="bg-blue-600 py-3 rounded-lg mb-4"
              onPress={handleLogin}
              disabled={isLoggingIn}
            >
              <Text className="text-white font-bold text-center">
                {isLoggingIn ? "Signing in..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/")}>
              <Text className="text-blue-600 text-center">Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView
        className="flex-1 px-4 pt-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900">Dashboard</Text>
          <Text className="text-gray-600">
            Manage and track your removal jobs
          </Text>
        </View>

        {/* Create New Job Button */}
        <TouchableOpacity
          className="bg-blue-600 rounded-xl p-4 mb-6 flex-row items-center justify-center shadow-sm"
          onPress={handleCreateJob}
        >
          <Plus size={20} color="#ffffff" />
          <Text className="text-white font-semibold ml-2 text-lg">
            Create New Job
          </Text>
        </TouchableOpacity>

        {/* Active Jobs Section */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            Active Jobs
          </Text>
          {activeJobs.length > 0 ? (
            activeJobs.map(renderJobCard)
          ) : (
            <View className="bg-white rounded-xl p-6 items-center justify-center border border-gray-100">
              <AlertCircle size={32} color="#9ca3af" />
              <Text className="mt-2 text-gray-500 text-center">
                No active jobs found
              </Text>
              <Text className="text-gray-400 text-center text-sm">
                Create a new job to get started
              </Text>
            </View>
          )}
        </View>

        {/* Past Jobs Section */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            Job History
          </Text>
          {pastJobs.length > 0 ? (
            pastJobs.map(renderJobCard)
          ) : (
            <View className="bg-white rounded-xl p-6 items-center justify-center border border-gray-100">
              <AlertCircle size={32} color="#9ca3af" />
              <Text className="mt-2 text-gray-500 text-center">
                No job history found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Note Modal */}
      {selectedJob && (
        <NoteModal
          visible={showNoteModal}
          onClose={() => setShowNoteModal(false)}
          onSave={handleSaveNote}
          initialNote={selectedJob.note || ""}
          jobId={selectedJob.id}
        />
      )}
    </SafeAreaView>
  );
};

export default CustomerDashboard;

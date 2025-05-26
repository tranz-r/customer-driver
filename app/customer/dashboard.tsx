import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  MapPin,
  Package,
  Clock,
  AlertCircle,
  Plus,
  ChevronRight,
  Truck,
} from "lucide-react-native";

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
}

const CustomerDashboard = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeJobs, setActiveJobs] = React.useState<Job[]>([
    {
      id: "1",
      status: "en-route",
      address: "123 Main Street, London, UK",
      date: "2023-06-15",
      time: "14:00-16:00",
      items: 12,
      estimatedHours: 2,
      driverName: "John Smith",
      driverImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      driverEta: "15 mins",
    },
    {
      id: "2",
      status: "scheduled",
      address: "456 Park Avenue, Manchester, UK",
      date: "2023-06-20",
      time: "10:00-13:00",
      items: 8,
      estimatedHours: 3,
    },
  ]);

  const [pastJobs, setPastJobs] = React.useState<Job[]>([
    {
      id: "3",
      status: "complete",
      address: "789 Oak Road, Birmingham, UK",
      date: "2023-06-01",
      time: "09:00-11:00",
      items: 5,
      estimatedHours: 2,
      driverName: "Sarah Johnson",
      driverImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data
    setTimeout(() => {
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

  const renderJobCard = (job: Job) => (
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
              <Text className="text-sm text-blue-600">ETA {job.driverEta}</Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
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
    </View>
  );
};

export default CustomerDashboard;

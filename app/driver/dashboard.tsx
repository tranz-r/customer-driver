import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
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
  FileText,
  Download,
  Upload,
  X,
  LogOut,
  Edit,
} from "lucide-react-native";
import {
  mockAvailableJobs,
  mockCurrentJobs,
  mockHistoryJobs,
  mockPayslips,
  mockInvoices,
  mockAuthentication,
} from "../utils/mockData";

// Mock save note function
const mockSaveNote = (
  jobId: string,
  note: string,
  callback: (success: boolean) => void,
) => {
  // Simulate API call
  setTimeout(() => {
    callback(true);
  }, 1000);
};
import NoteModal from "../components/NoteModal";

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
  note?: string;
}

export default function DriverDashboard() {
  const [activeTab, setActiveTab] = useState<
    "available" | "current" | "history" | "payslips" | "invoices"
  >("current");

  const [showLoginModal, setShowLoginModal] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Note modal state
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleLogin = () => {
    setIsLoggingIn(true);
    // Use mock authentication function
    mockAuthentication(email, password, (success) => {
      setIsLoggingIn(false);
      if (success) {
        setShowLoginModal(false);
        setIsAuthenticated(true);
      } else {
        // For prototyping, we'll just log the error and still allow login
        console.log(
          "Authentication would fail in production, but allowing for prototype",
        );
        setShowLoginModal(false);
        setIsAuthenticated(true);
      }
    });
  };

  const handleLogout = () => {
    router.push("/");
  };

  // Use mock data from mockData.ts
  const [availableJobs, setAvailableJobs] = useState<Job[]>(mockAvailableJobs);
  const [currentJobs, setCurrentJobs] = useState<Job[]>(mockCurrentJobs);
  const [historyJobs, setHistoryJobs] = useState<Job[]>(mockHistoryJobs);
  const [payslips, setPayslips] = useState(mockPayslips);
  const [invoices, setInvoices] = useState(mockInvoices);

  const renderJobActionButton = (job: Job) => {
    switch (job.status) {
      case "available":
        return (
          <TouchableOpacity
            className="bg-blue-500 py-2 px-4 rounded-lg"
            onPress={() => {
              // For prototyping, move job from available to current
              const jobToMove = availableJobs.find((j) => j.id === job.id);
              if (jobToMove) {
                const updatedJob = { ...jobToMove, status: "in_progress" };
                setAvailableJobs((prev) => prev.filter((j) => j.id !== job.id));
                setCurrentJobs((prev) => [...prev, updatedJob]);
              }
            }}
          >
            <Text className="text-white font-bold text-center">Accept Job</Text>
          </TouchableOpacity>
        );
      case "assigned":
        return (
          <TouchableOpacity
            className="bg-green-500 py-2 px-4 rounded-lg flex-row items-center justify-center space-x-2"
            onPress={() => {
              // Update job status for prototyping
              setCurrentJobs((prev) =>
                prev.map((j) =>
                  j.id === job.id ? { ...j, status: "in_progress" } : j,
                ),
              );
            }}
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
              onPress={() => {
                // Update job status for prototyping
                setCurrentJobs((prev) =>
                  prev.map((j) =>
                    j.id === job.id ? { ...j, status: "paused" } : j,
                  ),
                );
              }}
            >
              <Pause size={16} color="white" />
              <Text className="text-white font-bold ml-1">Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-green-600 py-2 px-4 rounded-lg flex-row items-center justify-center flex-1"
              onPress={() => {
                // Move job from current to history for prototyping
                const jobToMove = currentJobs.find((j) => j.id === job.id);
                if (jobToMove) {
                  const updatedJob = { ...jobToMove, status: "completed" };
                  setCurrentJobs((prev) => prev.filter((j) => j.id !== job.id));
                  setHistoryJobs((prev) => [updatedJob, ...prev]);
                }
              }}
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
            onPress={() => {
              // Update job status for prototyping
              setCurrentJobs((prev) =>
                prev.map((j) =>
                  j.id === job.id ? { ...j, status: "in_progress" } : j,
                ),
              );
            }}
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

  const handleOpenNoteModal = (job: Job) => {
    setSelectedJob(job);
    setShowNoteModal(true);
  };

  const handleSaveNote = (note: string) => {
    if (!selectedJob) return;

    mockSaveNote(selectedJob.id, note, (success) => {
      if (success) {
        // Update the job in the appropriate list
        if (selectedJob.status === "completed") {
          setHistoryJobs(
            historyJobs.map((job) =>
              job.id === selectedJob.id ? { ...job, note } : job,
            ),
          );
        } else if (selectedJob.status === "available") {
          setAvailableJobs(
            availableJobs.map((job) =>
              job.id === selectedJob.id ? { ...job, note } : job,
            ),
          );
        } else {
          setCurrentJobs(
            currentJobs.map((job) =>
              job.id === selectedJob.id ? { ...job, note } : job,
            ),
          );
        }
      }
    });
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
            <MapPin size={16} color="#6b7280" />
            <Text className="text-gray-700 ml-2">Pickup: {job.pickup}</Text>
          </View>
          <View className="flex-row items-center">
            <MapPin size={16} color="#6b7280" />
            <Text className="text-gray-700 ml-2">Dropoff: {job.dropoff}</Text>
          </View>
          <View className="flex-row items-center">
            <Clock size={16} color="#6b7280" />
            <Text className="text-gray-700 ml-2">
              Est. Time: {job.estimatedTime}
            </Text>
          </View>
          <View className="flex-row items-center">
            <DollarSign size={16} color="#6b7280" />
            <Text className="text-gray-700 ml-2">Payment: £{job.payment}</Text>
          </View>
        </View>

        <View className="mb-4">
          <Text className="font-medium mb-1">Items:</Text>
          <Text className="text-gray-700">{job.items.join(", ")}</Text>
        </View>

        {/* Notes section */}
        <View className="mb-4 border-t border-gray-100 pt-3">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="font-medium">Notes:</Text>
            <TouchableOpacity
              className="bg-gray-100 p-1.5 rounded-full"
              onPress={() => handleOpenNoteModal(job)}
            >
              <Edit size={14} color="#4b5563" />
            </TouchableOpacity>
          </View>
          {job.note ? (
            <Text className="text-gray-700">{job.note}</Text>
          ) : (
            <Text className="text-gray-400 italic">No notes added</Text>
          )}
        </View>

        {renderJobActionButton(job)}
      </View>
    );
  };

  const renderPayslipCard = (payslip: {
    id: string;
    period: string;
    amount: number;
    date: string;
    status: string;
  }) => {
    return (
      <View key={payslip.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <View className="flex-row justify-between items-start mb-3">
          <View>
            <Text className="text-lg font-bold">Payslip #{payslip.id}</Text>
            <Text className="text-gray-500">{payslip.period}</Text>
          </View>
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-800 font-medium">{payslip.status}</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-700">Payment Date: {payslip.date}</Text>
          <Text className="font-bold text-lg">£{payslip.amount}</Text>
        </View>

        <TouchableOpacity
          className="bg-blue-500 py-2 px-4 rounded-lg flex-row items-center justify-center"
          onPress={() => console.log(`Download payslip ${payslip.id}`)}
        >
          <Download size={16} color="white" />
          <Text className="text-white font-bold ml-2">Download PDF</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderInvoiceCard = (invoice: {
    id: string;
    description: string;
    amount: number;
    date: string;
    status: string;
  }) => {
    return (
      <View key={invoice.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <View className="flex-row justify-between items-start mb-3">
          <View>
            <Text className="text-lg font-bold">Invoice #{invoice.id}</Text>
            <Text className="text-gray-500">{invoice.description}</Text>
          </View>
          <View
            className={`px-3 py-1 rounded-full ${invoice.status === "Approved" ? "bg-green-100" : "bg-yellow-100"}`}
          >
            <Text
              className={`font-medium ${invoice.status === "Approved" ? "text-green-800" : "text-yellow-800"}`}
            >
              {invoice.status}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-700">Submitted: {invoice.date}</Text>
          <Text className="font-bold text-lg">£{invoice.amount}</Text>
        </View>

        <View className="flex-row space-x-2">
          <TouchableOpacity
            className="flex-1 bg-gray-200 py-2 px-4 rounded-lg flex-row items-center justify-center"
            onPress={() => console.log(`View invoice ${invoice.id}`)}
          >
            <FileText size={16} color="#333" />
            <Text className="font-bold ml-2">View</Text>
          </TouchableOpacity>

          {invoice.status === "Pending" && (
            <TouchableOpacity
              className="flex-1 bg-red-500 py-2 px-4 rounded-lg flex-row items-center justify-center"
              onPress={() => console.log(`Delete invoice ${invoice.id}`)}
            >
              <X size={16} color="white" />
              <Text className="text-white font-bold ml-2">Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderUploadInvoiceSection = () => {
    return (
      <TouchableOpacity
        className="bg-white rounded-xl p-4 mb-4 border-2 border-dashed border-blue-300 items-center justify-center py-8"
        onPress={() => console.log("Upload invoice")}
      >
        <Upload size={32} color="#3b82f6" />
        <Text className="text-blue-600 font-medium mt-2">
          Upload New Invoice
        </Text>
        <Text className="text-gray-500 text-center mt-1 text-sm">
          Tap to upload receipts for expenses
        </Text>
      </TouchableOpacity>
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
      case "payslips":
        return payslips.length > 0 ? (
          payslips.map(renderPayslipCard)
        ) : (
          <View className="bg-white rounded-xl p-8 items-center justify-center">
            <Text className="text-gray-500 text-center">
              No payslips available.
            </Text>
          </View>
        );
      case "invoices":
        return (
          <>
            {renderUploadInvoiceSection()}
            {invoices.length > 0 ? (
              invoices.map(renderInvoiceCard)
            ) : (
              <View className="bg-white rounded-xl p-8 items-center justify-center">
                <Text className="text-gray-500 text-center">
                  No invoices submitted yet.
                </Text>
              </View>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="dark" />

      {/* Login Modal */}
      <Modal visible={showLoginModal} animationType="slide" transparent={false}>
        <SafeAreaView className="flex-1 bg-gray-100">
          <View className="flex-1 justify-center items-center p-6">
            <View className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
              <Text className="text-2xl font-bold text-center mb-6">
                Driver Login
              </Text>

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
                className="bg-blue-500 py-3 rounded-lg mb-4"
                onPress={handleLogin}
                disabled={isLoggingIn}
              >
                <Text className="text-white font-bold text-center">
                  {isLoggingIn ? "Logging in..." : "Login"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/")}>
                <Text className="text-blue-500 text-center">Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {isAuthenticated && (
        <>
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
              <TouchableOpacity onPress={handleLogout}>
                <LogOut size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Map Preview */}
          {(activeTab === "current" || activeTab === "available") && (
            <View className="h-40 bg-gray-200 relative">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=800&q=80",
                }}
                className="w-full h-full"
                contentFit="cover"
              />
              <TouchableOpacity className="absolute bottom-3 right-3 bg-white p-2 rounded-lg shadow-md">
                <Text className="font-medium">Open Map</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Tab Navigation */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="bg-white mb-4"
          >
            <TouchableOpacity
              className={`py-3 px-4 ${activeTab === "current" ? "border-b-2 border-blue-500" : ""}`}
              onPress={() => setActiveTab("current")}
            >
              <Text
                className={`text-center font-medium ${activeTab === "current" ? "text-blue-500" : "text-gray-500"}`}
              >
                Current
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`py-3 px-4 ${activeTab === "available" ? "border-b-2 border-blue-500" : ""}`}
              onPress={() => setActiveTab("available")}
            >
              <Text
                className={`text-center font-medium ${activeTab === "available" ? "text-blue-500" : "text-gray-500"}`}
              >
                Available
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`py-3 px-4 ${activeTab === "history" ? "border-b-2 border-blue-500" : ""}`}
              onPress={() => setActiveTab("history")}
            >
              <Text
                className={`text-center font-medium ${activeTab === "history" ? "text-blue-500" : "text-gray-500"}`}
              >
                History
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`py-3 px-4 ${activeTab === "payslips" ? "border-b-2 border-blue-500" : ""}`}
              onPress={() => setActiveTab("payslips")}
            >
              <Text
                className={`text-center font-medium ${activeTab === "payslips" ? "text-blue-500" : "text-gray-500"}`}
              >
                Payslips
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`py-3 px-4 ${activeTab === "invoices" ? "border-b-2 border-blue-500" : ""}`}
              onPress={() => setActiveTab("invoices")}
            >
              <Text
                className={`text-center font-medium ${activeTab === "invoices" ? "text-blue-500" : "text-gray-500"}`}
              >
                Invoices
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Content */}
          <ScrollView className="flex-1 px-4 pb-4">
            {renderJobList()}
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
        </>
      )}
    </SafeAreaView>
  );
}

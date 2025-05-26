// Mock data for the app

export const mockDetectedItems = [
  {
    id: 1,
    name: "Sofa",
    dimensions: "200x90x85cm",
    volume: "1.53m³",
  },
  {
    id: 2,
    name: "Dining Table",
    dimensions: "180x90x75cm",
    volume: "1.22m³",
  },
  {
    id: 3,
    name: "Wardrobe",
    dimensions: "120x60x200cm",
    volume: "1.44m³",
  },
];

export const mockQuote = {
  totalVolume: "4.19m³",
  estimatedHours: 5,
  hourlyRate: 65,
  totalPrice: 325,
  insurance: "Includes basic insurance coverage",
};

export const mockRouteDetails = {
  distance: "8.3 miles",
  duration: "32 minutes",
  trafficCondition: "Moderate",
};

// Customer Jobs with notes
export const mockActiveJobs = [
  {
    id: "TRZ-123456",
    status: "en-route",
    address: "123 Main Street, London, UK",
    date: "2023-06-15",
    time: "14:00-16:00",
    items: 12,
    estimatedHours: 2,
    driverName: "John Smith",
    driverImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    driverEta: "15 mins",
    note: "Fragile items in the living room need special care.",
  },
  {
    id: "TRZ-789012",
    status: "scheduled",
    address: "456 Park Avenue, Manchester, UK",
    date: "2023-06-20",
    time: "10:00-13:00",
    items: 8,
    estimatedHours: 3,
    note: "",
  },
];

export const mockPastJobs = [
  {
    id: "TRZ-987654",
    status: "complete",
    address: "789 Oak Road, Birmingham, UK",
    date: "2023-06-01",
    time: "09:00-11:00",
    items: 5,
    estimatedHours: 2,
    driverName: "Sarah Johnson",
    driverImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    note: "Everything went smoothly. Great service!",
  },
];

// Driver Jobs with notes
export const mockAvailableJobs = [
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
    note: "",
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
    note: "",
  },
];

export const mockCurrentJobs = [
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
    note: "Customer mentioned the refrigerator needs to be handled with care.",
  },
];

export const mockHistoryJobs = [
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
    note: "Delivery completed on time. Customer was satisfied.",
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
    note: "Had to use the service elevator for the king bed.",
  },
];

export const mockAuthentication = (email, password, callback) => {
  // Simulate API call
  setTimeout(() => {
    callback(true);
  }, 1500);
};

export const mockCreateJob = (jobDetails, callback) => {
  // Simulate API call
  setTimeout(() => {
    const jobId = "JOB" + Math.floor(100000 + Math.random() * 900000);
    callback(jobId);
  }, 2000);
};

export const mockMediaUpload = (type) => {
  // Simulate media upload
  const id = Date.now();
  return {
    id,
    type,
    uri:
      type === "video"
        ? "https://images.unsplash.com/photo-1558997519-83c9716b1b07?w=400&q=80"
        : "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=400&q=80",
  };
};

// Mock save note function
export const mockSaveNote = (jobId, note, callback) => {
  // Simulate API call
  setTimeout(() => {
    callback(true);
  }, 1000);
};

// Default export wrapper for mockData to fix the warning
const mockData = {
  mockDetectedItems,
  mockQuote,
  mockRouteDetails,
  mockActiveJobs,
  mockPastJobs,
  mockAvailableJobs,
  mockCurrentJobs,
  mockHistoryJobs,
  mockAuthentication,
  mockCreateJob,
  mockMediaUpload,
  mockSaveNote,
};

export default mockData;

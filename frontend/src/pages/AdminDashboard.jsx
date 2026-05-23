import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {

  const navigate = useNavigate();

  // PROTECT ADMIN PAGE
  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      navigate("/login");
    }

  }, []);

  // STATES
  const [complaints, setComplaints] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("");

  // ANALYTICS
  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const progressComplaints = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const chartData = [
  {
    name: "Pending",
    value: pendingComplaints,
  },
  {
    name: "In Progress",
    value: progressComplaints,
  },
  {
    name: "Resolved",
    value: resolvedComplaints,
  },
];

const COLORS = [
  "#EAB308",
  "#3B82F6",
  "#22C55E",
];

  // FILTER LOGIC
  const filteredComplaints = complaints.filter(
    (complaint) => {

      const matchesSearch =
        complaint.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "" ||
        complaint.status === statusFilter;

      const matchesCategory =
        categoryFilter === "" ||
        complaint.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    }
  );

  // FETCH COMPLAINTS
  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "https://ai-complaint-backend-78ty.onrender.com/api/complaints/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(
        response.data.complaints
      );

      console.log(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        `https://ai-complaint-backend-78ty.onrender.com/api/complaints/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComplaints();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-blue-600 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">
            Total Complaints
          </h2>

          <p className="text-4xl font-bold mt-4">
            {totalComplaints}
          </p>
        </div>

        <div className="bg-yellow-500 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">
            Pending
          </h2>

          <p className="text-4xl font-bold mt-4">
            {pendingComplaints}
          </p>
        </div>

        <div className="bg-blue-500 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">
            In Progress
          </h2>

          <p className="text-4xl font-bold mt-4">
            {progressComplaints}
          </p>
        </div>

        <div className="bg-green-600 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">
            Resolved
          </h2>

          <p className="text-4xl font-bold mt-4">
            {resolvedComplaints}
          </p>
        </div>

      </div>

      {/* CHARTS */}
<div className="bg-gray-900 p-8 rounded-2xl mb-10">

  <h2 className="text-3xl font-bold mb-8">
    Complaint Analytics
  </h2>

  <div style={{ width: "100%", height: 400 }}>

    <ResponsiveContainer>

      <PieChart>

        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={140}
          dataKey="value"
          label
        >

          {chartData.map((entry, index) => (

            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />

          ))}

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>
      {/* SEARCH + FILTER */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search complaints..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-gray-900 text-white px-4 py-3 rounded-xl outline-none"
        />

        {/* STATUS FILTER */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="bg-gray-900 text-white px-4 py-3 rounded-xl outline-none"
        >
          <option value="">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Resolved">
            Resolved
          </option>
        </select>

        {/* CATEGORY FILTER */}
        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
          className="bg-gray-900 text-white px-4 py-3 rounded-xl outline-none"
        >
          <option value="">
            All Categories
          </option>

          <option value="Hostel">
            Hostel
          </option>

          <option value="Network">
            Network
          </option>

          <option value="Transport">
            Transport
          </option>
        </select>

      </div>

      {/* COMPLAINTS */}
      <div className="grid gap-6">

        {filteredComplaints.map(
          (complaint) => (

            <div
              key={complaint._id}
              className="bg-gray-900 p-6 rounded-2xl"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">

                <h2 className="text-2xl font-bold">
                  {complaint.title}
                </h2>

                <span className="bg-blue-500 px-4 py-2 rounded-lg">
                  {complaint.status}
                </span>

              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-300 mb-4">
                {complaint.description}
              </p>

              {/* TAGS */}
              <div className="flex gap-4 mb-4">

                <span className="bg-gray-800 px-3 py-1 rounded-lg">
                  {complaint.category}
                </span>

                <span className="bg-red-500 px-3 py-1 rounded-lg">
                  {complaint.priority}
                </span>

              </div>

              {/* USER INFO */}
              <div className="mb-4 text-sm text-gray-400">

                <p>
                  User:
                  {" "}
                  {complaint.user?.name}
                </p>

                <p>
                  Email:
                  {" "}
                  {complaint.user?.email}
                </p>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-4">

                <button
                  onClick={() =>
                    updateStatus(
                      complaint._id,
                      "Pending"
                    )
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
                >
                  Pending
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      complaint._id,
                      "In Progress"
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                >
                  In Progress
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      complaint._id,
                      "Resolved"
                    )
                  }
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
                >
                  Resolved
                </button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default AdminDashboard;
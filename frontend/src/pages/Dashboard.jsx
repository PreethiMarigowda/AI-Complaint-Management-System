import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  });

  const [message, setMessage] = useState("");

  const [complaints, setComplaints] = useState([]);

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(null);

  // PROTECT ROUTE
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    fetchComplaints();

  }, [navigate]);

  // FETCH COMPLAINTS
  const fetchComplaints = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/complaints/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(response.data.complaints);

    } catch (error) {

      console.log(error);
    }
  };

  // USER DATA
  const user = JSON.parse(localStorage.getItem("user"));

  // IMAGE HANDLER
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  // AI CATEGORY DETECTION
  const detectCategory = (text) => {

    const message = text.toLowerCase();

    // NETWORK
    if (
      message.includes("wifi") ||
      message.includes("internet") ||
      message.includes("network")
    ) {
      return "Network";
    }

    // HOSTEL
    if (
      message.includes("water") ||
      message.includes("leakage") ||
      message.includes("bathroom") ||
      message.includes("room")
    ) {
      return "Hostel";
    }

    // TRANSPORT
    if (
      message.includes("bus") ||
      message.includes("transport") ||
      message.includes("vehicle")
    ) {
      return "Transport";
    }

    // ELECTRICITY
    if (
      message.includes("light") ||
      message.includes("electricity") ||
      message.includes("power")
    ) {
      return "Electricity";
    }

    return "";
  };

  // HANDLE INPUT
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // AUTO DETECT CATEGORY
    if (name === "description") {

      const detectedCategory = detectCategory(value);

      if (detectedCategory) {

        setFormData((prev) => ({
          ...prev,
          description: value,
          category: detectedCategory,
        }));
      }
    }
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/complaints/create",
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          priority: formData.priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message);

      // REFRESH COMPLAINTS
      fetchComplaints();

      // CLEAR FORM
      setFormData({
        title: "",
        description: "",
        category: "",
        priority: "",
      });

      // CLEAR IMAGE
      setImage(null);
      setPreview(null);

    } catch (error) {

      console.log(error);

      setMessage(
        error.response?.data?.message ||
        "Complaint Submission Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

      </div>

      {/* USER INFO */}
      <div className="bg-gray-900 p-6 rounded-2xl max-w-xl mb-10">

        <h2 className="text-2xl font-semibold mb-4">
          Welcome
        </h2>

        <p className="mb-2">
          <span className="font-bold">Name:</span> {user?.name}
        </p>

        <p>
          <span className="font-bold">Email:</span> {user?.email}
        </p>

      </div>

      {/* MESSAGE */}
      {message && (
        <div className="bg-blue-500 text-white p-3 rounded-lg mb-6 max-w-xl">
          {message}
        </div>
      )}

      {/* COMPLAINT FORM */}
      <div className="bg-gray-900 p-8 rounded-2xl max-w-2xl mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Submit Complaint
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div>
            <label className="block mb-2">
              Complaint Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter complaint title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Describe your issue"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 h-32"
            />
          </div>

          <div>
            <label className="block mb-2">
              Category
            </label>

            <input
              type="text"
              name="category"
              placeholder="Auto Detected Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* IMAGE UPLOAD */}
          <div>

            <label className="block mb-2">
              Upload Complaint Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
            />

          </div>

          {/* IMAGE PREVIEW */}
          {preview && (

            <div>

              <img
                src={preview}
                alt="Preview"
                className="w-60 rounded-2xl border border-blue-500"
              />

            </div>

          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition py-4 rounded-xl text-lg font-semibold"
          >
            Submit Complaint
          </button>

        </form>

      </div>

      {/* COMPLAINT LIST */}
      <div>

        <h2 className="text-3xl font-bold mb-6">
          Your Complaints
        </h2>

        <div className="grid gap-6">

          {complaints.map((complaint) => (

            <div
              key={complaint._id}
              className="bg-gray-900 p-6 rounded-2xl"
            >

              <div className="flex justify-between items-center mb-4">

                <h3 className="text-2xl font-semibold">
                  {complaint.title}
                </h3>

                <span className="bg-blue-500 px-4 py-2 rounded-lg text-sm">
                  {complaint.status}
                </span>

              </div>

              <p className="text-gray-300 mb-4">
                {complaint.description}
              </p>

              <div className="flex gap-4 text-sm mb-4">

                <span className="bg-gray-800 px-3 py-1 rounded-lg">
                  {complaint.category}
                </span>

                <span className="bg-red-500 px-3 py-1 rounded-lg">
                  {complaint.priority}
                </span>

              </div>

              {/* COMPLAINT IMAGE */}
              {complaint.image && (

                <img
                  src={`http://localhost:5000/${complaint.image}`}
                  alt="Complaint"
                  className="w-64 rounded-2xl border border-blue-500"
                />

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
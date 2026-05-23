import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [message, setMessage] = useState("");

  useEffect(() => {

    const fetchBackendMessage = async () => {

      try {

        const response = await axios.get("http://localhost:5000/");

        setMessage(response.data.message);

      } catch (error) {
        console.log(error);
      }
    };

    fetchBackendMessage();

  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-6xl font-extrabold leading-tight max-w-5xl">
          AI-Powered Smart Complaint Management System
        </h1>

        <p className="text-gray-400 text-xl mt-6 max-w-3xl">
          A modern platform for managing complaints intelligently using
          AI-based classification, sentiment analysis, and priority prediction.
        </p>

        {/* BACKEND RESPONSE */}
        <div className="mt-8 bg-gray-900 px-6 py-4 rounded-xl border border-blue-500">
          
          <p className="text-blue-400 font-semibold">
            Backend Response:
          </p>

          <p className="mt-2 text-gray-300">
            {message}
          </p>

        </div>

        <div className="flex gap-6 mt-10">

          <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl text-lg font-semibold transition">
            Raise Complaint
          </button>

          <button className="border border-gray-600 hover:border-blue-400 px-8 py-3 rounded-xl text-lg font-semibold transition">
            Learn More
          </button>

        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="px-10 py-16">

        <h2 className="text-4xl font-bold text-center mb-14">
          Core Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg">

            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              AI Classification
            </h3>

            <p className="text-gray-400">
              Automatically categorize complaints using Natural Language
              Processing and Machine Learning.
            </p>

          </div>

          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg">

            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              Smart Priority Detection
            </h3>

            <p className="text-gray-400">
              Detect urgency and assign priorities using AI-powered analysis.
            </p>

          </div>

          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg">

            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              Analytics Dashboard
            </h3>

            <p className="text-gray-400">
              Visualize complaint trends, resolutions, and system performance
              using interactive dashboards.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;
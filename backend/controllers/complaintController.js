import Complaint from "../models/Complaint.js";
import sendEmail from "../utils/sendEmail.js";

// CREATE COMPLAINT
export const createComplaint = async (req, res) => {

  try {

    console.log(req.body);

    const title = req.body.title;
    const description = req.body.description;
    const category = req.body.category;
    const priority = req.body.priority;

    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority,
      user: req.user._id,
    });

    console.log("Complaint saved");

    // SEND EMAIL AFTER COMPLAINT SUBMIT
    const userEmail = req.user.email;

    console.log("USER EMAIL:", userEmail);

    console.log("Sending email now...");

    await sendEmail(
      userEmail,
      "Complaint Submitted Successfully",
      `Your complaint "${title}" has been submitted successfully.\n\nStatus: Pending`
    );

    console.log("EMAIL FUNCTION FINISHED");

    res.status(201).json({
      message: "Complaint Created Successfully",
      complaint,
    });

  } catch (error) {

    console.log("CREATE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER COMPLAINTS
export const getUserComplaints = async (req, res) => {

  try {

    const complaints = await Complaint.find({
      user: req.user._id,
    }).populate("user", "name email");

    res.status(200).json({
      complaints,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL COMPLAINTS
export const getAllComplaints = async (req, res) => {

  try {

    const complaints = await Complaint.find()
      .populate("user", "name email");

    res.status(200).json({
      complaints,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE STATUS
export const updateComplaintStatus = async (req, res) => {

  try {

    const complaint = await Complaint.findById(
      req.params.id
    ).populate("user", "email");

    if (!complaint) {

      return res.status(404).json({
        message: "Complaint Not Found",
      });
    }

    complaint.status = req.body.status;

    await complaint.save();

    // SEND STATUS UPDATE EMAIL
    const updateEmail = complaint.user.email;

    await sendEmail(
      updateEmail,
      "Complaint Status Updated",
      `Your complaint "${complaint.title}" status has been updated to "${complaint.status}".`
    );

    console.log("Status email sent");

    res.status(200).json({
      message: "Complaint Status Updated",
      complaint,
    });

  } catch (error) {

    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
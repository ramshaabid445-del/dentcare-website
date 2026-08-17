import HomeContent from "../models/HomeContent.js";

// @desc    Get home page content
// @route   GET /api/home-content
// @access  Public
export const getHomeContent = async (req, res) => {
  try {
    let content = await HomeContent.findOne();
    if (!content) {
      // A brand-new document picks up all schema defaults (incl. location & appointmentDate)
      content = await HomeContent.create({});
    } else {
      // Backfill defaults for documents created before these fields were added
      let needsSave = false;
      if (content.location == null) {
        content.location = "Yogyakarta, Indonesia";
        needsSave = true;
      }
      if (content.appointmentDate == null) {
        content.appointmentDate = "04 August 2022";
        needsSave = true;
      }
      if (needsSave) await content.save();
    }
    res.json({ content });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error fetching home content" });
  }
};

// @desc    Update home page content
// @route   PUT /api/admin/home-content
// @access  Private/Admin
export const updateHomeContent = async (req, res) => {
  try {
    let content = await HomeContent.findOne();
    if (!content) {
      content = new HomeContent();
    }

    const { hero, aboutDoctorImage, whyChooseUs, faqImage, location, appointmentDate } = req.body;

    if (hero) {
      content.hero = { ...content.hero.toObject(), ...hero };
    }
    if (aboutDoctorImage !== undefined) content.aboutDoctorImage = aboutDoctorImage;
    if (whyChooseUs) {
      content.whyChooseUs = { ...content.whyChooseUs.toObject(), ...whyChooseUs };
    }
    if (faqImage !== undefined) content.faqImage = faqImage;
    if (location !== undefined) content.location = location;
    if (appointmentDate !== undefined) content.appointmentDate = appointmentDate;

    await content.save();
    res.json({ message: "Home content updated successfully", content });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error updating home content" });
  }
};

// @desc    Upload a home image
// @route   POST /api/admin/home-content/upload
// @access  Private/Admin
export const uploadHomeImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const url = `/uploads/home/${req.file.filename}`;
  res.status(201).json({ message: "Image uploaded successfully", url });
};

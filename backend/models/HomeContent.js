import mongoose from "mongoose";

const homeContentSchema = new mongoose.Schema(
  {
    hero: {
      heading: { type: String, default: "We Care About Your Dental Health" },
      description: {
        type: String,
        default:
          "We have implemented a number of Safety protocols and measures To ensure the safety of bath our patients and our team doctor Of dentist also very good doctor for dental problems",
      },
      image: { type: String, default: "/images/home1.jpeg" },
      ctaText: { type: String, default: "Get Started" },
      ctaLink: { type: String, default: "/contact" },
    },
    aboutDoctorImage: { type: String, default: "/images/home2.jpeg" },
    whyChooseUs: {
      heading: { type: String, default: "A Warm Welcome and a beautiful Smile" },
      description: {
        type: String,
        default:
          "Our facily is equppwd with stare of the art techonolahy to measures To ensure the safety of bath our patients and our team doctor Of dentist.",
      },
      image: { type: String, default: "/images/home3.jpeg" },
    },
    faqImage: { type: String, default: "/images/home4.jpeg" },
    subscribeImage: { type: String, default: "/images/subscribe.jpeg" },
    // Search-bar location + appointment date shown on the home page hero
    location: { type: String, default: "Yogyakarta, Indonesia" },
    appointmentDate: { type: String, default: "04 August 2022" },
  },
  {
    timestamps: true,
  }
);

const HomeContent = mongoose.model("HomeContent", homeContentSchema);

export default HomeContent;

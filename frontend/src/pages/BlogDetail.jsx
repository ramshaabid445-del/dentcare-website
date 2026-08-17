import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../api";
import EmergencyMedicineBlog from "./blog/EmergencyMedicineBlog";
import CarePlanningBlog from "./blog/CarePlanningBlog";
import ConnectDoctorBlog from "./blog/ConnectDoctorBlog";
import DigitalDentistryBlog from "./blog/DigitalDentistryBlog";
import NutritionDentalBlog from "./blog/NutritionDentalBlog";

const detailedBlogs = {
  "emergency-medicine-research-course": EmergencyMedicineBlog,
  "advance-care-planning-information-session": CarePlanningBlog,
  "connect-with-doctor-for-treatment": ConnectDoctorBlog,
  "future-of-digital-dentistry": DigitalDentistryBlog,
  "nutrition-and-dental-health": NutritionDentalBlog,
};

function DynamicBlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.cmsPublic("blogs").getBySlug(slug);
        setBlog(data.item);
      } catch (err) {
        setError(err.message || "Blog not found");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  return (
    <div className="blog-detail-page w-full overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&family=DM+Serif+Display&display=swap');
        .blog-detail-page h1, .blog-detail-page h2, .blog-detail-page h3 {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
        }
        .blog-detail-page .eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }`}</style>
      <Navbar />

      <section className="pt-32 pb-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark">
            ← Back to blogs
          </Link>

          {loading ? (
            <p className="mt-8 text-brand-gray">Loading article...</p>
          ) : error || !blog ? (
            <p className="mt-8 text-brand-gray">{error || "Article not found"}</p>
          ) : (
            <article className="mt-8">
              <p className="eyebrow text-brand-green text-sm mb-3">| {blog.category || "Blog"}</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-navy leading-tight">
                {blog.title}
              </h1>
              <div className="mt-4 flex items-center gap-4 text-sm text-brand-gray">
                <span className="font-semibold text-brand-navy">{blog.author || "MedCare"}</span>
                <span>•</span>
                <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}</span>
              </div>

              <img
                src={blog.image || "https://plus.unsplash.com/premium_photo-1667520569693-c61155e16869?w=900&h=500&fit=crop&auto=format&q=85"}
                alt={blog.title}
                className="mt-8 w-full h-72 sm:h-96 object-cover rounded-2xl shadow-md"
              />

              <div className="mt-8 prose prose-lg max-w-none text-brand-gray leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </article>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  const DetailedBlog = detailedBlogs[slug];

  // The original five articles keep their full, image-rich editorial layouts.
  // All blogs added by an admin continue to use the dynamic CMS detail page.
  return DetailedBlog ? <DetailedBlog /> : <DynamicBlogDetail />;
}

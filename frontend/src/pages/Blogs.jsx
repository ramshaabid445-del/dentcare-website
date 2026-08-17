import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../api";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.cmsPublic("blogs").getAll(category ? `category=${encodeURIComponent(category)}` : "");
        setBlogs(data.items);
      } catch (error) {
        console.warn("Failed to load blogs", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  return (
    <div className="blogs-page w-full overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&family=DM+Serif+Display&display=swap');
        .blogs-page h1, .blogs-page h2, .blogs-page h3 {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
        }
        .blogs-page .eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }`}</style>
      <Navbar />

      <section className="pt-32 pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow text-brand-green text-sm mb-3">| Our Blog</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-navy leading-tight">
            {category ? `${category} Articles` : "Latest News & Articles"}
          </h1>
          <p className="mt-4 text-brand-gray max-w-xl mx-auto leading-relaxed">
            Insights, updates, and expert advice from our healthcare team.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-brand-gray text-center">Loading articles...</p>
          ) : blogs.length === 0 ? (
            <p className="text-brand-gray text-center">No published articles found in this category.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {blogs.map((post) => (
                <div key={post._id} className="rounded-2xl bg-white shadow-md overflow-hidden">
                  <div className="relative">
                    <img src={post.image || "https://plus.unsplash.com/premium_photo-1667520569693-c61155e16869?w=500&h=320&fit=crop&auto=format&q=80"} alt={post.title} className="w-full h-48 object-cover" />
                    {post.category && (
                      <div className="absolute top-4 left-4 rounded-lg px-3 py-1.5 text-center shadow-md" style={{ backgroundColor: "#A6CE39" }}>
                        <p className="text-xs text-white/90 leading-none">{post.category}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-brand-gray mb-3">
                      <span>{post.author || "MedCare"}</span>
                      <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}</span>
                    </div>
                    <h3 className="text-lg font-bold font-heading text-brand-navy leading-snug">{post.title}</h3>
                    <p className="mt-3 text-sm text-brand-gray leading-relaxed">{post.excerpt}</p>
                    <Link
                      to={`/blogs/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green underline underline-offset-2"
                    >
                      Read More
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

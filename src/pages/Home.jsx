import BlogCard from "../components/BlogCard";
import InfoCard from "../components/InfoCard";
import { blogs } from "../utils/blogsData";

export default function Home() {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Home</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <InfoCard
          title="Get started"
          description="Read our getting started guide to get the most out of your Capitalmind subscription."
        />

        <InfoCard
          title="Community"
          description="Join the conversation on our exclusive community on Slack for Capitalmind Premium subscribers."
        />

        <InfoCard
          title="Visit website"
          description="Keep up with our latest content on our website."
        />

      </div>

      <h4 className="text-sm mt-10 font-semibold mb-6">Latest Post</h4>
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
}
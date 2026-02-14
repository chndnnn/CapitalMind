export default function BlogCard({ blog }) {
  return (
    <div className="rounded-xl ">
      <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
      <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
      <p className="text-gray-600 mb-3">{blog.desc}</p>
      <button className="text-green-600 font-medium">
        Read full post →
      </button>
    </div>
  );
}

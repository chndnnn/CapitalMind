import { ExternalLink } from "lucide-react";

export default function InfoCard({ title, description, link }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
      
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-semibold text-gray-800">
          {title}
        </h3>

        <ExternalLink
          size={16}
          className="text-gray-400"
        />
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

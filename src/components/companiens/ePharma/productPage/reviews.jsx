import { ChevronUp, Copy } from "lucide-react";
import { useState } from "react";

export default function ProductHighlights() {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCopy = () => {
    const text = `Product Highlights
        Blouse: Running Blouse
        Color: Yellow
        Net Quantity (N): Single
        Occasion: Party

        Additional Details
        Saree Fabric: Georgette
        Transparency: No
        Type: Bandhani
        Blouse Color: Green
        Blouse Fabric: Bangalori Silk
        Blouse Pattern: Embroidered
        Border: Lace
        Border Width: Small Border
        Generic Name: Sarees
        Loom Type: Powerloom
        Ornamentation: Lace border
        Pallu Details: Same as Saree
        Pattern: Embroidered`;
    
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Product Highlights Header */}
      <div className="flex items-center justify-between !p-4 border-b border-gray-200">
        <h2 className="!text-lg font-semibold text-gray-900">Product Highlights</h2>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium !text-sm uppercase tracking-wide"
        >
          <Copy size={16} />
          COPY
        </button>
      </div>

      {/* Product Highlights Content */}
      <div className="!p-4 !space-y-3">
        <div className="grid grid-cols-2 !gap-4">
          <div>
            <div className="!text-sm text-gray-600 !mb-1">Blouse</div>
            <div className="!text-sm font-medium text-gray-900">Running Blouse</div>
          </div>
          <div>
            <div className="!text-sm text-gray-600 !mb-1">Color</div>
            <div className="!text-sm font-medium text-gray-900">Yellow</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 !gap-4">
          <div>
            <div className="!text-sm text-gray-600 !mb-1">Net Quantity (N)</div>
            <div className="!text-sm font-medium text-gray-900">Single</div>
          </div>
          <div>
            <div className="!text-sm text-gray-600 !mb-1">Occasion</div>
            <div className="!text-sm font-medium text-gray-900">Party</div>
          </div>
        </div>
      </div>

      {/* Additional Details Header */}
      <div className="flex items-center justify-between !p-4 border-t border-gray-200">
        <h3 className="!text-lg font-semibold text-gray-900">Additional Details</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-600 hover:text-gray-800"
        >
          <ChevronUp 
            size={20} 
            className={`transform transition-transform ${isExpanded ? 'rotate-0' : 'rotate-180'}`}
          />
        </button>
      </div>

      {/* Additional Details Content */}
      {isExpanded && (
        <div className="!p-4 !space-y-3">
          <div className="grid grid-cols-2 !gap-4">
            <div>
              <div className="!text-sm text-gray-600 !mb-1">Saree Fabric</div>
              <div className="!text-sm font-medium text-gray-900">Georgette</div>
            </div>
            <div>
              <div className="!text-sm text-gray-600 !mb-1">Transparency</div>
              <div className="!text-sm font-medium text-gray-900">No</div>
            </div>
          </div>

          <div className="grid grid-cols-2 !gap-4">
            <div>
              <div className="!text-sm text-gray-600 !mb-1">Type</div>
              <div className="!text-sm font-medium text-gray-900">Bandhani</div>
            </div>
            <div>
              <div className="!text-sm text-gray-600 !mb-1">Blouse Color</div>
              <div className="!text-sm font-medium text-gray-900">Green</div>
            </div>
          </div>

          <div className="grid grid-cols-2 !gap-4">
            <div>
              <div className="!text-sm text-gray-600 !mb-1">Blouse Fabric</div>
              <div className="!text-sm font-medium text-gray-900">Bangalori Silk</div>
            </div>
            <div>
              <div className="!text-sm text-gray-600 !mb-1">Blouse Pattern</div>
              <div className="!text-sm font-medium text-gray-900">Embroidered</div>
            </div>
          </div>

          <div className="grid grid-cols-2 !gap-4">
            <div>
              <div className="!text-sm text-gray-600 !mb-1">Border</div>
              <div className="!text-sm font-medium text-gray-900">Lace</div>
            </div>
            <div>
              <div className="!text-sm text-gray-600 !mb-1">Border Width</div>
              <div className="!text-sm font-medium text-gray-900">Small Border</div>
            </div>
          </div>

          <div className="grid grid-cols-2 !gap-4">
            <div>
              <div className="!text-sm text-gray-600 !mb-1">Generic Name</div>
              <div className="!text-sm font-medium text-gray-900">Sarees</div>
            </div>
            <div>
              <div className="!text-sm text-gray-600 !mb-1">Loom Type</div>
              <div className="!text-sm font-medium text-gray-900">Powerloom</div>
            </div>
          </div>

          <div className="grid grid-cols-2 !gap-4">
            <div>
              <div className="!text-sm text-gray-600 !mb-1">Ornamentation</div>
              <div className="!text-sm font-medium text-gray-900">Lace border</div>
            </div>
            <div>
              <div className="!text-sm text-gray-600 !mb-1">Pallu Details</div>
              <div className="!text-sm font-medium text-gray-900">Same as Saree</div>
            </div>
          </div>

          <div className="grid grid-cols-2 !gap-4">
            <div>
              <div className="!text-sm text-gray-600 !mb-1">Pattern</div>
              <div className="!text-sm font-medium text-gray-900">Embroidered</div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
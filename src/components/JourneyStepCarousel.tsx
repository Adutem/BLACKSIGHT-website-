import React, { useEffect, useState } from 'react';

// Add your image paths here
const images = [
  "/assets/journey-main.png", 
  "/assets/journey2.png",
  "/assets/journey3.png",
  "/assets/journey4.png",
];

// Initial text content for each image with lists
const initialTexts = [
  { 
    title: "Step 1: Discovery", 
    items: [
      "Understanding your unique business needs",
      "Identifying key opportunities for AI integration",
      "Analyzing current processes and pain points"
    ] 
  },
  { 
    title: "Step 2: Strategy", 
    items: [
      "Creating a tailored AI solution roadmap",
      "Setting clear objectives and success metrics",
      "Aligning AI strategy with business goals"
    ] 
  },
  { 
    title: "Step 3: Implementation", 
    items: [
      "Building and integrating your AI system",
      "Conducting thorough testing and validation",
      "Training your team on the new system"
    ] 
  },
  { 
    title: "Step 4: Optimization", 
    items: [
      "Continuously improving your AI solution",
      "Monitoring performance and gathering feedback",
      "Scaling successful implementations"
    ] 
  }
];

export const JourneyStepCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [texts, setTexts] = useState(initialTexts);
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState({ title: '', items: [''] });
  
  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  
  // Handle text edit
  const handleEdit = () => {
    setEditingText({
      title: texts[activeIndex].title,
      items: [...texts[activeIndex].items]
    });
    setIsEditing(true);
  };
  
  // Save edited text
  const saveText = () => {
    const newTexts = [...texts];
    newTexts[activeIndex] = editingText;
    setTexts(newTexts);
    setIsEditing(false);
  };
  
  // Handle item change
  const handleItemChange = (index: number, value: string) => {
    const newItems = [...editingText.items];
    newItems[index] = value;
    setEditingText({...editingText, items: newItems});
  };
  
  // Add new item
  const addItem = () => {
    setEditingText({...editingText, items: [...editingText.items, '']});
  };
  
  // Remove item
  const removeItem = (index: number) => {
    if (editingText.items.length <= 1) return;
    const newItems = [...editingText.items];
    newItems.splice(index, 1);
    setEditingText({...editingText, items: newItems});
  };

  return (
    <section className="flex flex-col items-center justify-center py-6 sm:py-12 bg-white">
      <div className="w-full max-w-xs sm:max-w-2xl relative">
        {/* Image with text overlay */}
        <div className="relative rounded-lg shadow-lg overflow-hidden">
          <img
            src={images[activeIndex]}
            alt={`journey-step-${activeIndex}`}
            className="w-full h-40 sm:h-64 object-cover transition-all duration-700"
          />
          
          {/* Text overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 sm:p-6">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editingText.title}
                  onChange={(e) => setEditingText({...editingText, title: e.target.value})}
                  className="w-full bg-white/20 text-white font-bold text-xl sm:text-2xl p-2 rounded border border-white/30"
                  placeholder="Title"
                />
                
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {editingText.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-white">•</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleItemChange(idx, e.target.value)}
                        className="flex-1 bg-white/20 text-white p-2 rounded border border-white/30 text-sm"
                        placeholder={`Item ${idx + 1}`}
                      />
                      {editingText.items.length > 1 && (
                        <button 
                          onClick={() => removeItem(idx)}
                          className="text-red-300 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={addItem}
                  className="text-blue-300 hover:text-blue-500 text-sm flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Item
                </button>
                
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={saveText}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">{texts[activeIndex].title}</h3>
                <ul className="space-y-1">
                  {texts[activeIndex].items.map((item, idx) => (
                    <li key={idx} className="text-white/90 text-sm sm:text-base flex items-start">
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Dots Navigation */}
        <div className="flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition ${
                idx === activeIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
        
        {/* Edit button */}
        
      </div>
    </section>
  );
};
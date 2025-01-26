"use client"

import Image from "next/image";
import { useState } from "react";

interface Layer {
  id: number;
  name: string;
  icon: string;
  selected: boolean;
}

const NFTBuilderPage = () => {
  // State to track selected layers
  const [layers, setLayers] = useState<Layer[]>([
    { id: 1, name: "Background", icon: "/puppy/puppy1.png", selected: false },
    { id: 2, name: "Base", icon: "/puppy/cloth/cloth21.png", selected: false },
    { id: 3, name: "Sword", icon: "/puppy/sword/sword31.png", selected: false },
    { id: 4, name: "Helmet", icon: "/puppy/helmet/helmet21.png", selected: false },
    { id: 5, name: "Star", icon: "/puppy/star/star1.png", selected: false }
  ]);

  const handleItemClick = (id: number) => {
    setLayers(prevLayers =>
      prevLayers.map(layer =>
        layer.id === id
          ? { ...layer, selected: !layer.selected }
          : layer
      )
    );
  };

  const handleReset = () => {
    setLayers(prevLayers =>
      prevLayers.map(layer => ({ ...layer, selected: false }))
    );
  };

  const handlePreview = () => {
    console.log('Previewing NFT profile with layers:', 
      layers.filter(layer => layer.selected).map(layer => layer.name)
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">NFT Profile Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left items */}
          <div className="flex flex-col gap-4">
            {layers.slice(0, 3).map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleItemClick(item.id)}
                className={`flex items-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                  item.selected 
                    ? 'bg-blue-100 dark:bg-blue-900' 
                    : 'bg-white dark:bg-gray-800'
                }`}
                aria-label={`Select ${item.name}`}
                role="button"
                tabIndex={0}
              >
                <div className="w-12 h-12 relative">
                  <Image
                    src={item.icon}
                    alt=""
                    fill
                    className="object-contain"
                    aria-hidden="true"
                  />
                </div>
                <span className="ml-4 font-medium">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Center NFT preview */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {layers.some(layer => layer.selected) ? (
                // Stack selected layers
                layers.filter(layer => layer.selected).map((layer) => (
                  <div key={layer.id} className="absolute inset-0">
                    <Image
                      src={layer.icon}
                      alt={layer.name}
                      fill
                      className="object-contain"
                      style={{ zIndex: layer.id }}
                    />
                  </div>
                ))
              ) : (
                // Show placeholder when no layers are selected
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <p className="text-sm">Select items to preview your NFT</p>
                </div>
              )}
            </div>
          </div>

          {/* Right items */}
          <div className="flex flex-col gap-4">
            {layers.slice(3).map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleItemClick(item.id)}
                className={`flex items-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                  item.selected 
                    ? 'bg-blue-100 dark:bg-blue-900' 
                    : 'bg-white dark:bg-gray-800'
                }`}
                aria-label={`Select ${item.name}`}
                role="button"
                tabIndex={0}
              >
                <div className="w-12 h-12 relative">
                  <Image
                    src={item.icon}
                    alt=""
                    fill
                    className="object-contain"
                    aria-hidden="true"
                  />
                </div>
                <span className="ml-4 font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handlePreview}
            onKeyDown={(e) => e.key === 'Enter' && handlePreview()}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Preview NFT profile"
            role="button"
            tabIndex={0}
          >
            Preview
          </button>
          <button
            onClick={handleReset}
            onKeyDown={(e) => e.key === 'Enter' && handleReset()}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Reset NFT profile"
            role="button"
            tabIndex={0}
          >
            Reset
          </button>
        </div>
      </main>
    </div>
  );
};

export default NFTBuilderPage;

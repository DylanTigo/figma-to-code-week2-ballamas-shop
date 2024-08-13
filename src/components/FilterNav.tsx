import { useState } from 'react';

export default function FilterNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  const buttons = [
    { label: 'All', count: 132 },
    { label: 'Accessories', count: 13 },
    { label: 'Featured', count: 67 },
    { label: 'Unisex', count: 52 },
  ];

  return (
    <nav className="flex items-center sm:justify-center flex-wrap gap-3.5">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`text-black bg-none text-xl flex gap-2 items-center outline outline-2 px-3.5 py-2.5 rounded-full outline-black ${
            activeIndex === index ? 'active' : ''
          }`}
        >
          {button.label} <span className="text-base">{button.count}</span>
        </button>
      ))}
    </nav>
  );
}

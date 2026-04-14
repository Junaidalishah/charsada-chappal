import React from "react";

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      icon: "auto_awesome",
      title: "New Arrivals",
    },
    {
      id: 2,
      icon: "checkroom",
      title: "Apparel",
    },
    {
      id: 3,
      icon: "home_iot_device",
      title: "Home",
    },
    {
      id: 4,
      icon: "diamond",
      title: "Jewelry",
    },
    {
      id: 5,
      icon: "history_edu",
      title: "Archive",
    },
  ];

  return (
    <section className="py-24 bg-surface-container-low jali-pattern">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-12 md:gap-24">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 group-hover:bg-secondary-container transition-colors duration-500">
                <span className="material-symbols-outlined text-primary text-3xl">
                  {category.icon}
                </span>
              </div>
              <span className="font-label text-xs uppercase tracking-[0.15em] font-medium">
                {category.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

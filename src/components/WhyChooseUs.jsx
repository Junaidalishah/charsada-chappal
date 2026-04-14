const features = [
  {
    icon: "brush",
    title: "Handpicked Artisanship",
    description:
      "Each piece is meticulously created by master craftsmen who have inherited skills passed down through generations.",
  },
  {
    icon: "eco",
    title: "Sustainable Practices",
    description:
      "We prioritize ethical sourcing and sustainable manufacturing to preserve both heritage and our planet.",
  },
  {
    icon: "auto_stories",
    title: "Authentic Cultural Heritage",
    description:
      "Every creation carries the soul of ancient techniques, bringing timeless stories into modern wardrobes.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-surface-container py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-secondary-container flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-secondary text-3xl">
                  {feature.icon}
                </span>
              </div>
              <h3 className="font-headline text-2xl text-primary mb-4">
                {feature.title}
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

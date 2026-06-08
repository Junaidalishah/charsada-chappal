const features = [
  {
    icon: "local_shipping",
    title: "Express Delivery",
    description:
      "Free and express delivery available across Pakistan with fast and reliable shipping.",
  },

  {
    icon: "verified",
    title: "Guaranteed Quality",
    description:
      "Every Charsadda Chappal is handcrafted with premium materials for long-lasting comfort and durability.",
  },

  {
    icon: "support_agent",
    title: "24/7 Support Service",
    description:
      "Have a question or need help with your order? Our support team is always ready to assist you.",
  },

  {
    icon: "lock",
    title: "Secure Payment",
    description:
      "All transactions are encrypted and protected for a safe and secure shopping experience.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#f8f6f1] py-16 md:py-20 lg:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                group rounded-3xl
                border border-black/5
                bg-white
                p-6 md:p-8 lg:p-10
                text-center
                shadow-sm
                transition duration-300
                hover:-translate-y-2
              "
            >
              {/* ICON */}
              <div
                className="
                  mx-auto mb-7
                  flexh-16 w-16 md:h-20 md:w-20
                  items-center justify-center
                  rounded-full
                  bg-[#f4f1e8]
                "
              >
                <span className="material-symbols-outlined text-3xl md:text-4xl text-[#061b0e]">
                  {feature.icon}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="mb-4 text-xl md:text-2xl font-bold text-[#061b0e]">
                {feature.title}
              </h3>

              {/* DESC */}
              <p className="text-sm md:text-base leading-6 md:leading-7 text-gray-600">
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

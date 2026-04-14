const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuACGYClAgnhLke_l05szDwuejIyK74MzAOGNdMy8BzLUFLl8aBiZlYCGe_1lPoQ9s714_PeQ_aaQtsYiZA7IPzx3ysfbRku4i0x_LH8RnoHmtKMj8TyKH2f5iFpCHlw5ZEGsAQmbrRa5cFQCnG2X5EIgH7ZpoLPmDFzVBVG6XxLmPmM_k9wKyK_rP4cWN5Jt_PC4lDxon-nFlLih6lD0z_VD30FdgSoES4dN32j9-rESFbpeP_Yssx6yoAKX-8EXyolTF1HtT3yxgg",
      badge: "Limited",
      title: "Emerald Pashmina Veil",
      price: "Rs. 42,500",
    },
    {
      id: 2,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPd7DjEpxJz3uO4YCn_jExhAbrlzZ2e4_dAUfXZfipftu7u9djnHf1Dg2MxqLhu0TGFLnyBROuF0yJgkJgn4lhe09NdRf-7NqoMDVGKbtjz7f7u6qDwLI9Lg_Ta8LitcJpdE6hArFoQ05ftIaDeATLJGmtPlTyXDuW60D-Aibyqh3_lYC6LkYl7hQ7e3bBQZk0OL3-4TLb8utEbqptpezSWd6JIHkeKZbc6LMKxhwDeKGMFheTGaN1Abd1vaC6Cu_5ls6aIFQi45Y",
      badge: "",
      title: "The Jali Earring",
      price: "Rs. 18,900",
    },
    {
      id: 3,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBCBtzRWaO-jrOZHP9BjsDI6SJENyYkTTIS7AI7gmk7Kx84beANkSAbYkBWd-1FGdTq0tq2iDFgtleqk2JHJT7ObiZZj4VhONAUROFmITF6kWRNjtWONVsD9x291ms5prycO8FVCFmf0VHcS_ykNp-CbSdDSjH1tLvr0C_xAWqBYZF1BhuF2uysJCtu5qa1FGfXGm8PjcGAXiJXzoNVhPwOtFx6XjyR0XwIgDME4VeMqZ5oA7fNpYLgcyWHxSjrhXDSwfzYxJr4Yqg",
      badge: "",
      title: "Multan Indigo Vessel",
      price: "Rs. 12,400",
    },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="font-headline text-4xl md:text-5xl text-primary italic">
            Selected Collection
          </h2>

          <button className="text-sm tracking-wide uppercase text-on-surface-variant hover:text-primary transition">
            View All Masterpieces
          </button>
        </div>

        {/* Description */}
        <p className="font-body text-on-surface-variant max-w-md mb-16">
          Limited edition pieces where every thread tells a century-old story of
          the Indus valley.
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden bg-surface-container-low mb-8 relative">
                <img
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={product.image}
                />
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-tighter font-bold text-secondary">
                    {product.badge}
                  </div>
                )}
              </div>

              <h3 className="font-headline text-xl text-primary mb-2">
                {product.title}
              </h3>

              <p className="font-label text-sm text-on-surface-variant tracking-wider">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

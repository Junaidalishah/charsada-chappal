const testimonials = [
  {
    quote:
      "The quality of the embroidery is unlike anything I've seen in modern luxury. It feels like wearing a piece of history that has been perfectly preserved.",
    author: "Zahra Mansoor",
    title: "Creative Director, London",
  },
  {
    quote:
      "Every piece tells a story. The attention to detail in the hand-weaving is extraordinary - it's not just clothing, it's wearable art.",
    author: "Ayesha Khan",
    title: "Fashion Editor, Dubai",
  },
];

const Testimonials = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-12 block">
          Voices of the Atelier
        </span>
        <div className="mb-12">
          <h5 className="font-headline text-3xl md:text-4xl italic text-primary leading-snug mb-8">
            "{testimonials[0].quote}"
          </h5>
          <div className="w-12 h-[1px] bg-secondary/30 mx-auto mb-6"></div>
          <p className="font-label text-sm uppercase tracking-widest text-primary font-bold">
            {testimonials[0].author}
          </p>
          <p className="font-body text-xs text-on-surface-variant mt-1">
            {testimonials[0].title}
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
          </button>
          <button className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

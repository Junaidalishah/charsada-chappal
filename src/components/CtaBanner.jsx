const CtaBanner = () => {
  return (
    <section className="m-6 md:m-12">
      <div className="relative rounded-3xl overflow-hidden bg-primary py-24 px-8 md:px-24">
        <div className="absolute inset-0 opacity-10 jali-pattern pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="font-headline text-4xl md:text-5xl text-white mb-6">
              The Artisan Digest
            </h2>

            <p className="text-white/80 font-body tracking-wide mb-0">
              Join our inner circle for early access to new collections and
              stories from the craft heartlands.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <input
              className="bg-transparent border-b border-outline-variant/30 text-white font-label py-3 px-2 focus:ring-0 focus:border-secondary transition-colors w-full sm:w-80"
              placeholder="Your email address"
              type="email"
            />

            <button className="bg-secondary text-white px-8 py-3 rounded-full font-label text-xs uppercase tracking-widest hover:bg-secondary-fixed-dim transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;

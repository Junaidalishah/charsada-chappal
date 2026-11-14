import { Link } from "react-router-dom";
import { FAQS, GUIDE } from "../seo/site.js";

// Question headings + concise answers: eligible for featured snippets,
// People Also Ask and AI answer citations (FAQPage JSON-LD is added by the page).
const FaqSection = ({ faqs = FAQS, heading = "Charsadda Chappal FAQs", showGuideLink = true }) => (
  <section id="faq" aria-labelledby="faq-heading" className="bg-white py-16 md:py-20 lg:py-24">
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#5f5a52]">Answers</p>
      <h2 id="faq-heading" className="mb-10 text-2xl font-bold text-[#061b0e] md:text-3xl lg:text-4xl">
        {heading}
      </h2>

      <div className="divide-y divide-black/10 border-y border-black/10">
        {faqs.map((f, i) => (
          <details key={f.q} className="group py-5" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
              <h3 className="text-lg font-semibold text-[#061b0e] md:text-xl">{f.q}</h3>
              <span aria-hidden="true" className="mt-1 text-2xl leading-none text-[#061b0e] transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="faq-answer mt-4 max-w-3xl leading-7 text-[#3f3b35]">{f.a}</p>
          </details>
        ))}
      </div>

      {showGuideLink && (
        <p className="mt-10 text-[#3f3b35]">
          Want the full picture?{" "}
          <Link to={GUIDE.path} className="font-semibold text-[#061b0e] underline underline-offset-4">
            Read our Charsadda chappal buying guide
          </Link>
          .
        </p>
      )}
    </div>
  </section>
);

export default FaqSection;

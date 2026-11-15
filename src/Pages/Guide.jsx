import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqSection";
import Seo from "../seo/Seo";
import { GUIDE, FAQS } from "../seo/site.js";
import {
  graph,
  guideSchema,
  faqSchema,
  breadcrumbSchema,
  organizationSchema,
} from "../seo/schema.js";

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function Guide() {
  return (
    <div className="bg-[#f8f6f1] text-[#061b0e]">
      <Seo
        path={GUIDE.path}
        type="article"
        jsonLd={graph(
          organizationSchema(),
          guideSchema(),
          faqSchema(FAQS),
          breadcrumbSchema([
            ["Home", "/"],
            ["Charsadda Chappal Guide", GUIDE.path],
          ]),
        )}
      />
      <Navbar />

      <main className="pt-28 md:pt-32">
        <article className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#5f5a52]">
            <Link to="/" className="underline underline-offset-4">Home</Link>
            <span aria-hidden="true"> / </span>
            <span>Charsadda Chappal Guide</span>
          </nav>

          <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
            {GUIDE.title}
          </h1>
          <p className="mt-3 text-sm text-[#5f5a52]">
            By the Charsadda Chappal team, Charsadda, Khyber Pakhtunkhwa · Updated
            <time dateTime="2026-11-14"> 14 November 2026</time>
          </p>

          <p id="guide-intro" className="mt-8 text-lg leading-8">
            {GUIDE.intro}
          </p>

          <nav aria-label="Contents" className="mt-10 rounded-2xl border border-black/10 bg-white p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em]">In this guide</h2>
            <ol className="list-decimal space-y-2 pl-5">
              {GUIDE.sections.map((s) => (
                <li key={s.h}>
                  <a href={`#${slug(s.h)}`} className="underline underline-offset-4">{s.h}</a>
                </li>
              ))}
            </ol>
          </nav>

          {GUIDE.sections.map((s) => (
            <section key={s.h} id={slug(s.h)} className="mt-12 scroll-mt-28">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">{s.h}</h2>
              {s.p?.map((p) => (
                <p key={p} className="mb-4 leading-8">{p}</p>
              ))}
              {s.list && (
                <ul className="list-disc space-y-2 pl-6 leading-7">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
              {s.steps && (
                <ol className="list-decimal space-y-2 pl-6 leading-7">
                  {s.steps.map((li) => <li key={li}>{li}</li>)}
                </ol>
              )}
              {s.table && (
                <div className="overflow-x-auto">
                  <table className="mb-4 w-full border-collapse overflow-hidden rounded-xl bg-white text-left">
                    <thead>
                      <tr>
                        {s.table.head.map((h) => (
                          <th key={h} scope="col" className="border-b border-black/10 p-3 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((r) => (
                        <tr key={r[0]}>
                          {r.map((c) => (
                            <td key={c} className="border-b border-black/5 p-3">{c}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          <div className="mt-14 rounded-3xl bg-[#061b0e] p-8 text-white">
            <h2 className="text-2xl font-bold">Ready to choose your pair?</h2>
            <p className="mt-2 text-white/90">
              Every chappal is handmade in Charsadda from genuine leather and delivered free across Pakistan.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block rounded-2xl bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#061b0e]"
            >
              Shop Charsadda Chappals
            </Link>
          </div>
        </article>

        <FaqSection showGuideLink={false} heading="Frequently asked questions" />
      </main>

      <Footer />
    </div>
  );
}

export default Guide;

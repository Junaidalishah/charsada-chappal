import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ReturnsRefunds = () => {
  return (
    <>
      <Navbar />

      <main className="pt-36 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
        {/* TITLE */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
            Important Policy
          </p>

          <h1 className="font-serif text-5xl text-[#061b0e]">
            Refund & Returns Policy
          </h1>
        </div>

        {/* CONTENT */}
        <div className="space-y-10 text-[#061b0e]/80 leading-8 text-[15px]">
          <div>
            <p>
              Our refund and returns policy lasts 30 days. If 30 days have
              passed since your purchase, we can’t offer you a full refund or
              exchange.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Eligibility for Return
            </h2>

            <p>
              To be eligible for a return, your item must be unused and in the
              same condition that you received it. It must also be in the
              original packaging.
            </p>

            <p className="mt-4">
              To complete your return, we require a receipt or proof of
              purchase.
            </p>

            <p className="mt-4">
              Please do not send your purchase back to the manufacturer.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Partial Refunds
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li>
                Any item not in its original condition, damaged or missing parts
                for reasons not due to our error.
              </li>

              <li>Any item returned more than 30 days after delivery.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Refunds
            </h2>

            <p>
              Once your return is received and inspected, we will send you an
              email to notify you that we have received your returned item.
            </p>

            <p className="mt-4">
              We will also notify you of the approval or rejection of your
              refund.
            </p>

            <p className="mt-4">
              If approved, your refund will be processed, and a credit will
              automatically be applied to your original method of payment within
              a certain amount of days.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Late or Missing Refunds
            </h2>

            <p>
              If you haven’t received a refund yet, first check your bank
              account again.
            </p>

            <p className="mt-4">
              Then contact your credit card company — it may take some time
              before your refund is officially posted.
            </p>

            <p className="mt-4">
              Next contact your bank. There is often some processing time before
              a refund is posted.
            </p>

            <p className="mt-4">
              If you’ve done all of this and still have not received your
              refund, please contact us.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Exchanges
            </h2>

            <p>
              We replace items if they are defective, damaged, or if you have a
              size issue.
            </p>

            <p className="mt-4">
              To exchange an item, send us a WhatsApp message at:
            </p>

            <p className="mt-4 font-semibold text-[#061b0e]">0333 5742086</p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Shipping Returns
            </h2>

            <p>
              To return your product, you should mail your product to our Head
              Quarters.
            </p>

            <p className="mt-4">
              You will be responsible for paying your own shipping costs for
              returning your item. Shipping costs are non-refundable.
            </p>

            <p className="mt-4">
              Depending on where you live, the time it may take for your
              exchanged product to reach you may vary.
            </p>

            <p className="mt-4">
              For expensive items, we recommend using a trackable shipping
              service or purchasing shipping insurance.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Need Help?
            </h2>

            <p>
              Contact us on WhatsApp for questions related to refunds and
              returns:
            </p>

            <p className="mt-4 font-semibold text-[#061b0e]">
              +92 333 574 2086
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ReturnsRefunds;

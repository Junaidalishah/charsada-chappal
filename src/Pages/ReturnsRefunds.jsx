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
              Once your returned item is received and inspected, we will notify
              you through WhatsApp regarding the status of your return request.
            </p>

            <p className="mt-4">
              If your refund is approved, it will be processed and returned
              through the original payment method or another mutually agreed
              method.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Late or Missing Refunds
            </h2>

            <p>
              Refund processing times may vary depending on the payment method
              used.
            </p>

            <p className="mt-4">
              If you have not received your refund within the expected
              timeframe, please contact us on WhatsApp and our team will assist
              you.
            </p>

            <p className="mt-4 font-semibold text-[#061b0e]">
              WhatsApp: +92 310 2991736
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

            <p className="mt-4 font-semibold text-[#061b0e]">0310 2991736</p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Returns Process
            </h2>

            <p>
              To request a return or exchange, please contact us on WhatsApp
              with your order details and reason for return.
            </p>

            <p className="mt-4">
              Our team will guide you through the return process and provide the
              necessary instructions.
            </p>

            <p className="mt-4 font-semibold text-[#061b0e]">
              WhatsApp: +92 310 2991736
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

            <p className="mt-4 font-semibold text-[#061b0e]">+92 310 2991736</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ReturnsRefunds;

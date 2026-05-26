export default function Loader() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white px-8 py-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>

        <div className="text-center">
          <h3 className="text-lg font-semibold tracking-wide">Processing</h3>

          <p className="text-sm text-gray-500">Please wait...</p>
        </div>
      </div>
    </div>
  );
}

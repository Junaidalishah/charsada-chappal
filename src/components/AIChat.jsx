import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Bot, Send, X } from "lucide-react";
import axios from "axios";
import API_URL from "../config/api";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "👋 Welcome to Charsadda Chappal!\n\n" +
        "I'm your AI Shopping Assistant.\n\n" +
        "I can help you with:\n" +
        "• Product recommendations\n" +
        "• Sizes\n" +
        "• Delivery\n" +
        "• Returns & Exchanges\n" +
        "• Payments\n" +
        "• Order support\n\n" +
        "How can I help you today?",
    },
  ]);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [aiProducts, setAiProducts] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, aiProducts]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setAiProducts([]);
    const userMessage = input;
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);
    setInput("");

    // Typing animation
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "Typing...",
        loading: true,
      },
    ]);

    try {
      const chatHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));
      chatHistory.push({
        role: "user",
        content: userMessage,
      });

      const { data } = await axios.post(`${API_URL}/ai/chat`, {
        messages: chatHistory,
      });

      setAiProducts(data.products || []);

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // Remove "Typing..."

        const newMessage = {
          sender: "ai",
          text: data.reply,
          action: data.action || null, // ✅ Store action if present
        };

        updated.push(newMessage);
        return updated;
      });
    } catch (error) {
      console.log(error);
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        updated.push({
          sender: "ai",
          text: "Sorry, AI is unavailable.",
        });
        return updated;
      });
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            fixed
            bottom-24
            right-5
            z-50
            flex
            items-center
            gap-2
            h-14
            px-5
            rounded-full
            bg-[#061b0e]
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:scale-110
            active:scale-95
            animate-bounce
            overflow-hidden
          "
        >
          <span className="absolute inset-0 rounded-full bg-[#061b0e] opacity-30 animate-ping"></span>
          <Bot className="relative z-10" size={20} />
          <span className="relative z-10 font-semibold">AI</span>
        </button>
      )}

      {/* Chat Window */}
      <div
        className={`
          fixed
          right-5
          bottom-[100px]
          z-50
          w-[calc(100vw-32px)]
          max-w-[370px]
          h-[calc(100vh-180px)]
          max-h-[650px]
          flex
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-gray-200
          bg-white
          shadow-2xl
          transition-all
          duration-300
          ease-out
          origin-bottom-right
          ${isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#061b0e] px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/20 p-2">
              <Bot size={22} />
            </div>
            <div>
              <h2 className="font-semibold">AI Shopping Assistant</h2>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                <span>Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="transition hover:scale-110"
          >
            <X size={22} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-[#f8f6f1] p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  max-w-[82%]
                  whitespace-pre-line
                  rounded-2xl
                  px-4
                  py-3
                  text-sm
                  shadow-sm
                  ${message.sender === "user" ? "bg-[#061b0e] text-white" : "border border-gray-200 bg-white"}
                `}
              >
                {message.loading ? (
                  <span className="animate-pulse">🤖 Typing...</span>
                ) : (
                  <>
                    {message.text}
                    {/* ✅ Render Action Button if present */}
                    {message.action && message.action.type === "link" && (
                      <button
                        onClick={() => {
                          navigate(message.action.url);
                          setIsOpen(false);
                        }}
                        className="mt-3 w-full rounded-xl bg-[#061b0e] py-2 text-white hover:bg-[#0b2b16] transition"
                      >
                        {message.action.title}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Product Cards */}
          {aiProducts.length > 0 && (
            <div className="space-y-4 mt-4">
              {aiProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border rounded-2xl shadow-sm overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-[#061b0e] font-semibold">
                      PKR {product.price}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {product.description?.slice(0, 80)}...
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => {
                          navigate(`/product/${product._id}`);
                          setIsOpen(false);
                        }}
                        className="flex-1 bg-[#061b0e] text-white rounded-xl py-2 hover:bg-[#0b2b16]"
                      >
                        View Product
                      </button>

                      <button
                        onClick={() => {
                          addToCart(product);
                          setMessages((prev) => [
                            ...prev,
                            {
                              sender: "ai",
                              text: `✅ ${product.name} has been added to your cart.`,
                            },
                          ]);
                        }}
                        className="flex-1 border rounded-xl py-2 hover:bg-gray-100"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t bg-white p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              className="
                w-full
                rounded-full
                border
                border-gray-300
                py-3
                pl-5
                pr-14
                text-sm
                outline-none
                focus:border-[#061b0e]
              "
            />
            <button
              onClick={handleSend}
              className="
                absolute
                right-2
                top-1/2
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-[#061b0e]
                text-white
                transition
                hover:scale-110
              "
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChat;

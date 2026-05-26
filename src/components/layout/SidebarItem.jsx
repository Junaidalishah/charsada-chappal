const SidebarItem = ({ title, Icon, active }) => {
  return (
    <button
      className={`
        w-full flex items-center gap-3
        px-4 py-3 rounded-xl
        transition-all duration-200
        
        ${
          active
            ? "bg-white text-slate-900 shadow-lg"
            : "text-slate-300 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      <Icon size={20} />

      <span className="font-medium">{title}</span>
    </button>
  );
};

export default SidebarItem;

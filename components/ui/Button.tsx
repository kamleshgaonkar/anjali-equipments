type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Button({
  children,
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`rounded-xl bg-red-700 px-7 py-4 font-semibold text-white transition hover:bg-red-800 ${className}`}
    >
      {children}
    </button>
  );
}
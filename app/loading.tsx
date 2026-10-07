export default function Loading() {
    return (
      <div className="fixed inset-x-0 top-0 z-[9999] h-[3px] overflow-hidden bg-red-100">
        <div className="h-full w-1/3 animate-loading-bar bg-[#8b191c]" />
      </div>
    );
  }
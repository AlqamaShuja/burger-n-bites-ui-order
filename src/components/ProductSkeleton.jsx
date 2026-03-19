export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 rounded-lg skeleton" />
        <div className="h-3 w-full rounded-lg skeleton" />
        <div className="h-3 w-2/3 rounded-lg skeleton" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-7 w-20 rounded-lg skeleton" />
          <div className="h-10 w-10 rounded-full skeleton" />
        </div>
      </div>
    </div>
  );
}

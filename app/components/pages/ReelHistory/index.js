import ReelCard from "../../Reels/Card";

export default function ReelsHistoryGrid({ reels }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-6">
      {reels.map((reel) => (
        <ReelCard key={reel.id} reel={reel} />
      ))}
    </div>
  );
}

import { FiMapPin, FiStar, FiTruck } from "react-icons/fi";
const trustPoints = [
  {
    icon: FiMapPin,
    title: "From Nepal, with love",
    description: "Products with a place and purpose",
  },
  {
    icon: FiStar,
    title: "Makers you can trust",
    description: "Thoughtfully selected for you",
  },
  {
    icon: FiTruck,
    title: "Easy delivery",
    description: "Little joys, sent to your door",
  },
];
export default function TrustBar() {
  return (
    <section className="border-b border-[#f0e5e3] bg-white">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:grid-cols-3 sm:px-8 lg:px-12">
        {trustPoints.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7e8ed] text-[#b91c4a]">
              <Icon />
            </span>
            <div>
              <p className="text-sm font-bold">{title}</p>
              <p className="mt-1 text-xs text-[#9a8e98]">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

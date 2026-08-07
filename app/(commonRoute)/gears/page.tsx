import GearCard from "@/components/gearCard/gearCard";
import GearFilter from "./_components/gearFilter";


export interface GearProps {
  id: string;
  name: string;
  image?: string;
  price: number;
  category: string;
  brand: string;
  available: boolean;
}

interface Props {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    name?: string;
  }>;
}

export default async function GearsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) query.set(key, value);
  });

  const [gearRes, categoryRes] = await Promise.all([
    fetch(
      `${process.env.BACKEND_API_URL}/api/gear?${query.toString()}`,
      {
        cache: "no-store",
      }
    ),

    fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      next: {
        revalidate: 86400,
      },
    }),
  ]);

  const gearData = await gearRes.json();
  const categoryData = await categoryRes.json();
  console.log(categoryData);

  return (
    <div className="container mx-auto py-8">

      <GearFilter
        categories={categoryData.data}
      />

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {gearData.data.result.map((gear: GearProps) => (
          <GearCard
            key={gear.id}
            gear={gear}
          />
        ))}
      </div>

    </div>
  );
}
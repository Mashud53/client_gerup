"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Category {
  category: string;
}

interface Props {
  categories: Category[];
}

export default function GearFilter({
  categories,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`/gears?${params.toString()}`);
  };

  return (
    <div className="mb-8 rounded-xl border bg-card p-6">

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <Input
          placeholder="Search Gear"
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) =>
            update("name", e.target.value)
          }
        />

        <select
          className="h-10 rounded-md border px-3"
          defaultValue={
            searchParams.get("category") ?? ""
          }
          onChange={(e) =>
            update("category", e.target.value)
          }
        >
          <option value="">All Categories</option>

          {categories.map((item) => (
            <option
            className="bg-black text-white"
              key={item.category}
              value={item.category}
            >
              {item.category}
            </option>
          ))}
        </select>

        <Input
          placeholder="Brand"
          defaultValue={
            searchParams.get("brand") ?? ""
          }
          onChange={(e) =>
            update("brand", e.target.value)
          }
        />

        <Input
          type="number"
          placeholder="Min Price"
          defaultValue={
            searchParams.get("minPrice") ?? ""
          }
          onChange={(e) =>
            update(
              "minPrice",
              e.target.value
            )
          }
        />

        <Input
          type="number"
          placeholder="Max Price"
          defaultValue={
            searchParams.get("maxPrice") ?? ""
          }
          onChange={(e) =>
            update(
              "maxPrice",
              e.target.value
            )
          }
        />

       

        <Button
          variant="outline"
          onClick={() => router.replace("/gears")}
        >
          Clear Filters
        </Button>

      </div>

    </div>
  );
}
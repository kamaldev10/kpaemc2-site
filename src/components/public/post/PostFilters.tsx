// src/components/public/filters/PostFilters.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, Search } from "lucide-react";
import { PostsData } from "@/lib/dummy-data/PostsData";
import { type FilterState } from "@/hooks/useFilteredPosts"; // Impor tipe

type PostFiltersProps = {
  initialFilters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
};

const uniqueYears = Array.from(
  new Set(PostsData.map((post) => new Date(post.date).getFullYear().toString()))
).sort((a, b) => Number(b) - Number(a));

export default function PostFilters({
  initialFilters,
  onApplyFilters,
}: PostFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(initialFilters);

  const handleInputChange = (
    key: keyof FilterState,
    value: string | boolean
  ) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      search: "",
      year: "all",
      category: "all",
      featured: false,
    };
    setLocalFilters(defaultFilters);
    onApplyFilters(defaultFilters);
  };

  const FilterForm = (
    <>
      <div className="space-y-2">
        <Label htmlFor="search-tags">Cari berdasarkan tag</Label>
        <Input
          id="search-tags"
          placeholder="teknologi, karir..."
          value={localFilters.search}
          onChange={(e) => handleInputChange("search", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="year-filter">Tahun</Label>
        <Select
          value={localFilters.year}
          onValueChange={(value) => handleInputChange("year", value)}
        >
          <SelectTrigger id="year-filter" className="w-full">
            <SelectValue placeholder="Semua Tahun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tahun</SelectItem>
            {uniqueYears.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="category-filter">Kategori</Label>
        <Select
          value={localFilters.category}
          onValueChange={(value) => handleInputChange("category", value)}
        >
          <SelectTrigger id="category-filter" className="w-full">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Kategori</SelectItem>
            <SelectItem value="Artikel">Artikel</SelectItem>
            <SelectItem value="Event">Event</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2 pt-4">
        <Checkbox
          id="featured"
          checked={localFilters.featured}
          onCheckedChange={(checked) =>
            handleInputChange("featured", !!checked)
          }
        />
        <Label
          htmlFor="featured"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Hanya tampilkan yang utama
        </Label>
      </div>
    </>
  );

  return (
    <div className="mb-10">
      {/* Tampilan Desktop Horizontal */}
      <div className="hidden md:flex items-center gap-2 p-3 border bg-card rounded-full shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari tag..."
            className="pl-10 rounded-full"
            value={localFilters.search}
            onChange={(e) => handleInputChange("search", e.target.value)}
          />
        </div>
        <Separator orientation="vertical" className="h-6" />
        <Select
          value={localFilters.year}
          onValueChange={(value) => handleInputChange("year", value)}
        >
          <SelectTrigger className="w-[150px] border-none shadow-none focus:ring-0">
            <SelectValue placeholder="Tahun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tahun</SelectItem>
            {uniqueYears.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={localFilters.category}
          onValueChange={(value) => handleInputChange("category", value)}
        >
          <SelectTrigger className="w-[150px] border-none shadow-none focus:ring-0">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Kategori</SelectItem>
            <SelectItem value="Artikel">Artikel</SelectItem>
            <SelectItem value="Event">Event</SelectItem>
          </SelectContent>
        </Select>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center space-x-2 pl-2">
          <Checkbox
            id="featured-desktop"
            checked={localFilters.featured}
            onCheckedChange={(checked) =>
              handleInputChange("featured", !!checked)
            }
          />
          <Label htmlFor="featured-desktop" className="text-sm font-medium">
            Featured
          </Label>
        </div>
        <Button onClick={handleApply} className="rounded-full">
          Terapkan
        </Button>
        <Button onClick={handleReset} variant="ghost" className="rounded-full">
          Reset
        </Button>
      </div>

      {/* Tampilan Mobile dengan Sheet */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter & Urutkan
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Postingan</SheetTitle>
              <SheetDescription>Persempit pencarian Anda.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 py-6">{FilterForm}</div>
            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={handleApply} className="w-full">
                  Terapkan Filter
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

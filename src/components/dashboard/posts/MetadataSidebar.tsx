"use client";

import { Control } from "react-hook-form";
import Image from "next/image";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { cn } from "@/lib/utils/utils";
import { CalendarIcon, Loader2, Save, X } from "lucide-react";
import { type PostFormValues } from "@/lib/validation/post.schema";

// Komponen UI...
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MetadataSidebarProps = {
  control: Control<PostFormValues>;
  isUpdate: boolean;
  isLoading: boolean;
  imagePreview: string | null;
  onImageSelectClick: () => void;
  onImageRemove: () => void;
  imageFilename?: string | null;
  isTitleFilled: boolean; // <-- Prop baru
};

export default function MetadataSidebar({
  control,
  isUpdate,
  isLoading,
  imagePreview,
  onImageSelectClick,
  onImageRemove,
  imageFilename,
  isTitleFilled,
}: MetadataSidebarProps) {
  return (
    <div className="lg:col-span-1 space-y-8">
      {/* Kartu Publikasi */}
      <Card>
        <CardHeader>
          <CardTitle>Publikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isUpdate ? "Update Postingan" : "Publikasikan"}
          </Button>
        </CardContent>
      </Card>

      {/* Kartu Properti */}
      <Card>
        <CardHeader>
          <CardTitle>Properti Postingan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <FormItem>
              <FormLabel>Gambar Unggulan</FormLabel>
              {imagePreview && (
                <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                  <Image
                    src={imagePreview}
                    alt="Pratinjau"
                    fill
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7 rounded-full"
                    onClick={onImageRemove} // Panggil handler dari props
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* Bungkus tombol dengan div agar tooltip tetap muncul saat disabled */}
                    <div className="w-full">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => isTitleFilled && onImageSelectClick()} // Panggil hanya jika aktif
                        disabled={!isTitleFilled} // <-- Tombol non-aktif jika judul kosong
                      >
                        {imageFilename ? (
                          <span className="truncate">{imageFilename}</span>
                        ) : imagePreview ? (
                          "Ganti Gambar"
                        ) : (
                          "Unggah Gambar"
                        )}{" "}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!isTitleFilled && (
                    <TooltipContent>
                      <p>Silakan isi judul terlebih dahulu.</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              <FormMessage />
            </FormItem>
          </div>

          <FormField
            name="imageSource"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sumber Gambar</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contoh: Foto Bersama Kegiatan Pengabdian"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Isi dengan sumber gambar atau deskripsi singkat (maksimal 10
                  kata) .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="category"
            control={control}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Kategori <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <SelectGroup>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Artikel">Artikel</SelectItem>
                        <SelectItem value="Kegiatan">Kegiatan</SelectItem>
                        <SelectItem value="Rilis Kegiatan">
                          Rilis Kegiatan
                        </SelectItem>
                        <SelectItem value="Kolaborasi">Kolaborasi</SelectItem>
                        <SelectItem value="Pengalaman Pribadi">
                          Pengalaman Pribadi
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </SelectGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="date"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Tanggal Publikasi <span className="text-destructive">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: localeID })
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="tags"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tags <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Teknologi, Karir, ..." {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Pisahkan setiap tag dengan koma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="author"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Penulis <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nama Penulis" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="featured"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Postingan Unggulan</FormLabel>
                  <FormDescription>
                    Tampilkan di highlight website.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}

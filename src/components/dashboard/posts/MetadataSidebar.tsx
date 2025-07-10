// src/components/dashboard/posts/MetadataSidebar.tsx
"use client";

import { UseFormReturn } from "react-hook-form";
import { PostFormValues } from "./PostForm.logic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Save } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import ImageUploadModal from "@/components/shared/ImageUploadModal";
import { useState } from "react";

type MetadataSidebarProps = {
  form: UseFormReturn<PostFormValues>;
  isUpdate: boolean;
  category: "Artikel" | "Event";
};

export default function MetadataSidebar({
  form,
  isUpdate,
  category,
}: MetadataSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="lg:col-span-1 space-y-8">
      {/* Kartu Publikasi */}
      <Card>
        <CardHeader>
          <CardTitle>Publikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <Button type="submit" className="w-full">
            <Save className="mr-2 h-4 w-4" />
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
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Kategori</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Artikel" />
                      </FormControl>
                      <FormLabel className="font-normal">Artikel</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Event" />
                      </FormControl>
                      <FormLabel className="font-normal">Event</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Publikasi</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
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
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Tampilkan pratinjau jika URL sudah ada */}
                {field.value && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                    <Image
                      src={field.value}
                      alt="Pratinjau Gambar"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsModalOpen(true)}
                >
                  {field.value ? "Ganti Gambar" : "Pilih Gambar"}
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="tags"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="Teknologi, Karir, ..." {...field} />
                </FormControl>
                <FormDescription>
                  Pisahkan setiap tag dengan koma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="featured"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Postingan Utama (Featured)</FormLabel>
                  <FormDescription>
                    Tampilkan di bagian highlight.
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

      {/* Kartu Detail Artikel (Kondisional) */}
      {category === "Artikel" && (
        <Card>
          <CardHeader>
            <CardTitle>Detail Artikel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              name="author"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Penulis</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Penulis" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="readTime"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimasi Waktu Baca (menit)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Contoh: 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      )}

      {/* Kartu Detail Event (Kondisional) */}
      {category === "Event" && (
        <Card>
          <CardHeader>
            <CardTitle>Detail Event</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokasi</FormLabel>
                  <FormControl>
                    <Input placeholder="Online / Nama Gedung" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              name="eventDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Acara</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contoh: 25-27 Agustus 2025"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="eventTime"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waktu Acara</FormLabel>
                  <FormControl>
                    <Input placeholder="09:00 - 15:00 WIB" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga Tiket</FormLabel>
                  <FormControl>
                    <Input placeholder="Gratis / 150000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="registrationLink"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Pendaftaran</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://google.com/forms/..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      )}

      {/* Render Modal (tidak terlihat sampai diaktifkan) */}
      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadComplete={(url) => {
          // Set nilai form dengan URL dari UploadThing
          form.setValue("imageUrl", url, { shouldValidate: true });
        }}
      />
    </div>
  );
}

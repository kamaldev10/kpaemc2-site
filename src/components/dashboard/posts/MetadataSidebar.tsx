"use client";

import { UseFormReturn, Control } from "react-hook-form"; // Impor tipe Control
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2, Save } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ImageUploadModal from "@/components/shared/ImageUploadModal";

// ===============================================
// PERBAIKAN: Ubah props 'form' menjadi lebih spesifik
// ===============================================
type MetadataSidebarProps = {
  control: Control<PostFormValues>; // Terima 'control' secara langsung
  setValue: UseFormReturn<PostFormValues>["setValue"]; // Terima 'setValue' secara langsung
  isUpdate: boolean;
  category?: "Artikel" | "Event";
  isLoading: boolean;
};

export default function MetadataSidebar({
  control,
  setValue,
  isUpdate,
  category,
  isLoading,
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
          {/* Semua FormField sekarang menggunakan 'control' dari props */}
          <FormField
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gambar Unggulan</FormLabel>
                <FormControl>
                  <>
                    {field.value && (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                        <Image
                          src={field.value}
                          alt="Pratinjau"
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
                  </>
                </FormControl>
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
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Artikel" />
                      </FormControl>
                      <FormLabel className="font-normal">Artikel</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
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
                <FormDescription>
                  Pisahkan setiap tag dengan koma.
                </FormDescription>
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
                  <FormLabel>Postingan Utama</FormLabel>
                  <FormDescription>Tampilkan di highlight.</FormDescription>
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
      {/* Field Kondisional untuk Event */}
      {category === "Event" && (
        <Card>
          <CardHeader>
            <CardTitle>Detail Event</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              name="location"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokasi</FormLabel>
                  <FormControl>
                    <Input placeholder="Online / Gedung X" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Waktu Mulai Acara */}
            <div className="space-y-2">
              <FormLabel>Waktu Mulai Acara</FormLabel>
              <div className="flex gap-2">
                <FormField
                  name="eventStartDate_Date"
                  control={control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pilih tanggal</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="eventStartDate_Time"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="time" {...field} className="w-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Waktu Selesai Acara */}
            <div className="space-y-2">
              <FormLabel>Waktu Selesai Acara</FormLabel>
              <div className="flex gap-2">
                <FormField
                  name="eventEndDate_Date"
                  control={control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pilih tanggal</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="eventEndDate_Time"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="time" {...field} className="w-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              name="price"
              control={control}
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
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Pendaftaran</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      )}
      {/* Kartu Detail Artikel Kondisional */}
      {category === "Artikel" && (
        <Card>
          <CardHeader>
            <CardTitle>Detail Artikel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              name="author"
              control={control}
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
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waktu Baca (menit)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      )}
      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadComplete={(url) => {
          setValue("imageUrl", url, { shouldValidate: true });
        }}
      />{" "}
    </div>
  );
}

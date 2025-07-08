// app/contact/page.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";

// Impor komponen dari shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Impor ikon
import { Mail, MapPin, Phone, Send } from "lucide-react";

// Skema validasi menggunakan Zod
const formSchema = z.object({
  name: z.string().min(2, "Nama harus memiliki minimal 2 karakter."),
  email: z.string().email("Alamat email tidak valid."),
  subject: z.string().min(5, "Subjek harus memiliki minimal 5 karakter."),
  message: z
    .string()
    .min(10, "Pesan harus memiliki minimal 10 karakter.")
    .max(500, "Pesan tidak boleh lebih dari 500 karakter."),
});

export default function ContactPage() {
  // 1. Definisikan form Anda dengan react-hook-form dan zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // 2. Definisikan fungsi submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Di sini Anda akan mengirim data ke backend atau API
    console.log(values);
    // Tampilkan notifikasi sukses atau reset form
    alert("Pesan Anda telah terkirim! Terima kasih.");
    form.reset();
  }

  return (
    <section className="w-full bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Hubungi Kami
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Punya pertanyaan atau ingin berkolaborasi? Kami siap mendengarkan.
          </p>
        </motion.div>

        {/* Layout Grid 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Kolom Kiri: Info & Peta */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Alamat Kantor
                    </span>
                    <br />
                    Jl. HR Soebrantas No. 155, Panam, Pekanbaru, Riau, 28293
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Email</span>
                    <br />
                    <a
                      href="mailto:kontak@kpaemc2.org"
                      className="hover:text-primary"
                    >
                      kontak@kpaemc2.org
                    </a>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Telepon
                    </span>
                    <br />
                    <a href="tel:+6281234567890" className="hover:text-primary">
                      +62 812-3456-7890
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Lokasi Kami</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Ganti 'src' dengan link embed Google Maps Anda */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.663351307613!2d101.373809!3d0.4688179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a8d3856b3531%3A0x155e71457e231b6!2sUniversitas%20Riau%20Kampus%20Binawidya!5e0!3m2!1sid!2sid!4v1680000000000"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </CardContent>
            </Card>
          </motion.div>

          {/* Kolom Kanan: Formulir Kontak */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Kirim Pesan Langsung</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alamat Email</FormLabel>
                          <FormControl>
                            <Input placeholder="anda@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subjek</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Contoh: Pertanyaan tentang kolaborasi"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pesan Anda</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tuliskan pesan Anda di sini..."
                              className="resize-none"
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Kirim Pesan
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

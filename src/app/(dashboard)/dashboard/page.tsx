"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart, Users, FileText } from "lucide-react";
import React from "react"; // Impor React untuk tipe ElementType

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ElementType; // Tipe untuk komponen ikon
};

// Komponen Kartu Statistik dengan props yang sudah diketik dengan benar
function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">+20.1% dari bulan lalu</p>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <h1 className="text-2xl font-bold">Dashboard Utama</h1>

      {/* Grid untuk Kartu Statistik */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Pengunjung" value="12,345" icon={BarChart} />
        <StatCard title="Total Anggota" value="250" icon={Users} />
        <StatCard title="Total Postingan" value="89" icon={FileText} />
        <StatCard title="Aktivitas Baru" value="15" icon={Activity} />
      </div>

      {/* Konten lainnya */}
      <div className="grid auto-rows-min gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Grafik Pengunjung</CardTitle>
          </CardHeader>
          <CardContent className="h-72 bg-muted/50 rounded-b-xl flex items-center justify-center">
            <p className="text-muted-foreground">
              Grafik akan ditampilkan di sini
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-2 rounded-full">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm">
                Postingan baru: &quot;Workshop Canva&quot; dipublikasikan.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-2 rounded-full">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm">
                Anggota baru: &quot;John Doe&quot; mendaftar.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

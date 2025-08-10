"use client";

import useSWR from "swr";
import { Activity, BarChart, Users, FileText } from "lucide-react";
import StatCard from "@/components/dashboard/dashboard/StatCard";
import DashboardSkeleton from "@/components/dashboard/dashboard/DashboardSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Fungsi fetcher sederhana untuk SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

type RecentActivity = {
  id: number;
  title: string;
  category: string;
};

type DashboardStats = {
  totalPosts: number;
  totalMembers: number;
  recentActivity: RecentActivity[];
  totalVisitors: number;
};

export default function DashboardPage() {
  // Gunakan SWR dengan tipe data yang sudah didefinisikan
  const { data, error, isLoading } = useSWR<DashboardStats>(
    "/api/admin/dashboard/stats",
    fetcher
  );

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="p-6 text-destructive">
        Gagal memuat data dashboard. Silakan coba lagi.
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <h1 className="text-2xl font-bold">Dashboard Utama</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pengunjung"
          value={data.totalVisitors.toLocaleString("id-ID")}
          icon={BarChart}
          isLoading={isLoading}
          description="+20.1% dari bulan lalu"
        />
        <StatCard
          title="Total Anggota"
          value={data.totalMembers}
          icon={Users}
          isLoading={isLoading}
          description="Data terdaftar"
        />
        <StatCard
          title="Total Postingan"
          value={data.totalPosts}
          icon={FileText}
          isLoading={isLoading}
          description="Artikel & Event"
        />
        <StatCard
          title="Aktivitas Baru"
          value={data.recentActivity.length}
          icon={Activity}
          isLoading={isLoading}
          description="Dalam 7 hari terakhir"
        />
      </div>

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
            {data.recentActivity.map((activity: RecentActivity) => (
              <div key={activity.id} className="flex items-center gap-4">
                <div className="bg-primary/20 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm truncate">
                  Postingan baru: &quot;{activity.title}&quot;
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

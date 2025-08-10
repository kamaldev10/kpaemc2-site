"use client";

import { useState, useEffect } from "react";
import { format, parse, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { cn } from "@/lib/utils/utils";

type DatePickerInputProps = {
  value?: Date; // Menerima objek Date
  onChange: (date?: Date) => void; // Mengirim kembali objek Date atau undefined
  placeholder?: string;
};

export function DatePickerInput({
  value,
  onChange,
  placeholder = "DD/MM/YYYY",
}: DatePickerInputProps) {
  // State lokal hanya untuk nilai string dari input field
  const [dateString, setDateString] = useState(
    value ? format(value, "dd/MM/yyyy") : ""
  );

  // Sinkronkan input string jika nilai dari luar (misal: dari kalender) berubah
  useEffect(() => {
    if (value) {
      setDateString(format(value, "dd/MM/yyyy"));
    } else {
      setDateString("");
    }
  }, [value]);

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateString(e.target.value);
  };

  const handleInputBlur = () => {
    // Saat pengguna selesai mengetik, coba parse tanggalnya
    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());

    // Jika tanggal valid, update state form utama. Jika tidak, kosongkan.
    if (isValid(parsedDate)) {
      onChange(parsedDate);
    } else {
      onChange(undefined);
      setDateString(""); // Reset input jika tidak valid
    }
  };

  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        value={dateString}
        onChange={handleManualInputChange}
        onBlur={handleInputBlur}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size="icon"
            className="absolute right-0 top-0 h-full rounded-l-none border-l-0"
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange} // Langsung panggil onChange dari props
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

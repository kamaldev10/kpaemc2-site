import { type JsonValue } from "@prisma/client/runtime/library";

// Tipe untuk objek di dalam array 'structure'
export type StructureInfo = {
  period: string;
  image: string;
  chairmanName: string;
};

// Tipe utama yang cocok dengan skema Prisma
export type About = {
  id: number;
  orgName: string;
  bornDate: string;
  motto: string;
  description: string;
  vision: string;
  mission: string[];
  activePeriod: string;
  structure: JsonValue; // Tipe dari Prisma untuk JSON
};

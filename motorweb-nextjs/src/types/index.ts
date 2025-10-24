export interface Motorcycle {
  id: string;
  brand: string;
  model: string;
  type: string;
  year: number;
  displacement_cc: number;
  power_kw: number;
  torque_nm: number;
  weight_kg: number;
  seat_height_mm: number;
  price_cny: number;
  abs: boolean;
  tcs: boolean;
  aw?: boolean;
  cooling: string;
  top_speed_kmh?: number;
  cylinder_count?: number;
  accel_0_100_kmh?: number;
  image: string;
}

export interface Filters {
  search: string;
  type: string;
  sort: string;
  priceMin: string;
  priceMax: string;
  ccMin: string;
  ccMax: string;
  brand: string;
  abs: string;
  tcs: string;
  cooling: string;
  yearMin: string;
  yearMax: string;
  seatMin: string;
  seatMax: string;
  weightMin: string;
  weightMax: string;
  cylinderCount: string;
}

export interface Posts {
  id: string;
  title: string;
  content: string;
  summary: string;
  date: string;
}
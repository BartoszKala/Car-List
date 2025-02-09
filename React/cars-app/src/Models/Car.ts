export enum FuelType {
  Petrol=1,
  Hybrid =2,
  Diesel=3,
  LPG=4 
}

export enum BodyType {
  Hatchback=1,
  Sedan=2,
  Kombi=3,
  SUV=4,
  Roadster=5
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  engineCapacity: number;
  fuelType: FuelType;
  productionDate: string; // ISO 8601 string
  carFuelConsumption: number;
  bodyType: BodyType;
}
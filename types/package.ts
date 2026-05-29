export interface PackageCategory {
  name: string;
  items: string[];
}

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  categories?: PackageCategory[];
  isPopular?: boolean;
}

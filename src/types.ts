export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  avatarSeed: string;
  setupType: string;
  likes: number;
}

export interface Specification {
  key: string;
  label: string;
  value: string;
  iconName: string;
  description: string;
}

export interface Benefit {
  title: string;
  description: string;
  iconName: string;
  tag: string;
}

export type CustomRgbColor = 'lime' | 'pink' | 'blue' | 'orange' | 'purple';

export interface CustomRgbDetails {
  id: CustomRgbColor;
  name: string;
  hex: string;
  textColor: string;
  glowClass: string;
  borderClass: string;
}

export interface MouseVariant {
  id: string;
  name: string;
  colorName: string;
  price: number;
  imageColor: string;
  description: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

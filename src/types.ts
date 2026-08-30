export interface LedPanelProduct {
  id: string;
  name: string;
  category: 'Indoor' | 'Outdoor' | 'Rental' | 'Transparente' | 'Especial';
  pixelPitch: string;
  brightness: string;
  refreshRate: string;
  ipRating: string;
  viewingDistance: string;
  description: string;
  bestFor: string;
  cabinetSize: string;
}

export interface MetricData {
  time: string;
  activeDisplays: number;
  totalHoursActive: number;
  lumensEfficiency: number;
  energySavings: number;
}

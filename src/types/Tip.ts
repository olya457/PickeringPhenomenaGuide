
export type TipCategory = 'preparation' | 'safety' | 'photography';
export type TipPriority = 'essential' | 'recommended';

export interface Tip {
  id: string;
  title: string;
  body: string;
  category: TipCategory;
  priority: TipPriority;
  iconName: string;
  isSaved: boolean;
}
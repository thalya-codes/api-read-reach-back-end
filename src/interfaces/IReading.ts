export interface IReading {
  title: string;
  author: string;
  start_date: Date | string;
  end_date: Date | string;
  rating: number;
  user_id: string | number;
}

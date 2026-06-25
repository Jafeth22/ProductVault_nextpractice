interface Reviews {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface IProducts {
  title: string;
  price: number;
  description: string;
  discountPercentage: number;
  stock: number;
  tags: string[];
  brand: string;
  availabilityStatus: string;
  reviews?: Reviews[];
  thumbnail?: string;
}

export type { IProducts };

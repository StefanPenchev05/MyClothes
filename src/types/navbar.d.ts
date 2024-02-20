interface Avatar {
  avatar: string;
  fileName: string;
  uploadedAt: Date;
}

interface UserNavBarState {
  id: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  avatar: Avatar | undefined;
  role: string | undefined;
  purchasedProducts?: number;
  products?: number;
  sales?: number;
}

export type User = {
  user_id: string;
  user_name: string;
  email: string;
  password: string;
  user_type: string;
};

export type Product = {
  id: string;
  inv_title: string;
  inv_description: string;
  inv_price: number;
  inv_discount: number;
  seller_id: string;
  featured: boolean;  
  image_url: string;  
};

export type Seller = {
  id: string;
  name: string;
  specialty: string;
  image_url: string;
  rating: number;
  about: string;
};

export type InventoryByCategory = {
  id: number;
  category_name: string;
  inv_id: string;  
  //??
}

export type Category = {
  id: number;
  name: string;
}
export type resultProduct = {
  description?: string;
  id: string;
  image: string;
  name: string;
  price: number;
  stock?: number;
}

export type user = {
  name: string;
  email: string;
  password: string;
  role: string;
  id: string;
}

export type responseLogin = {
  access_token: string;
  user: user;
}

export type localStorageToken = {
  access_token: string;
  expiry: number;
}

export type cartProduct = {
  id: string;
  quantity: string;
  product: resultProduct;
}

export type resulCartProducts = {
  id: string;
  products_includes: cartProduct[];
}

export type productCartProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}


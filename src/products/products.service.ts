import db from "../db";
import { TopProducts } from "./products.model";

/** Returns all products, optionally filtered by category. */
export const getAll = (category?: string) => db.products
.filter(el => !category || (el.category === category));


export const getById = (id: string) => db.products
.find(el => el.id === parseInt(id));

/** Returns the top most sold products. */
export const getBestsellers = (top: number = 10) => {
  const bestsellers: TopProducts[] = [];

  db.orders.forEach((order) => {
    order.products.forEach((product) => {
      const productIndex = bestsellers.findIndex((p) => {
        return p.id === product.id;
      });

      if (productIndex === -1) {
        bestsellers.push({ id: product.id, name: product.name, count: 1 });
      } else {
        bestsellers[productIndex].count += 1;
      }
    });
  });

  return bestsellers.sort((a, b) => b.count - a.count).slice(0, top);
}

export const create = (name: string, category: string, price: number, image: string) => {
  const newProduct = {
    id: db.products.length +1,
    name,
    category,
    price,
    image,  
  };
  db.products.push(newProduct);

  return newProduct;
}


export const update = (id: string, name: string, category: string, price: number, image: string) => {
  const product = getById(id);

  if (!product) {
    return undefined
  }

  product.name = name;
  product.category = category;
  product.price = price;
  product.image = image;

  return product;
}


export const remove = (id: string) => {
  const newProducts = db.products.filter((el => el.id !== parseInt(id)));
  db.products = newProducts;
}

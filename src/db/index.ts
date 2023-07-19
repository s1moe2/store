import { Order } from "../models/order";
import { Product } from "../models/product";
import { User } from "../models/user";

export const orders: Array<Order> = [
  {
    id: "1",
    userId: 1,
    products: [
      {
        id: 1,
        name: "Macbook Pro",
        category: "tech",
        price: 3000,
        image:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202206_GEO_PT",
      },
    ],
    price: 3000,
    orderedAt: new Date(2023, 0, 1, 10, 0, 0),
    status: "delivered",
    rewardPoints: 30,
  },
  {
    id: "2",
    userId: 2,
    products: [
      {
        id: 3,
        name: "iPhone 13",
        category: "tech",
        price: 1200,
        image: "https://lorem.ipsum/iphone-13.jpg",
      },
      {
        id: 5,
        name: "Nike Air Zoom Pegasus",
        category: "sports",
        price: 150,
        image: "https://lorem.ipsum/nike-pegasus.jpg",
      },
    ],
    price: 1350,
    orderedAt: new Date(2023, 1, 15, 15, 30, 0),
    status: "delivered",
    rewardPoints: 14,
  },
  {
    id: "3",
    userId: 3,
    products: [
      {
        id: 4,
        name: "Samsung 4K Smart TV",
        category: "tech",
        price: 1500,
        image: "https://lorem.ipsum/samsung-tv.jpg",
      },
      {
        id: 7,
        name: "Gourmet Coffee Blend",
        category: "food",
        price: 20,
        image: "https://lorem.ipsum/coffee-blend.jpg",
      },
    ],
    price: 1520,
    orderedAt: new Date(2023, 2, 20, 9, 45, 0),
    status: "delivered",
    rewardPoints: 16,
  },
  {
    id: "4",
    userId: 4,
    products: [
      {
        id: 6,
        name: "Sony WH-1000XM4 Headphones",
        category: "tech",
        price: 350,
        image: "https://lorem.ipsum/sony-headphones.jpg",
      },
    ],
    price: 350,
    orderedAt: new Date(2023, 3, 5, 14, 20, 0),
    status: "delivered",
    rewardPoints: 4,
  },
  {
    id: "5",
    userId: 1,
    products: [
      {
        id: 2,
        name: "Macbook dasdadasd",
        category: "tech",
        price: 3000,
        image:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202206_GEO_PT",
      },
      {
        id: 8,
        name: "Yoga Mat",
        category: "fitness",
        price: 40,
        image: "https://lorem.ipsum/yoga-mat.jpg",
      },
    ],
    price: 3040,
    orderedAt: new Date(2023, 3, 30, 11, 10, 0),
    status: "delivered",
    rewardPoints: 30,
  },
  {
    id: "6",
    userId: 3,
    products: [
      {
        id: 3,
        name: "iPhone 13",
        category: "tech",
        price: 1200,
        image: "https://lorem.ipsum/iphone-13.jpg",
      },
    ],
    price: 1200,
    orderedAt: new Date(2023, 4, 15, 16, 40, 0),
    status: "delivered",
    rewardPoints: 12,
  },
  {
    id: "7",
    userId: 2,
    products: [
      {
        id: 4,
        name: "Samsung 4K Smart TV",
        category: "tech",
        price: 1500,
        image: "https://lorem.ipsum/samsung-tv.jpg",
      },
      {
        id: 6,
        name: "Sony WH-1000XM4 Headphones",
        category: "tech",
        price: 350,
        image: "https://lorem.ipsum/sony-headphones.jpg",
      },
    ],
    price: 1850,
    orderedAt: new Date(2023, 5, 12, 13, 15, 0),
    status: "delivered",
    rewardPoints: 19,
  },
  {
    id: "8",
    userId: 4,
    products: [
      {
        id: 1,
        name: "Macbook Pro",
        category: "tech",
        price: 3000,
        image:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202206_GEO_PT",
      },
      {
        id: 5,
        name: "Nike Air Zoom Pegasus",
        category: "sports",
        price: 150,
        image: "https://lorem.ipsum/nike-pegasus.jpg",
      },
    ],
    price: 3150,
    orderedAt: new Date(2023, 6, 1, 9, 55, 0),
    status: "delivered",
    rewardPoints: 32,
  },
  {
    id: "9",
    userId: 1,
    products: [
      {
        id: 7,
        name: "Gourmet Coffee Blend",
        category: "food",
        price: 20,
        image: "https://lorem.ipsum/coffee-blend.jpg",
      },
      {
        id: 8,
        name: "Yoga Mat",
        category: "fitness",
        price: 40,
        image: "https://lorem.ipsum/yoga-mat.jpg",
      },
    ],
    price: 60,
    orderedAt: new Date(2023, 6, 10, 18, 20, 0),
    status: "delivered",
    rewardPoints: 1,
  },
  {
    id: "10",
    userId: 3,
    products: [
      {
        id: 3,
        name: "iPhone 13",
        category: "tech",
        price: 1200,
        image: "https://lorem.ipsum/iphone-13.jpg",
      },
    ],
    price: 1200,
    orderedAt: new Date(2023, 7, 2, 10, 30, 0),
    status: "delivered",
    rewardPoints: 12,
  },
  {
    id: "11",
    userId: 2,
    products: [
      {
        id: 5,
        name: "Nike Air Zoom Pegasus",
        category: "sports",
        price: 150,
        image: "https://lorem.ipsum/nike-pegasus.jpg",
      },
      {
        id: 7,
        name: "Gourmet Coffee Blend",
        category: "food",
        price: 20,
        image: "https://lorem.ipsum/coffee-blend.jpg",
      },
    ],
    price: 170,
    orderedAt: new Date(2023, 7, 22, 14, 45, 0),
    status: "delivered",
    rewardPoints: 2,
  },
];

export const products: Array<Product> = [
  {
    id: 1,
    name: "Macbook Pro",
    category: "tech",
    price: 3000,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202206_GEO_PT",
  },
  {
    id: 2,
    name: "Macbook dasdadasd",
    category: "tech",
    price: 3000,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202206_GEO_PT",
  },
  {
    id: 3,
    name: "iPhone 13",
    category: "tech",
    price: 1200,
    image: "https://lorem.ipsum/iphone-13.jpg",
  },
  {
    id: 4,
    name: "Samsung 4K Smart TV",
    category: "tech",
    price: 1500,
    image: "https://lorem.ipsum/samsung-tv.jpg",
  },
  {
    id: 5,
    name: "Nike Air Zoom Pegasus",
    category: "sports",
    price: 150,
    image: "https://lorem.ipsum/nike-pegasus.jpg",
  },
  {
    id: 6,
    name: "Sony WH-1000XM4 Headphones",
    category: "tech",
    price: 350,
    image: "https://lorem.ipsum/sony-headphones.jpg",
  },
  {
    id: 7,
    name: "Gourmet Coffee Blend",
    category: "food",
    price: 20,
    image: "https://lorem.ipsum/coffee-blend.jpg",
  },
  {
    id: 8,
    name: "Yoga Mat",
    category: "fitness",
    price: 40,
    image: "https://lorem.ipsum/yoga-mat.jpg",
  },
];

export const users: Array<User> = [
  {
    id: 1,
    username: "bill",
    name: "Bill Gates",
    email: "bg@ms.x",
    spent: 3000,
    password: "fasfasdfasdfasdf",
    rewardPoints: 30,
  },
  {
    id: 2,
    username: "elon",
    name: "Elon Musk",
    email: "elon@tesla.com",
    spent: 5000,
    password: "fasfasdfasdfasdf",
    rewardPoints: 10,
  },
  {
    id: 3,
    username: "jeff",
    name: "Jeff Bezos",
    email: "jeff@amazon.com",
    spent: 8000,
    password: "fasfasdfasdfasdf",
    rewardPoints: 4,
  },
  {
    id: 4,
    username: "mark",
    name: "Mark Zuckerberg",
    email: "mark@facebook.com",
    spent: 2500,
    password: "fasfasdfasdfasdf",
    rewardPoints: 8,
  },
  {
    id: 5,
    username: "diogo",
    name: "Diogo",
    email: "ddasdasd@lasjkdfhadsfa.com",
    spent: 2500,
    password: "$2b$12$OW2wU7knFHkC094p0SyzoOEpgsB8Z7g4tTR07UQAIDhiEpi2Bp6By",
    rewardPoints: 11,
  },
];

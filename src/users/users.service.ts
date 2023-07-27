import bcrypt from "bcrypt";
import db from "../db";


export const getAll = () => db.users
.map((user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
}));


export const getById = (id: string) => db.users
.find((u) => u.id === parseInt(id));


export const getByUsername = (username: string) => db.users
.find((u) => u.username === username);


export const create = async (username: string, email: string, name: string, password: string) => {
  const user = db.users.find((u) => u.username === username);
  
  if (user) {
    return "user already exists";
  }

  const hash = await bcrypt.hash(password, 12);

  const newUser = {
    id: db.users.length + 1,
    username: username,
    name: name,
    email: email,
    spent: 0,
    password: hash,
    rewardPoints: 0,
  };

  db.users.push(newUser);
  return "ok";
}


export const update = (id: string, name: string, email: string) => {
  const user = getById(id);

  if (!user) {
    return undefined
  }

  user.name = name;
  user.email = email;

  return user;
}


export const remove = (id: string) => {
  const newUsers = db.users.filter(((u) => u.id !== parseInt(id)));
  db.users = newUsers;
}


export const addRewardPoints = (id: number, rewardPoints: number) => {
  const user = getById(id.toString());

  if(!user) {
    throw new Error(`User ID ${id} does not exist`);
  }

  user.rewardPoints += rewardPoints;
}
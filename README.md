# Store Project

### Contributing

Pull Request title convention: `issue(#[NUM ISSUE]: [short description])`

## SAMPLES

### /users

```sh
# GET ALL
$ curl 'http://localhost:3000/users' --silent | jq

# GET ONE
$ curl 'http://localhost:3000/users/1' --silent | jq

# POST
$ curl 'http://localhost:3000/users' \
  --silent \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{"username": "cid", "name": "Cid", "email": "cid@gmail.com", "password": "333"}' \
  --verbose

# PUT
$ curl 'http://localhost:3000/users/64c42d28c9b75bca5b8810d7' \
  --silent \
  --request PUT \
  --header "Content-Type: application/json" \
  --data '{"name": "Ded", "email": "deb@gmail.com"}' \
  --verbose

# DELETE
$ curl 'http://localhost:3000/users/7' \
  --silent \
  --request DELETE \
  --verbose \

```

### /orders

```sh

# POST
$ curl 'http://localhost:3000/orders' \
  --silent \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{"userId": "1", "products": [{ "id": 1, "name": "Macbook Pro", "category": "tech", "price": 3000, "image": "no-image" }]}' \
  --verbose

# PUT
$ curl 'http://localhost:3000/orders/HJtWOz4Ktw' \
  --silent \
  --request PUT \
  --header "Content-Type: application/json" \
  --data '{"status": "delivered"}' \
  --verbose

```

### /products

```sh

# GET ALL
$ curl 'http://localhost:3000/products' --silent | jq
$ curl 'http://localhost:3000/products?cat=tech' --silent | jq

# GET ONE
$ curl 'http://localhost:3000/products/1' --silent | jq

# GET bestsellers
$ curl 'http://localhost:3000/products/bestsellers' --silent | jq
$ curl 'http://localhost:3000/products/bestsellers?top=1' --silent | jq

# POST
$ curl 'http://localhost:3000/products' \
  --silent \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{"name": "potato", "category": "vegetable", "price": 2.50, "image": "no-image"}' \
  --verbose

# PUT
$ curl 'http://localhost:3000/products/1' \
  --silent \
  --request PUT \
  --header "Content-Type: application/json" \
  --data '{"name": "POTATO", "category": "vegetable", "price": 2.50, "image": "no-image"}' \
  --verbose

# DELETE
$ curl 'http://localhost:3000/products/1' \
  --silent \
  --request DELETE \
  --verbose \

```

### /animals

```sh
# GET ALL
$ curl 'http://localhost:3000/animals' --silent | jq

# GET ONE
$ curl 'http://localhost:3000/animals/64c7fc5c4196f05982ed9d3d' --silent | jq

# POST
# ATTENTION: "height" and "weight" is in cm and kg respectively
$ curl 'http://localhost:3000/animals' \
  --silent \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{"name": "Macaw", "specie": "birds", "height": 50, "weight": 1.5}' \
  --verbose

# PUT
# ATTENTION: "height" and "weight" is in cm and kg respectively
$ curl 'http://localhost:3000/animals/64c7fc954196f05982ed9d3e' \
  --silent \
  --request PUT \
  --header "Content-Type: application/json" \
  --data '{"name": "Macaw", "specie": "birds", "height": 42, "weight": 3}' \
  --verbose

# DELETE
$ curl 'http://localhost:3000/animals/64c69fc0a9bce7e53032d9ac' \
  --silent \
  --request DELETE \
  --verbose \

```

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

```sh
### Books

# POST
curl 'http://localhost:9000/books' \
  --silent \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{"isbn": "9781484201886", "name": "Beginning Node.js", "author": "Basarat Syed", "pages": "308"}' \
  --verbose

```

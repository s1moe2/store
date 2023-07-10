
const db = {
    orders: [{
        userID: 1,
        products: [{
            id: 1,
            name: "Macbook Pro",
            category: "tech",
            price: 3000,
            image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202206_GEO_PT"
        }],
        price: 3000,
        orderedAt: new Date(2023, 0, 1, 10, 0, 0)
    }],
    users: [{
        id: 1,
        name: "Bill Gates",
        email: "bg@ms.x",
        spent: 3000,
    }],
    products: [{
        id: 1,
        name: "Macbook Pro",
        category: "tech",
        price: 3000,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202206_GEO_PT"
    },
    {
        id: 2,
        name: "Macbook dasdadasd",
        category: "tech",
        price: 3000,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202206_GEO_PT"
    }],
}

module.exports = db

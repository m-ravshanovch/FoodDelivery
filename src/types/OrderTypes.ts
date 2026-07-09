export interface createOrder {
    "restaurantId": string,
    "restaurantName": string,
    "currency": string,
    "deliveryAddress": string,
    "customerFullName": string,
    "items": [
        {
            "menuItemId": number,
            "name": string,
            "qty": number,
            "price": number,
            "imgUrl": string
        }
    ]
}

export interface getOrderByCurier {
    "courierId": number,
    "orderId": string,
    "courierName": string,
    "phoneNumber": string
}
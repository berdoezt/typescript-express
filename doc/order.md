# Order API Spec

## Create Order

### Endpoint : POST /orders

Request Header :
```
Authorization : Bearer <jwt_token>
```

Request Body : 
```json
{
    "productId": 1,
    "price": 5000
}
```

Response Body (success) : 
```json
{
    "data": {
        "id": 1
    }
}
```

Response Body (error) :
```json
{
    "error": "some error"
}
```

## Get All Order

### Endpoint : Get /orders

Request Header :
```
Authorization : Bearer <jwt_token>
```

Response Body (success) : 
```json
{
    "data": [
        {
            "id": 1,
            "userId": 1,
            "productId": 1,
            "price": 1000
        },
        {
            "id": 2,
            "userId": 1,
            "productId": 2,
            "price": 2000
        }
    ]
}
```

Response Body (error) :
```json
{
    "error": "some error"
}
```
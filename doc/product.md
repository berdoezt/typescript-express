# Product API Spec

## Get All Products

### Endpoint : GET /products

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
            "name": "iphone",
            "price": 5000
        },
        {
            "id": 2,
            "name": "samsung",
            "price": 6000
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

## Create Product

### Endpoint: POST /products

Request Header :
```
Authorization : Bearer <jwt_token>
```

Request Body : 
```json
{
    "name": "iphone",
    "price": 9000
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
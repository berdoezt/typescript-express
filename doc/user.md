# User API Spec

## Register

### Endpoint POST /users/register

Request Body :
```json
{
    "email": "budi@gmail.com",
    "password": "123456",
    "name": "Budi Salim"
}
```

Response Body (success):
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

## Login

### Endpoint POST /users/login

Request Body :
```json
{
    "email": "budi@gmail.com",
    "password": "123456"
}
```

Response Body (success) :
```json
{
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.he0ErCNloe4J7Id0Ry2SEDg09lKkZkfsRiGsdX_vgEg"
    }
}
```

Response Body (error) :
```json
{
    "error": "some error"
}
```
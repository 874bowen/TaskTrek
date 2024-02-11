# Register Endpoint Documentation

## Endpoint Description

The register endpoint allows users to create a new account by providing their username and password.

- **URL**: `/auth/register`
- **HTTP Method**: POST
- **Content-Type**: application/json

## Request Body

The request body should be a JSON object containing the following fields:

- `username` (string, required): The username chosen by the user.
- `password` (string, required): The password chosen by the user.

Example Request Body:

```json
{
    "username": "example_user",
    "password": "example_password"
}
```

# Welcome to the Cats Dogs and Owners API specification

### Table of Contents
  * [Authentication Endpoints](#authentication-endpoints)  
    * [Login](#Login)  
    * [Logout](#Logout)  
  * [Data Endpoints](#data-endpoints)  
    - [Owners](#owners)  
        - [List Owners](#list-owners)  
        - [Create Owner](#create-owner)  
        - [Update Owner](#update-owner)  
        - [Delete Owner](#delete-owner)  
    - [Cats](#cats)  
        - [List Cats](#list-cats)  
        - [Create Cat](#create-cat)  
        - [Update Cat](#update-cat)  
        - [Delete Cat](#delete-cat)  
    - [Dogs](#dogs)  
        - [List Dogs](#list-dogs)  
        - [Create Dog](#create-dog)  
        - [Update Dog](#update-dog)  
        - [Delete Dog](#delete-dog)  
    - [Allocate Pets](#allocate-pets)
        - [Allocate Cat to Owner](#allocate-cat-to-owner)
        - [Allocate Dog to Owner](#allocate-dog-to-owner)
    - [Remove Pets](#remove-pets)
        - [Remove Cat from Owner](#remove-cat-from-owner)
        - [Remove Dog from Owner](#remove-dog-from-owner)


# Authentication

Authentication to the API is performed by supplying a username and password to the `login` endpoint.
The endpoint will then return an authentication token, both as a Cookie and as an x-api-key.
Supplying the token in either form allows you to access the data sections of the API.

## Authentication endpoints

### Login
* **URI** : `/login`
* **METHODS** : `POST`
* **CONTENT-TYPE**: `JSON`
* **REQUIRED PARAMS**:
    - `username=[string]`
    - `password=[string]`
* **SUCCESS RESPONSE**
    * **CODE**: 200
    * **TEXT**: `{"x-api-key":`*`"<auth token>"`*`}`
* **FAILURE RESPONSE**
    * **CODE**: 403
    * **TEXT**: `{"error": "Incorrect Username or Password"}`
* **SAMPLE CALL**  
`curl ${SERVER}/login -H 'Content-Type: application/json -d {"username": ${USER}, "password": ${PASSWORD} }`

### Logout
* **URI** : `/logout`
* **METHODS** : `GET` | `POST`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 403
    * **TEXT**: `null`
* **FAILURE RESPONSE**
    * **CODE**: 403
    * **TEXT**: `{"error": "No User logged out"}`
* **SAMPLE CALLS**
  - `curl ${SERVER}/logout -H 'Cookie: ${TOKEN}'`
  - `curl ${SERVER}/logout -H 'x-api-key: ${TOKEN}'`

## Data endpoints

### Owners

#### List Owners
* **URI** : `/owners`
* **METHODS** : `GET`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 200
    * **TEXT**: `[{"id":<owner id>, "name": <owner name>, "pets": [{}, ...]}, ...]`
* **FAILURE RESPONSE**
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`
* **SAMPLE CALL**  
`curl ${SERVER}/owners -H 'x-api-key: ${TOKEN}'`

#### Create Owner
* **URI** : `/owners`
* **METHODS** : `POST`
* **CONTENT-TYPE**: `JSON`
* **REQUIRED PARAMS**:
    - `name=[string]`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 201
    * **TEXT**: `{"id": <new id>}`
* **FAILURE RESPONSE**
    * **CODE**: 400
    * **TEXT**: `{"error": "Names must be alphanumeric"}`  
    OR  
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`  
    OR  
    * **CODE**: 409
    * **TEXT**: `{"error": "Name exists"}`  
* **SAMPLE CALL**  
`curl ${SERVER}/owners -H 'x-api-key: ${TOKEN}' -H 'Content-Type: application/json -d {"name": ${NAME} }`

#### Update Owner
* **URI** : `/owners/<int:owner id>`
* **METHODS** : `PUT`
* **CONTENT-TYPE**: `JSON`
* **REQUIRED PARAMS**:
    - `name=[string]`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 201
    * **TEXT**: `null`
* **FAILURE RESPONSE**
    * **CODE**: 400
    * **TEXT**: `{"error": "Names must be alphanumeric"}`  
    OR  
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`  
    OR  
    * **CODE**: 404
    * **TEXT**: `{"error": "Not Found"}`  
    OR  
    * **CODE**: 409
    * **TEXT**: `{"error": "Name exists"}`  
* **SAMPLE CALL**  
`curl ${SERVER}/owners/${OWNER ID} -X PUT -H 'x-api-key: ${TOKEN}' -H 'Content-Type: application/json -d {"name": ${NAME} }`

#### Delete Owner
* **URI** : `/owners/<int:owner id>`
* **METHODS** : `DELETE`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 201
    * **TEXT**: `null`
* **FAILURE RESPONSE**
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`  
    OR  
    * **CODE**: 404
    * **TEXT**: `{"error": "Not Found"}`
* **SAMPLE CALL**  
`curl ${SERVER}/owners/${OWNER ID} -X DELETE -H 'x-api-key: ${TOKEN}'`

### Cats

#### List Cats
* **URI** : `/cats`
* **METHODS** : `GET`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 200
    * **TEXT**: `[{"id":<cat id>, "name": <cat name>, "owner": <owner id>}, ...]`
* **FAILURE RESPONSE**
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`
* **SAMPLE CALL**  
`curl ${SERVER}/cats -H 'x-api-key: ${TOKEN}'`

#### Create Cat
* **URI** : `/cats`
* **METHODS** : `POST`
* **CONTENT-TYPE**: `JSON`
* **REQUIRED PARAMS**:
    - `name=[string]`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 201
    * **TEXT**: `{"id": <new id>}`
* **FAILURE RESPONSE**
    * **CODE**: 400
    * **TEXT**: `{"error": "Names must be alphanumeric"}`  
    OR  
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`  
    OR  
    * **CODE**: 409
    * **TEXT**: `{"error": "Name exists"}`  
* **SAMPLE CALL**  
`curl ${SERVER}/cats -H 'x-api-key: ${TOKEN}' -H 'Content-Type: application/json -d {"name": ${NAME} }`

#### Update Cat
* **URI** : `/cats/<int:cat id>`
* **METHODS** : `PUT`
* **CONTENT-TYPE**: `JSON`
* **REQUIRED PARAMS**:
    - `name=[string]`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 201
    * **TEXT**: `null`
* **FAILURE RESPONSE**
    * **CODE**: 400
    * **TEXT**: `{"error": "Names must be alphanumeric"}`  
    OR  
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`  
    OR  
    * **CODE**: 404
    * **TEXT**: `{"error": "Not Found"}`  
    OR  
    * **CODE**: 409
    * **TEXT**: `{"error": "Name exists"}`  
* **SAMPLE CALL**  
`curl ${SERVER}/cats/${CAT ID} -X PUT -H 'x-api-key: ${TOKEN}' -H 'Content-Type: application/json -d {"name": ${NAME} }`

#### Delete Cat
* **URI** : `/cats/<int:cat id>`
* **METHODS** : `DELETE`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 201
    * **TEXT**: `null`
* **FAILURE RESPONSE**
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`  
    OR  
    * **CODE**: 404
    * **TEXT**: `{"error": "Not Found"}`
* **SAMPLE CALL**  
`curl ${SERVER}/cats/${CAT ID} -X DELETE -H 'x-api-key: ${TOKEN}'`

### Dogs

#### List Dogs
* **URI** : `/dogs`
* **METHODS** : `GET`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 200
    * **TEXT**: `[{"id":<dog id>, "name": <dog name>, "owner": <owner id>}, ...]`
* **FAILURE RESPONSE**
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`
* **SAMPLE CALL**  
`curl ${SERVER}/dogs -H 'x-api-key: ${TOKEN}'`

#### Create Dog
* **URI** : `/dogs`
* **METHODS** : `POST`
* **CONTENT-TYPE**: `JSON`
* **REQUIRED PARAMS**:
    - `name=[string]`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 201
    * **TEXT**: `{"id": <new id>}`
* **FAILURE RESPONSE**
    * **CODE**: 400
    * **TEXT**: `{"error": "Names must be alphanumeric"}`  
    OR  
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`  
    OR  
    * **CODE**: 409
    * **TEXT**: `{"error": "Name exists"}`  
* **SAMPLE CALL**  
`curl ${SERVER}/dogs -H 'x-api-key: ${TOKEN}' -H 'Content-Type: application/json -d {"name": ${NAME} }`

#### Update Dog
* **URI** : `/dogs/<int:dog id>`
* **METHODS** : `PUT`
* **CONTENT-TYPE**: `JSON`
* **REQUIRED PARAMS**:
    - `name=[string]`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 201
    * **TEXT**: `null`
* **FAILURE RESPONSE**
    * **CODE**: 400
    * **TEXT**: `{"error": "Names must be alphanumeric"}`  
    OR  
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`  
    OR  
    * **CODE**: 404
    * **TEXT**: `{"error": "Not Found"}`  
    OR  
    * **CODE**: 409
    * **TEXT**: `{"error": "Name exists"}`  
* **SAMPLE CALL**  
`curl ${SERVER}/dogs/${DOG ID} -X PUT -H 'x-api-key: ${TOKEN}' -H 'Content-Type: application/json -d {"name": ${NAME} }`

#### Delete Dog
* **URI** : `/dogs/<int:dog id>`
* **METHODS** : `DELETE`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 201
    * **TEXT**: `null`
* **FAILURE RESPONSE**
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`  
    OR  
    * **CODE**: 404
    * **TEXT**: `{"error": "Not Found"}`
* **SAMPLE CALL**  
`curl ${SERVER}/dogs/${DOG ID} -X DELETE -H 'x-api-key: ${TOKEN}'`

### Allocate Pets

#### Allocate Cat to Owner
* **URI** : `/owner/<int:owner id>/pet/<int:cat id>`
* **METHODS** : `POST`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 201
    * **TEXT**: `null`
* **FAILURE RESPONSE**
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`  
    OR  
    * **CODE**: 404
    * **TEXT**: `{"error": "Owner or Pet not found"}`  
* **SAMPLE CALL**  
`curl ${SERVER}/owner/${OWNER ID}/pet/${CAT ID} -H 'x-api-key: ${TOKEN}'`

#### Allocate Dog to Owner
* **URI** : `/owner/<int:owner id>/pet/<int:dog id>`
* **METHODS** : `POST`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 201
    * **TEXT**: `null`
* **FAILURE RESPONSE**
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`  
    OR  
    * **CODE**: 404
    * **TEXT**: `{"error": "Owner or Pet not found"}`  
* **SAMPLE CALL**  
`curl ${SERVER}/owner/${OWNER ID}/pet/${DOG ID} -H 'x-api-key: ${TOKEN}'`

### Remove Pets

#### Remove Cat from Owner
* **URI** : `/owner/<int:owner id>/pet/<int:cat id>`
* **METHODS** : `DELETE`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 201
    * **TEXT**: `null`
* **FAILURE RESPONSE**
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`  
    OR  
    * **CODE**: 404
    * **TEXT**: `{"error": "Not Found"}`
* **SAMPLE CALL**  
`curl ${SERVER}/owner/${OWNER ID}/pet/${CAT ID} -X DELETE -H 'x-api-key: ${TOKEN}'`

#### Remove Dog from Owner
* **URI** : `/owner/<int:owner id>/pet/<int:dog id>`
* **METHODS** : `DELETE`
* **REQUIRED HEADERS**:
    - `Cookie: <auth token>`  
    OR
    - `x-api-key: <auth token>`
* **SUCCESS RESPONSE**
    * **CODE**: 201
    * **TEXT**: `null`
* **FAILURE RESPONSE**
    * **CODE**: 403
    * **TEXT**: `{"error": "Unauthorised"}`  
    OR  
    * **CODE**: 404
    * **TEXT**: `{"error": "Not Found"}`
* **SAMPLE CALL**  
`curl ${SERVER}/owner/${OWNER ID}/pet/${DOG ID} -X DELETE -H 'x-api-key: ${TOKEN}'`

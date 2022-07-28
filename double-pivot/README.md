# Double Pivot Magazine Web Service

## Description
Blog Engine Web Apps, with implements feature like : 
- Create new articles
- Read all articles
- Read existing articles based on ID
- Update own articles based on User Profile
- Delete articles
- Role Management
- Authentication (Login, Register, Change Password) using JSON Web Token & Spring Security

# Swagger UI
http://localhost:8082/swagger-ui/

### Example Request

# GET /categories
$ curl http://localhost:8082/categories
## Usage

Base URL : `http://localhost:8080/`

### Endpoint

| Endpoint             | Description                                 | Parameter  | Method |
| -----------------    | ------------------------------------------- | ---------  | ------ |
| `/categories`        | Find All Categories                         | No         | GET    |
| `/categories`        | Create New Categories                       | No         | POST   |
| `/categories/{{id}}` | Find Category By ID                         | Yes        | GET    |
| `/categories/{{id}}` | Delete Category By ID                       | Yes        | DELETE |



#### Request

```curl
curl -XGET 'http://localhost:8082/categories'
```

#### Response

```json
      {
          "data": [
              {
                  "id": "30e9944d-6bce-4f7f-b5f2-01755478326a",
                  "name": "Articles"
              }
          ],
          "messages": "Successfully retrieved data!",
          "status": 200
      }
```

#### Error Response
```json
     {
         "timestamp": "2022-03-28T04:49:27.954+00:00",
         "status": 404,
         "error": "Not Found",
         "message": "No message available",
         "path": "/categoried"
     }
```
OR

* **Code:** 401 UNAUTHORIZED <br />
**Content:** `{ error : "You are unauthorized to make this request." }`


* **Sample Call:**

  ```typescript:
      findAllCategories(): Observable<Category[]> {
        return this.http.get<any>(environment.baseEndpoint + 'api/categories');
      }
  ```

## Additional Information
How to run this application?
- Install MYSQL
- Install Java version 11
- Install Maven
- In Terminal :
  - mvn clean install
  - mvn spring-boot:run



# Project Name
Local Farm Website

## Description

A webpage to connect the people with a local farm. To find fresh products from a farm nearby.
You can sign up as a farmer(seller) or as a costumer. 
You can order the products at your local farm.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the farms selling products
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
-**Sign up Farmer/Seller** 
-**Search Page**


## Backlog

Oder Placement
Chat Function


## ROUTES:

app.js
farmermodel.js 
customermodel.js
layout.hbs
home.hbs
signin.hbs
signup.hbs
searchpage.hbs
farmer.hbs
customer.hbs
customersearch.hbs
order.hbs

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)


## Models

Farmer model
 
```
email: String
username: String
password: String
```

Customer model
 
```
email: String
username: String
password: String
```

Products model

```
type: String (Vegetable/Meat)
name: String
AvailQuantity: Number
Price: Number
``` 


### Git

The url to your repository and to your deployed project

### Slides

The url to your presentation slides


Description Local Farm
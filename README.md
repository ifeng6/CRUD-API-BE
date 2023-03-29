# CRUD-API-BE-Exercise
BE Exercise to practice building a CRUD API 

This is an API where users need to register and then login to be able to view to-do items.
The user may view all items or a specific item, create items, but only the owner of an item may modify or delete an item.
Users may also search to-do items by different filters and keywords (case sensitive).

## Technologies used  
Node.js  
Express  
MongoDB   

## Routes
```
GET    @ /api                    - homepage  
  
GET    @ /api/users              - read all registered usernames  
POST   @ /api/users/register     - register with username and password  
POST   @ /api/users/login        - login using username and password  
GET    @ /api/users/current      - returns the username of the logged in user  
  
GET    @ /api/items              - read all to-do items  
POST   @ /api/items              - create to-do item  
GET    @ /api/items/find/:filter - filter fields of to-do items for a search term  
GET    @ /api/items/:id          - retrieve a to-do item based on ID  
DELETE @ /api/items/:id          - delete a to-do item based on ID  
PATCH  @ /api/items/:id          - update a to-do item based on ID  
```

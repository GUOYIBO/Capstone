
## About The Project

[My Pantryfridge](https://mypantryfridge.herokuapp.com/) is web application inspired by [UberEats](https://www.ubereats.com/) on styling. It is a management system allowing users to manage pantry and fridge items.


### Project Wiki
* [API Documentation](https://github.com/GUOYIBO/Capstone/wiki/API-Document)
* [Database Schema](https://github.com/GUOYIBO/Capstone/wiki/Database-Schema)
* [Features List](https://github.com/GUOYIBO/Capstone/wiki/Feature-List)
* [User Stories](https://github.com/GUOYIBO/Capstone/wiki/User-Stories)


### Tech Stack
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)


![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)




## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/GUOYIBO/Capstone/
   ```

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


# Features

## Splash Page

<img width="1939" alt="Screen Shot 2022-11-07 at 3 34 13 AM" src="https://user-images.githubusercontent.com/11731514/200320745-c837858f-15ce-4e09-9eaf-0700c7988a15.png">

## Sign up
<img width="1748" alt="Screen Shot 2022-11-07 at 5 22 50 AM" src="https://user-images.githubusercontent.com/11731514/200321331-9f05c22c-b681-4d91-ab9f-931d2b60b4d3.png">

## Log In
<img width="1698" alt="Screen Shot 2022-11-07 at 5 23 16 AM" src="https://user-images.githubusercontent.com/11731514/200321422-62e50f9d-3ad2-4406-9298-3ca1a3b445a5.png">

## Create/Read/Update/Delete categories

<img width="1926" alt="Screen Shot 2022-11-07 at 4 54 52 AM" src="https://user-images.githubusercontent.com/11731514/200321824-51aca673-8880-4078-a850-6a22a75de887.png">
<img width="1929" alt="Screen Shot 2022-11-07 at 3 50 01 AM" src="https://user-images.githubusercontent.com/11731514/200321914-9ef71c2f-c043-4c22-8ef0-2c3bdbe22915.png">

## Create/Read/Update/Delete user items
<img width="1925" alt="Screen Shot 2022-11-07 at 4 55 30 AM" src="https://user-images.githubusercontent.com/11731514/200322141-bca66ec6-85ed-4285-9f3a-8ba5b9a2e5d3.png">
<img width="1921" alt="Screen Shot 2022-11-07 at 4 55 44 AM" src="https://user-images.githubusercontent.com/11731514/200322222-d983d878-4c3d-4289-932d-8796a812ed60.png">

There are two more features CRUD on favorite dishes and purchase list. Bonus features Searching and Deployment with AWS are being implemented.

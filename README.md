
# Stream line News App

A clone made to make the news reading habit easy by scraping the news from the https://news.ycombinator.com/ 


## Features
1) Each news item will have the following fields - url, hacker news url, posted on, upvotes and comments. 

2) A script which crawls the first three pages, extracts the news items and adds in the database. If the news item already exists, it updates the upvote and comment counts.

3) A user can signup or login to the dashboard
A dashboard where all news items are listed in reverse chronological order.

4) A user can mark a news item as read or delete it. Deleted items are not shown in his/her panel but are not deleted from the database.
## Technologies Used
Frontend:React, vite(build tool), clerk(oauth).

Backend:NodeJs, ExpressJs.

Database:Mongodb


## Installation
Step 1:
     
     Clone the repo

Step 2: 
        
        i)cd backend
        ii)npm install 
        iii)npm run server

Step 3:
        
        i)cd frontend
        ii)npm install 
        iii)npm run dev
         
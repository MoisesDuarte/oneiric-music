# OneiricMusic
MEVN Stack Music Manager and Player

## Description
A very simple music manager for listing and playing audio files in the browser, for studying purposes.

## Technologies
- **Frontend:** NuxtJS
- **Backend:** NodeJs + Express
- **Database:** MongoDb

# Server Side
## Setup
- Change database string and secret in **server/config/db** to your local database 
- $ npm install
- $ npm start

## Routes
| Description      | Route          | Method | Body                                              |
|------------------|----------------|--------|---------------------------------------------------|
| Fetch All Musics | /music         | GET    |                                                   |
| Add New Music    | /music         | POST   | "title": String, "artist": String,  "music": File |
| Delete Music     | /music:musicId | DELETE |                                                   |

# Client Side
- $ npm install
- $ npm run dev

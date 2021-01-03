# OneiricMusic
MEVN Stack Music Manager

# Server Side
## Setup
- Change database string and secret in **server/config/db** to your local database 
- npm install
- npm start

## Routes
| Description      | Route          | Method | Body                                              |
|------------------|----------------|--------|---------------------------------------------------|
| Fetch All Musics | /music         | GET    |                                                   |
| Add New Music    | /music         | POST   | "title": String, "artist": String,  "music": File |
| Delete Music     | /music:musicId | DELETE |                                                   |

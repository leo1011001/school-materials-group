# school-materials-group
project how-to

1. Open the backend in an integrated terminal (cd) and run the following cmds
- cd backend
- npm install  # sometimes necessary to make sure the deps are all in place and installed
- npm run dev

2. Open the frontend in a seperate integrated terminal (cd) and run the following cmds
- cd frontend
- npm install  # same goes for this
- npm run dev

Everything should run just normal, if when you run the backend it does not show you after the connection that MongoDB has established the connection, check if the .env file is in place (..\school-materials\backend\.env). If not, then it needs to be created and handled by an admin. 

The project is used to execute certain requests for school materials such as an ex. request of 100 pcs pencils, 40 boxes crayon, etc and a description of the request which will also be sent to the db structured as supposed to, which will then be administered and handled by an admin role account, of which currently there is the following with the following credentials...
- email: admin@school.com
- password: admin123

From there the given request has the following statuses, initially "pending" then for when it's in stages of being processes, it either goes to "approved", "rejected" or "completed".
- Only the admins can change a given request status!!!

test_user credentials...
- email: leonstanev12@gmail.com
- password: 1234567890
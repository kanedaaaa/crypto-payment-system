# PayDay

**Easy way to send crypto payments**

## How should it be used

This server should be hosted on AWS or Heroku (or any cloud server provider), then with API
can be connected to frontend admin dashboard (not yet ready). 

## How does it works

Basically, payday is using Hasura as backend database to store receivers info 
`address -> amount to send`. This can be replaced with simple Json or text file,
that will be fed into `main.ts`, but only when server is launched locally. 

Then, we have an API exposed with `/payday` endpoint, that will call the distributor
function. Any error with address and amount will be logged in `errors/failedtosend.txt`

## Development

I will prolly add more features, such as automatic payment system, more failsafes, statistics,
better error logging, etc. Basically it's still under heavy development.

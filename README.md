
Detta repo innehåller kod för den webbtjänst jag skapat för lab3 i kursen dt207g. API:et presenterar mina tidigare arbetserfarenheter.


Länken till api:

https://dt207g-lab2-webbtj.onrender.com](https://lab3-dt207g-webbtj.onrender.com/works

API:et använder databasen mongoDB. 

Schemat föjer följande struktur:

companyname: String


jobtitle: String


location: String


startdate: Date


enddate: Date


description: String





Här är länkar som kan användas för att nå API:

    GET /works (alla arbeten i API)
    GET /works/id (specifikt arbete utifrån id)
    POST /works (lägger till arbete i API. Arbets-object måste skickas med i body)
    PUT /works/id (uppdaterar redan existerande arbete utifrån id. Arbets-object måste skickas med i body)
    DELETE /works/id (raderar redan existerade arbete utifrån id.)

    Ett arbets-ocject har följande sturktur:

    {
    "_id": "69f207472c5919cf9a080ae5",
    "companyname": "Test",
    "jobtitle": "Test",
    "location": "Stockholm",
    "startdate": "2024-01-01T00:00:00.000Z",
    "enddate": "2024-06-01T00:00:00.000Z",
    "description": "Test",
    "__v": 0
  }

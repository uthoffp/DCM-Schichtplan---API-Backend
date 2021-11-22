# **DCM Schichtplan - API**
API Interface to provide Data for mobile versions of the CiF DCM Personalmanager.

## Development Setup
### Install NodeJs
**MacOs / Windows:**
[Download](https://nodejs.org/en/download/ "Download")

**Linux:**
```
sudo apt install nodejs
sudo apt install npm
```
### Project Setup
#### Database
Install MsSQL Server [here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads?SilentAuth=1&wa=wsignin1.0 "here").

Import Database DDL:
```
sqlcmd -S SERVERNAME\INSTANCE_NAME -i ddl.sql -o C:\path\output_file.txt
```
If you are unable to connect to your local database follow [this](https://www.jetbrains.com/help/datagrip/db-tutorial-connecting-to-ms-sql-server.html "this") guide.

#### .env file
Copy the .env.example file and rename it to .env and replace the default values for the following parameter with the correct ones for your local setup:
- APP_PORT
- ACCESS_TOKEN_SECRET
- DB_HOST
- DB_USERNAME
- DB_PASSWORD

#### Node
Install required Node packages
```
npm install
```

### Run Development Server
To start the development Server run the following command:
```bash
node ./server.js
```


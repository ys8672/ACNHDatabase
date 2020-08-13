# ACNHDatabase

## Overview
This is all the code for www.acnhdatabase.me on GitHub. The app folder contains all the back-end code, while src has all the front-end code.
All the instructions below are done on Git Bash on my Windows 10 machine. I do not know the instructions if you use a Mac or Linux, and I am sorry for the inconvienence.
Of course, there are folders like node_modules I have told Git to ignore. You will have to make sure those are there to successfully run the program.


### Clone git repository
Clone the project onto your local machine:

```bash
git clone https://github.com/shengye000/ACNHDatabase.git
```

Enter project folder ACNHDatabase:
```bash
cd ACNHDatabase
```
### Setup virtual environment
If not installed:
```bash
pip install virtualenv
```

In the project folder ACNHDatabase:
```bash
virtualenv venv
```

Activate/deactivate virtual environment
```bash
. venv/Scripts/activate
(venv)
$
```

Install flask in virtual environment
```bash
(venv) 
$ pip install flask 
```

Install Flask-SQLAlchemy
```bash
(venv) 
$ pip install Flask-SQLAlchemy
```

Install psycopg2
```bash
(venv) 
$ pip install psycopg2-binary
```

Deactivate:
```bash
(venv) 
$ deactivate
```

### Install Node JS Stuff (if not installed)
Refer to https://nodejs.org/en/ to install nodejs. Download and install 12.18.1 LTS.

## Install create-react-app
```bash
npm install -g create-react-app
```

If in virtual environment (no need for global installation):
```bash
npm install create-react-app
```

## Installing npm packages and running
Install all the npm packages. Go into the ACNHDatabase folder and type:
```bash
npm install
```

### Install Python Requirements
Go into the app folder:
```bash
cd app
```

Run Flask application locally:
```bash
pip install -r requirements.txt 
```

Go back to ACNHDatabase:
```bash
cd ..
```

## Running the application
Note: you will need 2 Git Bash.

### Git Bash 1 (Database and Back-End):
Open PostGreSQL:
```bash
psql -U postgres -h localhost
```

```
Password for user postgres: password
```

Create a database:
```
postgres=# CREATE DATABASE acnh;
```

Connect to database to see it works:
```
postgres=# \c acnh
```

Quit PostGreSQL:
```
postgres=# \q
```

Create the Database and put into PostGreSQL Database:
```bash
python create_db.py
```

Run The Flask application:
```bash
python main.py
```

### Git Bash 2(Front-End):
Run the Front-End:
```bash
npm start
```

Or you can do:
```bash
npm run-script build && serve -s build
```

If you got an error in the last command, do:
```bash
npm install -g serve
```







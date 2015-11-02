# kitten
A basic template project that can be used for any web application.
Installation Instructions:

Install Necessary Packages for Linux:

sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install -y mongodb-org

Install Necessary Packages for Mac OS:

brew install nodejs
brew install npm
brew install mongodb

Install NodeJS Packages

npm install


Create Environment Variables

cp .template.env .env

Don't forget to edit .env to the appropriate configs

Run Application:
node server.js

then go to(to be changed):
http://localhost:8000/public/test?query=test

# kitten
A basic template project that can be used to build any simple web application.

##Installation Instructions:##

###Install Necessary Packages for Linux:###
```
This installs n for easy nodejs management (includes npm):

curl -L http://git.io/n-install | bash

Or, install nodejs and npm directly:

sudo apt-get install nodejs
sudo apt-get install npm

Note: Install Ruby before doing the following steps

sudo gem install listen
sudo gem install sass
```

###Install Necessary Packages for Mac OS:###
```
This installs n for easy nodejs management (includes npm):

curl -L http://git.io/n-install | bash

Or, install nodejs and npm directly:

brew install nodejs
brew install npm

sudo gem install listen
sudo gem install sass
```

##Create Environment Variables##
```
cp .template.env .env
```

Don't forget to edit .env to the appropriate configs

##Setup Dev Tools##
Note: This is required for production as well.
```
npm install --global browserify watchify exorcist
```

##Run Application: Development##
Note: This must be running in order to watch for css and js changes.
```
./runserver.sh dev
OR
npm run dev
```

Then go to:
```
http://localhost:8000/
```

##Run Application: Production##
```
./runserver.sh
OR
npm start
```

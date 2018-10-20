# The Node version that we'll be running for our version of React.
# You may have to search the Node directory for a version that fits
# the version of React you're using.
#FROM node:8.9-alpine

# Create a work directory and copy over our dependency manifest files.
#RUN mkdir /app
#WORKDIR /app
#COPY /src /app/src
#COPY ["package.json", "package-lock.json*", "./"]

# If you're using yarn:
#  yarn build
#RUN npm install --production --silent && mv node_modules ../

# Expose PORT 3000 on our virtual machine so we can run our server
#EXPOSE 3000

# Use an official node runtime as a parent image
FROM node:10

# Set the working directory to /home/app
#WORKDIR /home/app/

# Bundle app source
COPY . /home/app/

# If you are building your code for production
# RUN npm install --only=production
RUN npm install

# Make port 8000 available to the world outside this container
EXPOSE 3000

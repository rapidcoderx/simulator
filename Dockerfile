# Use the official Node.js 14 runtime as the base image
FROM node:16-alpine

# Workaround for sharp libvips compatibility issue
RUN apk add --no-cache build-base gcc autoconf automake libtool zlib-dev

# Create working directory
WORKDIR /app

# Install app dependencies by copying package related files
# The wildcard is used to ensure both package.json AND package-lock.json are considered
COPY package*.json ./

# Install all dependencies listed in package.json file
RUN npm install

# Bundle app source by copying all remaining
COPY . .

# Open and expose port 8080 for the server communication
EXPOSE 8080

# Run the script specified in package.json when the docker container starts
CMD [ "npm", "start" ]
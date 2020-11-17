FROM node:12.18.1-alpine
RUN mkdir ./app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
CMD ["npm", "start"]

# docker build -t docker-react .
# docker run -it -v ${PWD}:/usr/src -v /usr/src/node_modules -p 3000:3000 --rm -d docker-react

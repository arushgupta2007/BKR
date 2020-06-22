FROM node

WORKDIR /usr/bkr_website

COPY ./package.json ./

RUN ping registry.npmjs.org

RUN npm install

COPY ./ ./

CMD [ "npm", "start" ]

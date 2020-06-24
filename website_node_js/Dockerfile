FROM node

WORKDIR /usr/bkr_website

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "start" ]

FROM node

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# COPY package.json /app/package.json
# COPY ./package.json /app/package.json
COPY . /app

# RUN npm install --silient --prod

CMD ["node", "build/index.js"]
# FROM node:carbon-alpine

# RUN mkdir /app
# WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

# # COPY package.json /app/package.json
# # COPY ./package.json /app/package.json
# COPY . /app

# # RUN npm install --silient --prod

# CMD ["node", "build/index.js"]


FROM node:carbon-alpine

RUN apk add git 

WORKDIR /wuweits

cmd git clone https://github.com/yongwangd/wuweits && \
    cd /wuweits && \
    npm install --silient --prod && \
    node build/index.js



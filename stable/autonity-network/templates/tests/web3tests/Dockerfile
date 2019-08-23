FROM node:10.16.3-alpine

# Build
# docker build -t web3tests .

# Run and connect to ssh-forvarded network
#export NODE_EXTRA_CA_CERTS=[your CA certificate file path]

# docker run -v $(pwd)"/files/tls.crt":"/tls.crt" --network="host" -ti -e NODE_EXTRA_CA_CERTS='/tls.crt' --add-host=test.autonity.online:127.0.0.1 web3tests

# build environment
RUN apk add --virtual build-dependencies \
        build-base \
        git \
        python

RUN mkdir -p /web3tests
COPY package.json index.js web3tests/
WORKDIR /web3tests

RUN npm install

CMD ["npm", "start"]
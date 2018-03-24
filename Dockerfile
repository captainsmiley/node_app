FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
curl

RUN curl -sL https://deb.nodesource.com/setup_8.x | /bin/bash
RUN apt-get install -y nodejs

RUN apt-get update && \
apt-get -qy install \
 nmap

#RUN npm --silent install express --save
#RUN npm --silent install body-parser --save
#RUN npm --silent install cookie-parser --save
#RUN npm --silent install multer --save

RUN ["mkdir", "/dep"]

COPY ./app/package*.json /dep
WORKDIR /dep
RUN npm install
#ENV PATH /dep/node_modules/.bin:$PATH
ENV NODE_PATH=/dep/node_modules
ADD ./app /app

WORKDIR /app

 RUN npm install supervisor -g


#COPY . /app

EXPOSE 3000

#CMD [ "npm", "start" ]
#CMD ["/bin/sh"]

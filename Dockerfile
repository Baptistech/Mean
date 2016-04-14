FROM node:0.12.13

RUN apt-get update -qq && apt-get install -y build-essential
RUN apt-get install -y ruby
RUN gem install sass

ENV NODE_ENV development

RUN groupadd mean --gid 1000
RUN useradd mean --uid 1000 --gid 1000 --create-home --home /home/mean --shell /bin/bash
RUN git config --global url."https://".insteadOf git://
RUN npm install -g yo bower gulp mocha grunt generator-meanjs
USER mean
WORKDIR /home/mean
CMD /bin/bash

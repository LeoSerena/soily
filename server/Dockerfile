FROM node:16-alpine 

RUN mkdir /server
WORKDIR /server
COPY ./ ./
RUN yarn install
ENV NODE_ENV production
EXPOSE 3001
CMD ["yarn", "start-api"]
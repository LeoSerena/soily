FROM node:16-alpine

RUN mkdir /realtime
WORKDIR /realtime
COPY ./ ./
RUN yarn install
ENV NODE_ENV production
EXPOSE 3002
CMD ["yarn", "start-realtime"]
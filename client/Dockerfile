FROM node:16-alpine AS BUILD_IMAGE

RUN mkdir /app
WORKDIR /app
COPY ./ ./
RUN yarn install
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --production

FROM node:16-alpine
ENV NODE_ENV production
RUN addgroup -g 1001 -S user_group
RUN adduser -S application -u 1001
RUN mkdir /app
WORKDIR /app
COPY --from=BUILD_IMAGE --chown=application:user_group /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE --chown=application:user_group /app/package.json ./
COPY --from=BUILD_IMAGE --chown=application:user_group /app/yarn.lock ./
COPY --from=BUILD_IMAGE --chown=application:user_group /app/.env.local ./
COPY --from=BUILD_IMAGE --chown=application:user_group /app/.next ./.next
EXPOSE 3000
CMD ["yarn", "start"]
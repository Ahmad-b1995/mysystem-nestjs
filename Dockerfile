###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:21-alpine As development
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 1000000 -ddd
COPY . .

###################
# BUILD FOR PRODUCTION
###################

FROM node:21-alpine As build
WORKDIR /app
COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN yarn run build
ENV NODE_ENV production
RUN yarn --omit=dev --ddd && yarn cache clean --force
USER node

###################
# PRODUCTION
###################

FROM node:21-alpine As production
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
CMD [ "node", "dist/main.js" ]
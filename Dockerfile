###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:21-alpine AS development
LABEL stage=development \
      description="Local development environment"
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN yarn install --frozen-lockfile --network-timeout 1000000 -ddd
COPY . .

###################
# BUILD FOR PRODUCTION
###################

FROM node:21-alpine AS build
LABEL stage=build \
      description="Production build environment"
WORKDIR /app
COPY --chown=node:node package.json pnpm-lock.yaml ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN yarn run build
ENV NODE_ENV production
RUN yarn --omit=dev --ddd && yarn cache clean --force
USER node

###################
# PRODUCTION
###################

FROM node:21-alpine AS production
LABEL stage=production \
      description="Production environment"
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
CMD ["node", "dist/main.js"]

# # choose base image to build off of
# FROM node:alpine

# # set the current working directory for all commands
# WORKDIR /usr/src/app

# # copy these over first and run 'npm install' so the node_modules will be cached
# # until the package.json / lock changes
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install

# # copy over all code files
# COPY . .

# # expose internal docker container port to external environment
# EXPOSE 4200

# # specify default command to run when we run the image
# CMD /usr/src/app/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck


## Tarea 1 ###
FROM node:12.14.1-alpine as builder

COPY package.json package-lock.json ./

RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN npm run ng build -- --prod --output-path=dist


### Tarea 2 ###

FROM nginx:1.14.1-alpine

COPY nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
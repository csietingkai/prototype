FROM node:12.10.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN npm install -qy && npm install -g serve && npm run build

EXPOSE 3000

# start app
CMD ["serve", "-s", "build", "-l", "3000"]

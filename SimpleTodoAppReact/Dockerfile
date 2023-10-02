# Step 1: Set up the development environment
FROM node:alpine
WORKDIR /app
COPY package.json .
RUN yarn
# copy all files
COPY . .
CMD ["yarn", "dev", "--debug"]
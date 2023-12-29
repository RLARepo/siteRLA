FROM node:alpine

# Defina o diretório de trabalho dentro da imagem
WORKDIR /usr/src/app

# Copie os arquivos necessários para o diretório de trabalho na imagem

COPY views /usr/src/app/views
COPY index.js /usr/src/app/index.js
COPY package-lock.json /usr/src/app/package-lock.json
COPY package.json /usr/src/app/package.json

# Instale as dependências
RUN npm i express && npm i ejs && npm i pg && npm i dotenv && npm i multer

COPY uploads /usr/src/app/uploads
COPY Dockerfile /usr/src/app/Dockerfile

EXPOSE 3000

# Especifique o comando padrão para iniciar sua aplicação
CMD ["npm", "run", "dev"]
# Imagem base do Node.js
FROM node:14-alpine

# Diretório de trabalho
WORKDIR /usr/src/app

# Copia package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Compila o TypeScript
RUN npm run build

# Expõe a porta 3000
EXPOSE 3000

# Inicia a aplicação
CMD [ "npm", "start" ]
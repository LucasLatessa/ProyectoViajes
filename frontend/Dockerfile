# Dockerfile

# Usar una imagen base oficial de Node
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Servir la aplicación
CMD ["npx", "serve", "-s", "build"]

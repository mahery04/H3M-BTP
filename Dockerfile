#Utilisez l'image Node.js officielle comme base
FROM node:14-alpine3.16

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app/frontend

# Copiez le fichier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances du backend
RUN npm install

# Copiez tous les fichiers du backend dans le conteneur
COPY . .

# Commande par défaut pour démarrer le backend
CMD ["npm", "start"]

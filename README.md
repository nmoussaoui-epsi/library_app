# Library App - API de Médiathèque

Une API REST pour gérer une médiathèque avec des utilisateurs, des ressources et des emprunts.

## Technologies utilisées

- **Node.js** avec Express.js
- **PostgreSQL** pour la base de données
- **Swagger** pour la documentation API
- **CORS** pour les requêtes cross-origin

## Prérequis

- Node.js (version 14 ou supérieure)
- PostgreSQL
- npm ou yarn

## Installation

1. **Cloner le projet**

```bash
git clone https://github.com/nmoussaoui-epsi/library_app
cd library_app
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configuration de la base de données**
   - Créer une base de données PostgreSQL nommée `library_app`
   - Configurer le fichier `.env` avec vos paramètres :

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
DB_NAME=library_app
```

4. **Créer les tables** (à faire manuellement dans PostgreSQL)

```sql
CREATE TABLE users (
  uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  nationalite VARCHAR(100)
);

CREATE TABLE ressources (
  uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  auteur VARCHAR(255),
  disponible BOOLEAN DEFAULT TRUE
);

CREATE TABLE emprunts (
  uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  utilisateur_id UUID NOT NULL,
  ressource_id UUID NOT NULL,
  date_emprunt DATE NOT NULL,
  date_retour DATE NOT NULL,
  CONSTRAINT fk_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES users(uuid),
  CONSTRAINT fk_ressource FOREIGN KEY (ressource_id) REFERENCES ressources(uuid)
);
```

## Démarrage

### Mode développement

```bash
npm run dev
```

### Mode production

```bash
npm start
```

Le serveur démarre sur `http://localhost:3000`

## Documentation API

La documentation Swagger est disponible à : `http://localhost:3000/api-docs`

## Endpoints principaux

### Utilisateurs

- `GET /api/users` - Liste tous les utilisateurs
- `GET /api/users/:uuid` - Récupère un utilisateur par UUID
- `POST /api/users` - Crée un nouvel utilisateur
- `PUT /api/users/:uuid` - Met à jour un utilisateur
- `DELETE /api/users/:uuid` - Supprime un utilisateur

### Ressources

- `GET /api/resources` - Liste toutes les ressources
- `GET /api/resources/:uuid` - Récupère une ressource par UUID
- `POST /api/resources` - Crée une nouvelle ressource
- `PUT /api/resources/:uuid` - Met à jour une ressource
- `DELETE /api/resources/:uuid` - Supprime une ressource

### Emprunts

- `GET /api/emprunts` - Liste tous les emprunts
- `GET /api/emprunts/:uuid` - Récupère un emprunt par UUID
- `POST /api/emprunts` - Crée un nouvel emprunt
- `DELETE /api/emprunts/:uuid` - Restitue une ressource

## Structure du projet

```
src/
├── controllers/     # Logique métier
├── models/         # Modèles de données et requêtes DB
├── routes/         # Définition des routes
├── services/       # Services (vide pour l'instant)
├── app.js         # Configuration Express
└── server.js      # Point d'entrée du serveur
```

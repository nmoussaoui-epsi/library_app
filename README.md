# Library App – API de Médiathèque

API REST pour gérer une médiathèque : utilisateurs, ressources, emprunts.

## Technologies

- **Node.js** + **Express**
- **PostgreSQL**
- **Knex.js** (migrations et requêtes SQL)
- **Swagger** (documentation)
- **CORS** (requêtes cross-origin)

## Prérequis

- Node.js ≥ 14
- PostgreSQL
- npm ou yarn

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/nmoussaoui-epsi/library_app
cd library_app
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer la base de données

Créer un fichier `.env` avec les informations suivantes :

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
DB_NAME=library_app
```

Créer la base PostgreSQL nommée `library_app`.

### 4. Appliquer les migrations

```bash
npx knex migrate:latest
```

Les tables seront automatiquement créées via les fichiers de migration. La colonne `id` est une UUID générée automatiquement.

## Lancer l'application

### Mode développement

```bash
npm run dev
```

### Mode production

```bash
npm start
```

L'application sera accessible à : `http://localhost:3000`

## Documentation API

Disponible à : `http://localhost:3000/api-docs`

## Endpoints

### Utilisateurs

- `GET /api/users` – Liste des utilisateurs
- `GET /api/users/:id` – Détail d’un utilisateur
- `POST /api/users` – Création
- `PUT /api/users/:id` – Mise à jour
- `DELETE /api/users/:id` – Suppression

### Ressources

- `GET /api/resources` – Liste des ressources
- `GET /api/resources/:id` – Détail
- `POST /api/resources` – Création
- `PUT /api/resources/:id` – Mise à jour
- `DELETE /api/resources/:id` – Suppression

### Emprunts

- `GET /api/emprunts` – Liste des emprunts
- `GET /api/emprunts/:id` – Détail
- `POST /api/emprunts` – Création
- `DELETE /api/emprunts/:id` – Restitution

## Structure du projet

```
src/
├── app.js           # Configuration Express
├── server.js        # Point d’entrée
├── controllers/     # Logique métier
├── models/          # Accès base de données (Knex)
├── routes/          # Définition des routes
└── services/        # Services (actuellement vide)
```

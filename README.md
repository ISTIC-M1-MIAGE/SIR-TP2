# Application de Vente de Tickets de Concert en Ligne

## Binôme

- TAHI Ezan [ezan.tahi@etudiant.univ-rennes.fr](mailto:ezan.tahi@etudiant.univ-rennes.fr)
- ZINSOU
  Ismaël [gbegnonvi-ismael.zinsou@etudiant.univ-rennes.fr](mailto:gbegnonvi-ismael.zinsou@etudiant.univ-rennes.fr)

## Briefing

### 1. Arboresence

Dans notre projet, vous pourrez retrouver les dossiers suivants :

- **modelling** : Dossier contenant les fichiers de modélisation (diagrammes UML)
- **backend** : Dossier qui contient le code source et les fichiers utiles pour faire tourner notre backend

### 2. Etat d'avancement dans les TPs

Voici une petite checklist que nous avons préparée pour suivre notre propre avancement :

- [x] TP1 - Introduction à la gestion de dépendances, de versions, et de l'intégration continue
- [x] TP2-4 - A la découverte de JPA
- [x] TP5 - Des servlets aux services Web
- [ ] TP6 - Créer une application Adu pattern MVC en vanilla JS
- [ ] TP7 - Angular
- [ ] TP8 (Optionnel) - Vue JS
- [x] TP9 (Optionnel) - React
- [x] TP10 - Intégration frontend/backend
- [ ] TP11 (Optionnel) - Déploiement sur VM
- [ ] TP12 (Optionnel) - Docker

## Comment démarrer le projet ?

### 1. Chargement du projet maven et ses dépendances

Après avoir ouvert notre projet, pensez à synchroniser le projet maven (pour charger les dépendances sur votre machine)
et ensuite lancer les commandes suivantes :

```
mvn clean
mvn compile
```

### 2. Initialisation de la BD

Nous avons décidé de supprimer le fichier **persistence.xml** qui se trouvait dans les ressources du backend car il
contenait nos accès à la BD.
Par contre, nous avons créé un template, le fichier **persistence.xml.example**, pour conserver la structure de base.

D'abord, vous devez recréer le fichier **persistence.xml** à partir du template et modifier les éléments suivants :

- **dbName** : Le nom que vous souhaitez donner à la BD (penser à créer la BD vide vous même)
- **dbUser** : Le nom d'utilisateur pour se connecter
- **dbPassword** : Le mot de passe pour se connecter

Une fois que c'est fait, vous devez maintenant exécuter la classe [InitDB](backend/src/main/java/jpa/InitDB.java) pour
charger nos entités dans la base de données que vous aurez spécifié dans le fichier **persistence.xml**.

### 3. Démarrage du servlet avec jetty

Nous avons remarqué que les dépendances pour le servlet et celles pour l'API REST empêchent l'application de build
correctement lorsque qu'elles cohabitent. Nous avons donc mis en commentaire les dépendances pour le servlet et il faut
penser à les décommenter dans le fichier [pom.xml](backend/pom.xml) avant de pouvoir lancer le servlet.

Après cette étape et après avoir chargé notre base de données sur votre machine, vous pouvez lancer le servlet avec la
commande ci-dessous :

```
mvn jetty:run
```

Le serveur démarre à l'adresse http://localhost:8080/

Pour tester, on peut accéder au formulaire de création d'un utilisateur via l'url http://localhost:8080/user/create.html

### 4. Démarrage de l'API REST

Pour démarrer l'API, il suffit de lancer la classe [RestServer](backend/src/main/java/rest/RestServer.java)

Une fois le serveur lancé, vous pouvez utiliser un client comme Postman avec l'url http://localhost:8080/ comme
effectuer des requêtes.

Retrouver la liste des endpoints dans la prochaine section grâce à notre intégration de swagger.

### 5. Documentation swagger

Lorsque l'API REST est lancée, il suffit d'aller à l'url http://localhost:8080/swagger/ pour voir s'afficher la
documentation.

## Les prochaines étapes

- Compléter nos DAOs avec des fonctions utiles pour le front
- Rajouter des DTOs
- Travailler sur la partie front

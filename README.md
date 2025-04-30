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

### 5. Les DTOs
Nous avons mis en place des DTOs pour faciliter la communication entre le front et le back.
Nous avons créé un package **dto** dans le dossier **backend/src/main/java** qui contient les classes de DTOs.
Nous avons créé un DTO pour chaque entité de la base de données. Ces DTOs contiennent uniquement les attributs nécessaires
pour le front et sont utilisés pour la sérialisation et la désérialisation des données.

### 6. Les DAO
Nous avons également créé un package **dao** dans le dossier **backend/src/main/java** qui contient les classes de DAO.
Ces classes contiennent les méthodes pour accéder aux données de la base de données. Nous avons créé un DAO pour chaque
entité de la base de données. Ces DAO sont utilisés pour effectuer des opérations CRUD sur les entités de la base de
données.

### 7. Les CORS
Nous avons mis en place des CORS pour permettre au front de communiquer avec le back. Nous avons utilisé la
bibliothèque **cors** pour gérer les CORS. Nous avons configuré les CORS dans la classe [CorsFilter](backend/src/main/java/rest/CorsFilter.java)
qui est exécutée avant chaque requête. Nous avons autorisé toutes les origines, tous les headers et toutes les méthodes
pour simplifier le développement. Il est possible de restreindre les origines, les headers et les méthodes en
modifiant la classe [CorsFilter](backend/src/main/java/rest/CorsFilter.java).

### 8. Authentification
Nous avons mis en place une authentification basique pour sécuriser l'accès à l'API REST. Nous avons utilisé la
bibliothèque **spring-security-crypto** pour gérer le cryptage des mots de passe. Nous avons créé un filtre d'authentification
qui est executé avant chacune des requêtes portant l'annnotation **@Secured**. Ce filtre vérifie si l'utilisateur est
authentifié et s' il a le rôle requis pour accéder à la ressource. Si l'utilisateur n'est pas authentifié, il est redirigé
vers la page de connexion.
Nous avons également créé une page de connexion qui permet à l'utilisateur de se connecter avec son email d'utilisateur et 
son mot de passe. Cette page est accessible via l'url http://localhost:3000/auth/login et devrait être redirigée vers la page
profil une fois l'utilisateur connecté. Mais pour le moment, nous n'avons pas encore mis en place la récupération du token après la connexion
et la bonne redirection vers la page profil.



### 7. Lancer le projet front
Pour le front, nous avons utilisé React plus précisément son framework NextJS 
Il faut donc installer NodeJS sur votre machine et ensuite lancer la commande suivante dans le dossier **frontend** :

```
npm install
```
Puis, pour lancer le projet, il suffit de faire :

```
npm run dev
```
Le projet se lance à l'adresse http://localhost:3000/

### 8. Documentation swagger

Lorsque l'API REST est lancée, il suffit d'aller à l'url http://localhost:8080/swagger/ pour voir s'afficher la
documentation.



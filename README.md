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
Par contre, nous avons créé un template, le fichier **persistence.xml.example** pour conserver la structure de base.

D'abord, vous devez recréer le fichier **persistence.xml** à partir du template et modifier les éléments suivants :

- **dbName** : Le nom que vous souhaitez donner à la BD (penser à créer la BD vide vous même)
- **dbUser** : Le nom d'utilisateur pour se connecter
- **dbPassword** : Le mot de passe pour se connecter

Une fois que c'est fait, vous devez maintenant exécuter la classe [InitDB](backend/src/main/java/jpa/InitDB.java) pour
charger nos entités dans la base de données que vous aurez spécifié dans le fichier **persistence.xml**.

## L'objectif :

Groupomania est une entreprise spécialisé dans la grande distribution. Cette entreprise en pleine expansion, à doublé son nombre de collaborateur en 3 ans.

Afin d'améliorer la motivation et l'implication des employés, la direction souhaite la **création d'un réseau social d'entreprise**.  
Cette application doit être moderne, ludique et permettre aux employés de se connaitre dans un cadre plus informel.

## Fonctionnalités de l'application pour tous :

- Creation d'un compte et connexion de profil simplifié.

  - **Le mot de passe doit comporter au minimum:**  
  - **8 caractères, 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et un caractère spécifique.**

- Accès **"creer un post"** pour publier du contenu multimédia et du texte.
- Les dernieres publications employés sont affichés en premier avec la date et l'heure.
- Le nombre de commentaires indique le nombre d'interactions associés à une publication.
- Accès **"commenter"** pour lire et commenter le dernier message.
- Possibilité de cliquer **"j'aime"** sur la publication de son choix et re-cliquer pour le retirer.
- Accès **changer le mot de passe** pour affecter un nouvau mot de passe.
- Application entierement **disponible sur mobile**.

## Fonctionnalités supplémentaires uniquement disponible au chargé-e de communication Groupomania

- Identifiant de compte chargé de communication unique  
  (bdd userRole = 1) :    

  _ **email: adminN2@groupomania.fr**  
  _ **mot de passe: AdminN2groupomania@**  

- Acces **"comptes utilisateurs"** pour supprimer un compte :  
  - le compte, les j'aimes, les commentaires et les publications seront supprimés.  

- Acces **"supprimer cette publication"** :  
  - la publication, les commentaires et les j'aimes seront supprimés.  

- Accès **"supprimer ce commentaire"** :  
  - le commentaire sera supprimé.  

# Prérequis :

- Clonez les repertoires backend et frontend respectivement sur les branches **main** et **master**  

- Installer Mysql :  

  - Executez `CREATE USER 'nouveau_utilisateur'@'localhost' IDENTIFIED BY 'mot_de_passe';`  
    Remplacez nouveau_utilisateur et mot_de_passe par vos propres informations.

  - puis executez `GRANT ALL PRIVILEGES ON groupomania_socialnetwork. * TO 'nouveau_utilisateur'@'localhost';`  
    Remplacez nouveau_utilisateur par vos propres informations.

- Importez le fichier "groupomania_socialNetwork.sql" qui se trouve dans la racine du backend dans votre base de donnée.

- Dans le fichier ".env.exemple" :  
  - completer les variables d'environnement par votre localhost mysql, votre identifiant et votre mot de passe.  
  - Creer votre token.  
  - Renommer le fichier par ".env".  

## Backend

- Installez NodeJs [https://nodejs.org/en/]
- Installez la dépendance nodemon `npm install -g nodemon`.
- Executez `nodemon server` pour mettre à jour le server.
- Vous trouverez dans la racine du backend, le fichier **apiary.apib** avec des exemples de requêtes et de réponses APi.

## Frontend :

- Frontend :

  - VueJs [https://cli.vuejs.org/guide/installation.html].
  - VueRouter [https://router.vuejs.org/installation.html#npm].
  - Vuex [https://vuex.vuejs.org/installation.html].

  - installation des dependances : `npm install`
  - lancement de l'application : `npm run serve`

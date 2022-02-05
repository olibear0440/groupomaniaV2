# L'objectif :

Groupomania est une entreprise spécialisé dans la grande distribution. Cette entreprise en pleine expansion, à doublé son nombre de collaborateur en 3 ans.  

Afin d'améliorer la motivation et l'implication des employés, la direction souhaite la __création d'un réseau social d'entreprise__.  
Cette application doit être moderne, ludique et permettre aux employés de se connaitre dans un cadre plus informel.


## Fonctionnalités de l'application pour tous :

- Creation d'un compte et connexion de profil simplifié.
    * __Le mot de passe doit comporter au minimum:__  
        * __8 caractères, 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et un caractère spécifique.__ 

- Accès __"creer un post"__ pour publier du contenu multimédia et du texte.    
- Les dernieres publications employés sont affichés en premier avec la date et l'heure.  
- Le nombre de commentaires indique le nombre d'interactions associés à une publication.  
- Accès __"commenter"__ pour lire et commenter le dernier message.     
- Possibilité de cliquer __"j'aime"__ sur la publication de son choix et re-cliquer pour le retirer.  
- Accès __changer le mot de passe__ pour affecter un nouvau mot de passe.  
- Application entierement __disponible sur mobile__.   


### Fonctionnalités supplémentaires uniquement disponible au chargé-e de communication Groupomania

- Identifiant de compte chargé de communication unique  
(bdd userRole = 1) :
    * __email: adminN2@groupomania.fr__
    * __mot de passe: AdminN2groupomania@__ 
    

- Acces __"comptes utilisateurs"__ pour supprimer un compte :   
    * le compte, les j'aimes, les commentaires et les publications seront supprimés.  

- Acces __"supprimer cette publication"__ :   
    * la publication, les commentaires et les j'aimes seront supprimés.  

- Accès __"supprimer ce commentaire"__ :  
    * le commentaire sera supprimé.  


### Prérequis :

- Installer Mysql : 
    * Executez `CREATE USER 'nouveau_utilisateur'@'localhost' IDENTIFIED BY 'mot_de_passe';`  
    Remplacez nouveau_utilisateur et mot_de_passe par vos propres informations.  

    * puis executez `GRANT ALL PRIVILEGES ON groupomania_socialnetwork. * TO 'nouveau_utilisateur'@'localhost';`  
    Remplacez nouveau_utilisateur par vos propres informations.  

- Importez le fichier "groupomania_socialNetwork.sql" qui se trouve dans la racine du backend dans votre base de donnée.  

- Dans le fichier ".env.exemple" :  
    * completer les variables d'environnement par votre localhost mysql, votre identifiant et votre mot de passe.  
    * Creer votre token.  
    * Renommer le fichier par ".env".  


#### Backend  

- Voir fichier Readme du backend.  


##### Technologies : 

- Base de donnée : Mysql.  
- Frontend : 
    * VueJs [https://cli.vuejs.org/guide/installation.html].
    * VueRouter [https://router.vuejs.org/installation.html#npm].  
    * Vuex [https://vuex.vuejs.org/installation.html].  

    * installation des dependances : `npm install`  
    * lancement de l'application : `npm run serve`
    



# assignments-frontend ([Demo](https://assignments-frontend.herokuapp.com/))
 Projet Assignments Groupe 5 Madagascar 2021

Membres du groupe : 
 
	        Numéro 11 MANANDRAIBE Nelson Johnatan
	        Numéro 24 RAKOTOBE Holiarisoa Vetso Nombana
	    

Fonctionnalités de base :
	
1) Connexion et déconnexion au frontend (à l'aide de Json Web Tokens (JWT) ) -> accès pour les administrateurs, professeurs et élèves
	
2) Ajout de nouvelles propriétés au modèle des Assignments
	
3) Amélioration de l'affichage des Assignments
	
4) Utilisation de deux onglets séparés selon qu'ils ont été rendus ou pas encore rendus
	
5) Utilisation d'un formulaire de type Stepper (formulaire en plusieurs étapes) pour l'ajout d'Assignments (éventuellement pour la modification)
	

Fonctionnalités ajoutées :
	
1) Drag and drop entre la liste des Assignments non rendus et rendus avec notification en utilisant l'ajout de messages de notification (SnackBar Material)
	    
Admin : 
1) Ajout d'un tableau de bord affichant:                                                                                                                                         - le nombre d'étudiant, professeur, matières cliquable vers la liste de chacun
- le nombre d'assignments(rendu, pas rendu et en cours) 
- un graphe en batonnet sur le taux de réussite par matière
- un graphe en courbe sur le taux de réussite par professeur
2) Popup 
3) Liste des élèves avec pagination (avec export excel) 
4) Liste des professeurs avec pagination
5) Liste des matières avec pagination et option voir cours pour consulter les videos de chacun des cours
Compte de test : 
- Mail : john@gmail.com
- Mot de passe : john

Professeur :
1) Ajout d'un cours (upload du cours video avec une pochette)
2) Noter les devoirs des élèves 
    		
Compte de test : 
- Mail : vetsorakotobe@gmail.com
- Mot de passe : password

Elèves : 
1) recevoir un assignments
2) commencer un assignments
3) rendre un assignments
    		
Compte de test : 
- Mail : catleeslowan@gmail.com
- Mot de passe : password
    
Pour lancer le projet chez vous :

    - clonez les projets sur votre machine
    - installez les modules sur les deux projets avec npm i 
    - Ouvrez le projet avec Visual Studio Code
    - aller dans le fichier PATH\assignments-frontend\src\app\shared\services\basic.service.ts et modifier le base_uri en http://localhost:8010/api
    - démarrer le serveur node PATH\assignments-backend, ouvrez une invite de commande dessous et taper node server.js
    - démarrer la partie front PATH\assignments-frontend ouvrez une invite de commande dessous et taper ng server 

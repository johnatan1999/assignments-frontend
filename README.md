# assignments-frontend
 Projet grails leCoincoin Groupe 3 Madagascar 2021

Membres du groupe : 
 
	        Numéro 31 RAMANANTSALAMA Anthony Tiana 
	        Numéro 41 RANDRIANARISOA Narindra
	        Numéro 47 RASOANAIVO Ny Toky Andi
			Numéro 53 RAVELOJAONA Tokiniaina Mathias
	        Numéro 24 RAKOTOBE Holiarisoa Vetso Nombana
	    

Fonctionnalités de base :
	
1) Connexion et déconnexion au backend -> accès pour les admin et moderateur
	
2) CRUD annonces
	
3) CRUD utilisateurs
	
4) Gestion de la sécurité -> admin peut tout faire et moderateur peut tout modifier mais ne peut pas créer ni 
supprimer
	
5) Ergonomie correcte avec menu, cacher les casts, affichage des images
	
6) API Rest avec une collection Postman avec les méthodes GET/ POST/ PUT/ PATCH/ DELETE pour les utilisateurs et 
les annonces avec les entêtes JSON et XML

Fonctionnalités ajoutées :
	
1) Recherche multicritères sur les utilisateurs
	    
	        Recherche sur leur nom
	        Recherche sur le statut de compte désactivé ou non
	        Possibilité de modifier directement le statut d'un utilisateur depuis la liste des utilisateurs
	    
	
2) Recherche pour pouvoir filtrer les annonces sur leur titre / description
	
3)Conception et développement d'un tableau de bord
	    
	        Statistiques sur le nombre d'articles créés
	        Statistiques sur le nombre d'utilisateurs existants
	        Statistiques sur le nombre d'images créés
	        Graphe sur le nombre d'articles produits par intervalle de jours avec fitre et par années
	        Graphe sur le nombre d'articles produits par mois durant les années
	        Graphe sur le nombre d'articles produits par jours de la semaine durant les années avec possibilité de filtrer par nois
	        Graphe sur les auteurs qui produisent le plus d'articles avec possibilité de choisir le mois de l'année , et le nombre d'auteurs à afficher
	    
	
4)Ecran gallerie
	    
	        Gestion avançée et regroupement des illustrations
	        Possibilité de basculer à la fiche de l'annonce correspondante
	        Possibilité d'effacer directement l'illustration
	        Recherche multicritère par auteurs , mot-clé ou possibilité de trier et choisir une rangée de date entre la date d'ajout de l'image et celle de l'annonce
	    
	
5)Import et export csv pour les utilisateurs 
	    
	        Import uniquement pour l'admin
	        fichier test pour l'import dans racine/testupload.csv
	    
	
6)Export CSV pour les annonces
	
7)API Rest avec une collection Postman avec les méthodes GET/ POST/ DELETE pour les illustrations avec les entêtes JSON et XML
	
8)Sécurité pour les différentes fonctions de l'API REST
	
9)Intégration du cdn cloudinary à l'application afin de stocker les images dans le Cloud
	
10) Déploiement sur Heroku à l'adresse http://grails13fikambanana.herokuapp.com/projet

	
 Compte de test : 
	 
	        Nom : admin
	        Mot de passe : password

    
11)Ajout de plusieurs fonctionnalités de l'application ( comme l'ajout d'illustrations à une annonce)
    
12)Gestion à part des illustrations sur la page d'édition des annonces avec support de multiples images pour une seule annonce , possibilité d'ajouter ou de supprimer les images
    
Pour lancer le projet chez vous :
    
    Ouvrez le projet avec IntelliJ Ultimate
    Faites "run" après la synchronisation des dépendances gradle

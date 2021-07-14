![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)
![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)

# Projet P6

[...]

## Pré-requis

Une version de Python >= 3.0 doit être installée sur votre poste.

## Installation

Depuis un terminal de type GitBash, déplacez-vous dans le répertoire dans lequel vous souhaitez récupérer le script ainsi que les fichiers *readme.md* et *requirements.txt*  et saisissez la commande ci-dessous:

``git clone https://github.com/jpvincent1980/P6``

Une fois les fichiers téléchargés sur votre poste de travail, vous devez au préalable créer et activer un environnement virtuel sur votre poste.
Pour se faire, suivez les étapes suivantes :
1. Depuis votre terminal et toujours dans le même répertoire que précédemment, créer un environnement virtuel en saisissant la commande suivante:
  `` python -m venv env`` (``env`` sera le nom de votre environnement virtuel)
  

2. Activez votre environnement virtuel en saisissant la commande suivante:
   
   *sous Windows* -> ``env/Scripts/activate.bat``
   
   *sous Mac/Linux* -> ``source/env/bin/activate``
   

Lorsque votre environnement virtuel est activé, installez les modules Python nécessaires à la bonne exécution du script grâce au fichier *requirements.txt* précédemment téléchargé en saisissant la commande ci-dessous toujours depuis le terminal:

``pip install -r requirements.txt``


Flake8:

Flake8 faisant partie des modules du fichier ``requirements.txt``, 
celui-ci sera installé dans votre environnement virtuel. Vous pourrez 
générer un nouveau rapport flake8 en saisissant la commande ``flake8`` dans votre terminal depuis le répertoire où vous avez enregistré le 
projet.

## Démarrage

[...]


## IDE utilisé

[PyCharm Community Edition](https://www.jetbrains.com/fr-fr/pycharm/)

## Auteur

[Jean-Philippe Vincent](https://twitter.com/JeanPhilippeV15)
# 🔥 Habit Battle Arena

**Transforme tes habitudes en combat épique !**

Une Progressive Web App (PWA) qui gamifie tes habitudes quotidiennes avec un système de combat style DBZ/anime.

## ✨ Fonctionnalités

### Version 1.0 (MVP)
- ⚔️ **Combat quotidien** : Ton héros vs ton démon à minuit
- 📊 **Budget équilibré** : 20 points de bonnes habitudes, 20 points de mauvaises habitudes
- 💪 **Progression visuelle** : Tes personnages prennent du muscle en temps réel
- ⚡ **Armes & Pouvoirs** : Déblocage aléatoire selon les points accumulés
- 🏆 **Armée personnelle** : Collectionne tes héros victorieux
- 🔥 **Streak system** : Compteur de jours consécutifs par habitude
- 🌍 **Bilingue** : Français et Anglais
- 📱 **PWA** : Installable sur mobile et desktop
- 🎮 **Mode découverte** : Tutorial interactif au premier lancement

### À venir
- 🤝 Combats entre amis
- 🏅 Ligues mondiales
- ⚔️ Guerres d'armées mensuelles
- 🎯 Système "Habitudes Maîtrisées" (100 jours)

## 🎨 Design

- **Style** : DBZ/Anime avec silhouettes CSS
- **Couleurs** : Orange/Or pour le héros, Rouge/Crimson pour le démon
- **Animations** : Auras, muscles qui grossissent, armes qui apparaissent
- **Typographie** : Orbitron (titres), Saira Condensed (sous-titres), Rajdhani (body)

## 🚀 Installation

### Développement local

1. Clone le projet ou télécharge les fichiers
2. Ouvre `index.html` dans un navigateur moderne
3. Ou utilise un serveur local :
```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

4. Visite `http://localhost:8000`

### Déploiement

#### Option 1 : Vercel (Recommandé)
1. Crée un compte sur [vercel.com](https://vercel.com)
2. Connecte ton repository GitHub
3. Déploie en un clic
4. URL : `habitbattle.vercel.app`

#### Option 2 : Netlify
1. Crée un compte sur [netlify.com](https://netlify.com)
2. Drag & drop le dossier
3. URL : `habitbattle.netlify.app`

#### Option 3 : GitHub Pages
1. Push vers GitHub
2. Settings > Pages > Deploy from main branch
3. URL : `username.github.io/habit-battle-arena`

## 📱 Installation sur mobile

### Android / iOS
1. Visite l'URL de l'app dans Chrome/Safari
2. Menu > "Ajouter à l'écran d'accueil"
3. L'app s'installe comme une app native !

## 🎮 Comment jouer

### 1. Configuration initiale
- Ajoute tes **bonnes habitudes** (20 points au total)
- Ajoute tes **mauvaises habitudes** (20 points au total)
- Exemple : "Faire du sport" (5 pts) vs "Manger du sucre" (5 pts)

### 2. Pendant la journée
- Coche les habitudes que tu réalises
- Ton **héros** gagne de la force (bonnes habitudes)
- Ton **démon** gagne de la force (mauvaises habitudes)
- Regarde-les évoluer en temps réel !

### 3. Combat à minuit
- À 23h59, combat automatique
- Le plus fort gagne
- **Victoire** : Ton héros rejoint ton armée 🏆
- **Défaite** : Réessaie demain ! 💪

### 4. Progression
- Accumule des héros dans ton armée
- Track tes statistiques
- Maintiens ta streak de victoires

## 🔧 Structure du code

```
habit-battle-arena/
├── index.html          # Structure HTML
├── styles.css          # Design DBZ épique
├── app.js              # Logique du jeu
├── manifest.json       # Configuration PWA
├── icon-192.png        # Icône app (petit)
├── icon-512.png        # Icône app (grand)
└── README.md           # Ce fichier
```

## 💡 Philosophie

### Fair Play Garanti
- ✅ **Zéro pay-to-win** : La victoire dépend uniquement de tes vraies habitudes
- ✅ **Budget équitable** : Tout le monde a 20 points, toujours
- ✅ **Pas de triche** : Impossible d'acheter des avantages

### Monétisation éthique (future)
- 🎨 Skins cosmétiques uniquement
- 👔 Premium = accès illimité aux skins
- 🚫 Jamais d'avantage compétitif payant

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, JavaScript vanilla
- **PWA** : Service Worker, Manifest
- **Stockage** : localStorage (navigation privée = pas de sauvegarde)
- **Fonts** : Google Fonts (Orbitron, Saira Condensed, Rajdhani)
- **Audio** : Web Audio API (beeps simples)

## 📊 Roadmap

### Version 1.1 (Semaine 2-3)
- [ ] Animations de combat améliorées
- [ ] Plus d'armes et pouvoirs
- [ ] Sons supplémentaires
- [ ] Corrections bugs

### Version 1.2 (Mois 1)
- [ ] Système "Habitudes Maîtrisées" (100 jours)
- [ ] Bonus +1 pt hors budget
- [ ] Rewards de progression

### Version 2.0 (Mois 2-3)
- [ ] Mode Social (opt-in)
- [ ] Combats entre amis
- [ ] Classements
- [ ] Chat simple

### Version 3.0 (Mois 6+)
- [ ] Guerres d'Armées mensuelles
- [ ] Tournois
- [ ] Système de clans

## 🐛 Bugs connus

- Les animations de combat peuvent être saccadées sur mobiles très anciens
- Le countdown peut décaler de quelques secondes selon le fuseau horaire
- localStorage ne fonctionne pas en navigation privée

## 🤝 Contribution

Feedback bienvenu ! Pour suggérer des features :
1. Utilise le bouton feedback dans l'app
2. Ou contacte le développeur

## 📜 Licence

**© 2024 Habit Battle Arena - Hamza - Tous droits réservés**

### Conditions d'utilisation

✅ **Autorisé :**
- Usage personnel gratuit
- Tester l'application
- Partager le lien de l'app
- Contribuer au développement (avec permission)

❌ **Interdit sans autorisation écrite :**
- Redistribution commerciale du code
- Revente de l'application
- Copie du code pour usage commercial
- Création de versions dérivées commerciales
- Hébergement sur d'autres domaines sans permission

### Protection légale

Ce logiciel est protégé par le droit d'auteur français et international. Toute violation sera poursuivie conformément à la loi.

**Contact pour licences commerciales :** boudourhamza7@gmail.com

## 🙏 Crédits

- Design inspiré par Dragon Ball Z, Street Fighter, et Naruto
- Polices : Google Fonts
- Icônes : Emojis natifs

---

**Fait avec 💪 et ⚔️ par un développeur qui croit au pouvoir des habitudes**

*"Le démon le plus fort est celui que tu portes en toi. Combats-le chaque jour."*

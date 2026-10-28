# Math pour Collège et Lycée — site de départ

Site statique, responsive et prêt à personnaliser. Pas de base de données et pas de frais nécessaires pour le tester.

## Tester sur Windows
1. Décompressez le ZIP.
2. Ouvrez le dossier `math-pour-college-lycee`.
3. Double-cliquez sur `index.html` pour ouvrir le site dans votre navigateur.
4. Pour modifier le site, ouvrez le dossier avec Visual Studio Code.

## Modifier les couleurs et le style
- `style.css` : couleurs, tailles, disposition et apparence.
- La couleur principale actuelle est `#e81750`.
- `assets/logo.svg` : petit logo provisoire. Remplacez-le par votre logo si vous le souhaitez, en gardant le nom `logo.svg` ou en modifiant la référence dans `index.html`.

## Ajouter les documents
Ouvrez `data.js`. Ajoutez un objet dans le tableau `RESOURCES`, par exemple :

```js
const RESOURCES = [
  {
    title: "Les fractions — résumé",
    level: "Collège",
    type: "Résumé",
    description: "Résumé du cours",
    url: "https://drive.google.com/file/d/ID_DU_FICHIER/view"
  }
];
```

Valeurs autorisées pour `level` : `Primaire`, `Collège`, `Lycée`.
Types proposés : `Cours`, `Résumé`, `Exercices`, `Devoirs`, `Examens`, `Correction`, `Vidéo`.
Pour plusieurs documents, séparez les objets par une virgule.

## Modifier le contact
Dans `data.js`, remplacez `contactUrl: ""` par le lien de votre page Facebook ou autre moyen de contact, entre guillemets.

## Publier gratuitement
Vous pouvez publier ce site statique sur GitHub Pages. Créez un dépôt GitHub public, téléversez le contenu du dossier (le fichier `index.html` doit être à la racine), puis ouvrez Settings → Pages et choisissez la branche `main` et le dossier `/ (root)`. Consultez la documentation officielle : https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

Attention : les sites GitHub Pages publiés sont accessibles publiquement. Ne mettez pas de mots de passe ni de données privées dans le dépôt.


LOGO ORIGINAL
Le logo fourni a été ajouté dans assets/logo.png et la page d'accueil l'utilise désormais.
Pour le remplacer, gardez le nom logo.png ou modifiez la référence dans index.html.

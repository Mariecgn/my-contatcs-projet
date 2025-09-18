import mongoose from 'mongoose';

// fonction asynchrone qui va établir la connexion avec la base
// on exporte pour pouvoir l'utiliser ailleurs
export async function connectDB(uri) {
  try {
    // si on a reçu un paramètre "uri", on l'utilise
    // sinon on prend la variable d'environnement MONGO_URI
    const mongoUri = uri || process.env.MONGO_URI;

    // on demande à mongoose d'ouvrir une connexion
    // mongoose.connect retourne une promesse donc on met "await"
    await mongoose.connect(mongoUri, {
      //éviter certains warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // si tout se passe bien on affiche un message dans la console
    console.log("connexion mongodb réussie");
  } catch (err) {
    // si jamais la connexion échoue, on affiche l'erreur
    console.error("erreur lors de la connexion mongodb :", err);

    // on arrête le processus node (code 1 = erreur)
    process.exit(1);
  }
}

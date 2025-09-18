import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// fonction pour enregistrer un nouvel utilisateur
export async function register(req, res) {
  try {
    const { email, password } = req.body;
    
    // vérifier que l'email et le mot de passe sont fournis
    if (!email || !password) {
      return res.status(400).json({ error: 'email et mot de passe requis' });
    }

    // vérifier si l'email est déjà utilisé
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: 'email déjà utilisé' });
    }

    // hacher le mot de passe avec un facteur de coût de 10
    const hash = await bcrypt.hash(password, 10);

    // créer l'utilisateur avec l'email et le mot de passe haché
    const user = await User.create({ email, password: hash });

    // renvoyer l'id et l'email du nouvel utilisateur
    return res.status(201).json({ id: user._id, email: user.email });
  } catch (e) {
    // erreur générique du serveur
    return res.status(500).json({ error: 'erreur serveur' });
  }
}

// fonction pour connecter un utilisateur existant
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // chercher l'utilisateur avec cet email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'identifiants invalides' });
    }

    // comparer le mot de passe fourni avec le hash en base
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ error: 'identifiants invalides' });
    }

    // générer un token jwt valable 3 jours contenant l'id de l'utilisateur
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    // renvoyer le token au client
    return res.json({ token });
  } catch (e) {
    // erreur générique du serveur
    return res.status(500).json({ error: 'erreur serveur' });
  }
}

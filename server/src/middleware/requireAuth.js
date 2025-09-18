// server/src/middleware/requireAuth.js
import jwt from 'jsonwebtoken';

// middleware d'auth jwt
// - lit l'en-tête Authorization: Bearer <token>
// - vérifie le token avec JWT_SECRET
// - si ok, met l'objet décodé dans req.user et passe la main
// - sinon renvoie 401
export default function requireAuth(req, res, next) {
  // ex: "Bearer xxxxx.yyyyy.zzzzz"
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded ressemble à { id: "<userId>", iat: ..., exp: ... }
    req.user = decoded;
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'token invalide' });
  }
}

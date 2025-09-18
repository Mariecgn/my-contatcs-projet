import Contact from '../models/Contact.js'

// get /contacts
export async function listContacts(req, res) {
  try {
    // récupère tous les contacts liés à l'utilisateur connecté
    // triés par date de création décroissante (du plus récent au plus ancien)
    const items = await Contact
      .find({ owner: req.user.id })
      .sort({ createdAt: -1 })

    return res.json(items)
  } catch (e) {
    // si erreur côté base de données ou serveur => 500
    return res.status(500).json({ error: 'erreur serveur' })
  }
}

// post /contacts
export async function createContact(req, res) {
  try {
    // on extrait les champs depuis le corps de la requête
    const { firstName, lastName, phone, email, notes } = req.body

    // vérification minimale : certains champs sont obligatoires
    if (!firstName || !lastName || !phone) {
      return res.status(400).json({
        error: 'champs requis : firstname, lastname, phone'
      })
    }

    // création d'un nouveau contact associé à l'utilisateur connecté
    const c = await Contact.create({
      owner: req.user.id,
      firstName,
      lastName,
      phone,
      email,
      notes
    })

    // code 201 = ressource créée, on renvoie l'objet créé
    return res.status(201).json(c)
  } catch (e) {
    return res.status(500).json({ error: 'erreur serveur' })
  }
}

// patch /contacts/:id
export async function updateContact(req, res) {
  try {
    const { id } = req.params

    // mise à jour d'un contact par son id et appartenant à l'utilisateur connecté
    // $set = met à jour uniquement les champs fournis (partiel = patch)
    // new: true = retourne la version après modification
    // runvalidators: true = applique les règles du schéma mongoose sur les champs modifiés
    const updated = await Contact.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    )

    // si aucun document trouvé => 404
    if (!updated) return res.status(404).json({ error: 'contact introuvable' })

    return res.json(updated)
  } catch (e) {
    // une erreur de cast (id invalide) arrive aussi ici => réponse générique 500
    return res.status(500).json({ error: 'erreur serveur' })
  }
}

// delete /contacts/:id
export async function deleteContact(req, res) {
  try {
    const { id } = req.params

    // suppression du contact correspondant à l'id et appartenant à l'utilisateur connecté
    const deleted = await Contact.findOneAndDelete({
      _id: id,
      owner: req.user.id
    })

    if (!deleted) return res.status(404).json({ error: 'contact introuvable' })

    // réponse simple de succès
    return res.json({ ok: true })
  } catch (e) {
    return res.status(500).json({ error: 'erreur serveur' })
  }
}

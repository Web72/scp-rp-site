// URL de ton proxy Cloudflare (on va le créer juste après)
const PROXY_URL = "https://ton-proxy.workers.dev"; 

document.getElementById("appealForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    roblox: roblox.value.trim(),
    discord: discord.value.trim(),
    date: date.value || "Non spécifiée",
    reason: reason.value.trim() || "Non précisée",
    evidence: evidence.value.trim() || "Aucune",
    explain: explain.value.trim()
  };

  if (!data.roblox || !data.discord || !data.explain) {
    result.textContent = "⚠️ Veuillez remplir tous les champs obligatoires.";
    return;
  }

  result.textContent = "⏳ Envoi en cours...";

  try {
    const res = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      result.textContent = "✅ Demande envoyée au staff SCP avec succès.";
      document.getElementById("appealForm").reset();
    } else {
      result.textContent = "❌ Erreur lors de l’envoi (" + res.status + ")";
    }
  } catch (err) {
    result.textContent = "🚫 Impossible de contacter le serveur.";
    console.error(err);
  }
});

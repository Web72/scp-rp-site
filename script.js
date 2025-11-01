// 🔗 Lien vers ton proxy Cloudflare (ne rien changer ici)
const PROXY_URL = "https://scp-rp-proxy.tristando717.workers.dev";

document.getElementById("appealForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Récupération des champs du formulaire
  const data = {
    roblox: document.getElementById("roblox").value.trim(),
    discord: document.getElementById("discord").value.trim(),
    date: document.getElementById("date").value || "Non spécifiée",
    reason: document.getElementById("reason").value.trim() || "Non précisée",
    evidence: document.getElementById("evidence").value.trim() || "Aucune",
    explain: document.getElementById("explain").value.trim(),
  };

  const result = document.getElementById("result");

  // Vérification des champs obligatoires
  if (!data.roblox || !data.discord || !data.explain) {
    result.textContent = "⚠️ Veuillez remplir tous les champs obligatoires.";
    result.style.color = "#ff4d4d";
    return;
  }

  result.textContent = "⏳ Envoi en cours...";
  result.style.color = "#ffffff";

  try {
    const response = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      result.textContent = "✅ Demande envoyée avec succès au staff SCP.";
      result.style.color = "#00ff88";
      document.getElementById("appealForm").reset();
    } else {
      result.textContent = "❌ Erreur lors de l’envoi (code " + response.status + ")";
      result.style.color = "#ff4d4d";
    }
  } catch (error) {
    console.error(error);
    result.textContent = "🚫 Impossible de contacter le serveur.";
    result.style.color = "#ff4d4d";
  }
});

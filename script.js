async function searchCharacter() {
    const name = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "Carregando...";

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
        const data = await response.json();

        resultsDiv.innerHTML = ""; // Limpa o carregando

        data.results.forEach(char => {
            resultsDiv.innerHTML += `
                <div class="card">
                    <img src="${char.image}" alt="${char.name}">
                    <p>${char.name}</p>
                </div>
            `;
        });
    } catch (error) {
        resultsDiv.innerHTML = "Personagem não encontrado.";
    }
}

// Carregar iniciais ao abrir
searchCharacter();
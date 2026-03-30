const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
const voiceBtn = document.querySelector('.voice-btn');

async function searchCharacter() {
    const name = searchInput.value;
    
    resultsDiv.innerHTML = "<p>Carregando personagens...</p>";

    try {
        // Se houver nome digitado, busca pelo nome. Se não, busca a página inicial padrão.
        const url = name 
            ? `https://rickandmortyapi.com/api/character/?name=${name}` 
            : `https://rickandmortyapi.com/api/character/`;

        const response = await fetch(url);
        const data = await response.json();

        resultsDiv.innerHTML = ""; 

        if (!data.results) {
            resultsDiv.innerHTML = "<p>Personagem não encontrado.</p>";
            return;
        }

        data.results.forEach(char => {
            resultsDiv.innerHTML += `
                <div class="card">
                    <img src="${char.image}" alt="Personagem: ${char.name}" width="300" height="300">
                    <p>${char.name}</p>
                </div>
            `;
        });
    } catch (error) {
        resultsDiv.innerHTML = "<p>Erro na conexão ou personagem não encontrado.</p>";
    }
}

function startVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert("Desculpe, seu navegador não suporta busca por voz.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = false;

    recognition.onstart = () => {
        voiceBtn.textContent = "🛑";
        voiceBtn.style.background = "#ff4444";
        searchInput.placeholder = "Ouvindo...";
    };

    recognition.onresult = (event) => {
        // Correção da matriz de resultados para capturar o texto corretamente
        const transcript = event.results.transcript;
        searchInput.value = transcript;
        recognition.stop();
        searchCharacter();
    };

    recognition.onerror = () => recognition.stop();
    recognition.onend = () => {
        voiceBtn.textContent = "🎤";
        voiceBtn.style.background = "#ffcc00";
        searchInput.placeholder = "Diga ou digite um nome...";
    };

    recognition.start();
}

// Executa a busca geral ao abrir a página
searchCharacter();

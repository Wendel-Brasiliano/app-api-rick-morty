const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
const voiceBtn = document.querySelector('.voice-btn');

async function searchCharacter() {
    const name = searchInput.value;
    
    resultsDiv.innerHTML = "<p>Carregando personagens...</p>";

    try {
        const url = name 
            ? `https://rickandmortyapi.com/api/character/?name=${name}` 
            : `https://rickandmortyapi.com/api/character/`;

        const response = await fetch(url);
        const data = await response.json();

        resultsDiv.innerHTML = ""; 

        if (navigator.vibrate) {
            navigator.vibrate(200); 
        }

        if (!data.results) {
            resultsDiv.innerHTML = "<p>Personagem não encontrado.</p>";
            if (navigator.vibrate) navigator.vibrate(); 
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
        if (navigator.vibrate) navigator.vibrate();
    }
}

function startVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert("Desculpe, seu navegador não suporta busca por voz.");
        return;
    }

    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US'; 
    recognition.continuous = false;

    recognition.onstart = () => {
        voiceBtn.textContent = "🛑";
        voiceBtn.style.background = "#ff4444";
        searchInput.placeholder = "Ouvindo...";
    };

    recognition.onresult = (event) => {
        let transcript = event.results.transcript;
        
        transcript = transcript.replace(/[.,]/g, '').trim(); 
        
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

searchCharacter();

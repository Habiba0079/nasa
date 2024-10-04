document.addEventListener("DOMContentLoaded", function() {
    // audios for each language
    const audios = {
        en: {
            section1: new Audio('/assets/audio/story1/en/1.mp3'),
            section2: new Audio('/assets/audio/story1/en/2.mp3')
        },
        ar: {
            section1: new Audio('/assets/audio/story1/ar/1.mp3'),
            section2: new Audio('/assets/audio/story1/ar/2.mp3')
        }
    };

    // Default 
    let currentLanguage = 'en';

    // stop all audios
    function stopAllAudios() {
        Object.values(audios[currentLanguage]).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }

    // handle language switching
    function setLanguage(lang) {
        currentLanguage = lang;

        // Toggle text 
        if (lang === 'en') {
            document.querySelectorAll('.en-text').forEach(el => el.style.display = 'block');
            document.querySelectorAll('.ar-text').forEach(el => el.style.display = 'none');
        } else {
            document.querySelectorAll('.en-text').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.ar-text').forEach(el => el.style.display = 'block');
        }

        stopAllAudios();
    }

    // play audio for sections coming into view 
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stopAllAudios(); 
                const sectionId = entry.target.id;
                audios[currentLanguage][sectionId].play(); 
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // setLanguage function globally for the buttons
    window.setLanguage = setLanguage;
});

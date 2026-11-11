// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // DOM Elements
    const startScreen = document.getElementById('startScreen');
    const mainContent = document.getElementById('mainContent');
    const startBtn = document.getElementById('startBtn');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const toothless = document.getElementById('toothless');
    const lightfury = document.getElementById('lightfury');
    const photoInput1 = document.getElementById('photoInput1');
    const photoInput2 = document.getElementById('photoInput2');
    const photo1 = document.getElementById('photo1');
    const photo2 = document.getElementById('photo2');
    const interactiveCards = document.querySelectorAll('.interactive-card');
    const storyText = document.getElementById('storyText');
    const berkDestination = document.getElementById('berkDestination');
    const backBtn = document.getElementById('backBtn');
    const newBerkDestination = document.getElementById('newBerkDestination');
    const newBerkBackBtn = document.getElementById('newBerkBackBtn');
    const newBerkVideo = document.getElementById('newBerkVideo');
    const torchGame = document.getElementById('torchGame');
    const interactiveSection = document.querySelector('.interactive-section');
    
    // Flag to track if Lightfury has appeared (only once)
    let lightfuryHasAppeared = false;

    // Start Button Click Handler
    startBtn.addEventListener('click', () => {
        // Hide start screen with fade out
        startScreen.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            startScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Start Toothless animation
            toothless.classList.remove('hidden');
            
            // Play background music
            playMusic();
            
            // Add entrance animation to main content
            mainContent.style.animation = 'fadeIn 1s ease-in';
        }, 500);
    });

    // Music Control
    let isMusicPlaying = false;

    function playMusic() {
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.textContent = '🔊';
            musicToggle.classList.remove('muted');
        }).catch(error => {
            console.log('Autoplay prevented. User interaction required.');
            // Music will play when user clicks the toggle button
        });
    }

    musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        isMusicPlaying = false;
        musicToggle.textContent = '🔇';
        musicToggle.classList.add('muted');
    } else {
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.textContent = '🔊';
            musicToggle.classList.remove('muted');
        }).catch(error => {
            alert('Please interact with the page first to enable audio playback.');
        });
    }
    });

    // Photo Upload Handlers
    if (photoInput1) {
        photoInput1.addEventListener('change', (e) => {
            handlePhotoUpload(e, photo1, photoInput1);
        });
    }

    if (photoInput2) {
        photoInput2.addEventListener('change', (e) => {
            handlePhotoUpload(e, photo2, photoInput2);
        });
    }

    function handlePhotoUpload(event, imgElement, inputElement) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imgElement.src = e.target.result;
                imgElement.style.display = 'block';
                inputElement.parentElement.style.display = 'none';
                
                // Add photo animation
                imgElement.style.animation = 'fadeIn 0.5s ease-in, photoPop 0.5s ease-out';
            };
            reader.readAsDataURL(file);
        }
    }

    // Interactive Cards
    interactiveCards.forEach((card, index) => {
        card.addEventListener('click', () => {
        // Add click animation
        card.style.animation = 'cardClick 0.3s ease-out';
        
        setTimeout(() => {
            card.style.animation = '';
        }, 300);
        
        // Different actions for different cards
        switch(card.dataset.card) {
            case '1':
                // Navigate to Berk Island destination - same pattern as Begin Adventure button
                interactiveSection.style.animation = 'fadeOut 0.5s ease-out';
                const header = document.querySelector('.header');
                if (header) {
                    header.style.display = 'none';
                }
                // Change background music to "Where No One Goes"
                if (backgroundMusic && isMusicPlaying) {
                    backgroundMusic.pause();
                    backgroundMusic.src = 'Where No One Goes.mp3';
                    backgroundMusic.load();
                    backgroundMusic.play().catch(error => {
                        console.log('Music autoplay prevented');
                    });
                }
                setTimeout(() => {
                    interactiveSection.style.display = 'none';
                    berkDestination.classList.remove('hidden');
                    berkDestination.style.animation = 'fadeIn 1s ease-in';
                }, 500);
                break;
            case '2':
                // Navigate to New Berk destination and play cutscene
                interactiveSection.style.animation = 'fadeOut 0.5s ease-out';
                {
                    const headerNewBerk = document.querySelector('.header');
                    if (headerNewBerk) {
                        headerNewBerk.style.display = 'none';
                    }
                }
                // Pause background music while cutscene plays
                if (backgroundMusic && isMusicPlaying) {
                    backgroundMusic.pause();
                    isMusicPlaying = false;
                    musicToggle.textContent = '🔇';
                    musicToggle.classList.add('muted');
                }
                setTimeout(() => {
                    interactiveSection.style.display = 'none';
                    if (newBerkDestination) {
                        newBerkDestination.classList.remove('hidden');
                        newBerkDestination.style.animation = 'fadeIn 1s ease-in';
                    }
                    if (newBerkVideo) {
                        newBerkVideo.currentTime = 5; // start at 0:05
                        newBerkVideo.style.display = 'block';
                        newBerkVideo.play().catch(error => {
                            console.log('Cutscene autoplay prevented', error);
                        });
                        newBerkVideo.onended = () => {
                            // Hide cutscene
                            newBerkVideo.style.display = 'none';
                            // Change to "friendship" music for New Berk
                            if (backgroundMusic) {
                                backgroundMusic.pause();
                                backgroundMusic.src = 'friendship.mp3';
                                backgroundMusic.load();
                                backgroundMusic.play().then(() => {
                                    isMusicPlaying = true;
                                    musicToggle.textContent = '🔊';
                                    musicToggle.classList.remove('muted');
                                }).catch(error => {
                                    console.log('Music autoplay prevented after cutscene', error);
                                });
                            }
                        };
                    }
                }, 500);
                break;
            case '3':
                // Navigate to Adventures (Flight Game)
                interactiveSection.style.animation = 'fadeOut 0.5s ease-out';
                const headerAdventures = document.querySelector('.header');
                if (headerAdventures) {
                    headerAdventures.style.display = 'none';
                }
                setTimeout(() => {
                    interactiveSection.style.display = 'none';
                    const adventuresDest = document.getElementById('adventuresDestination');
                    if (adventuresDest) {
                        adventuresDest.classList.remove('hidden');
                        adventuresDest.style.animation = 'fadeIn 1s ease-in';
                        startFlightGame();
                    }
                }, 500);
                break;
        }
        });
    });

    function showMessage(message) {
        // Create a temporary message element
        const messageEl = document.createElement('div');
        messageEl.className = 'message-popup';
        
        // Create text element with metallic styling
        const textEl = document.createElement('div');
        textEl.className = 'message-text';
        textEl.textContent = message;
        
        messageEl.appendChild(textEl);
        
        messageEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(192, 192, 192, 0.5);
            border-radius: 8px;
            padding: 2rem 3rem;
            z-index: 10000;
            animation: messagePop 0.5s ease-out;
            box-shadow: 
                0 4px 8px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 0 20px rgba(192, 192, 192, 0.3);
            min-width: 300px;
            text-align: center;
        `;
        
        // Style the text with metallic effect
        textEl.style.cssText = `
            font-size: 1.8rem;
            font-weight: 900;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            font-family: 'Georgia', 'Times New Roman', serif;
            background: linear-gradient(
                135deg,
                #e8e8e8 0%,
                #c0c0c0 25%,
                #a0a0a0 50%,
                #c0c0c0 75%,
                #e8e8e8 100%
            );
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: metallicShine 4s ease-in-out infinite;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 10px rgba(192, 192, 192, 0.3));
            line-height: 1.4;
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.animation = 'messageFadeOut 0.5s ease-out';
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 500);
        }, 2000);
    }

    // Save story to localStorage
    if (storyText) {
        storyText.addEventListener('input', () => {
            localStorage.setItem('ourStory', storyText.value);
        });
    }

    // Load saved story
    window.addEventListener('load', () => {
        const savedStory = localStorage.getItem('ourStory');
        if (savedStory && storyText) {
            storyText.value = savedStory;
        }
    });

    // Back button handler for Berk Island
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Hide destination section with fade out
            berkDestination.style.animation = 'fadeOut 0.5s ease-out';
            // Change background music back to "Test Driving Toothless"
            if (backgroundMusic && isMusicPlaying) {
                backgroundMusic.pause();
                backgroundMusic.src = 'Test Driving Toothless.mp3';
                backgroundMusic.load();
                backgroundMusic.play().catch(error => {
                    console.log('Music autoplay prevented');
                });
            }
            setTimeout(() => {
                berkDestination.classList.add('hidden');
                interactiveSection.style.display = 'block';
                const header = document.querySelector('.header');
                if (header) {
                    header.style.display = 'block';
                }
                interactiveSection.style.animation = 'fadeIn 1s ease-in';
                
                // Scroll to interactive section
                interactiveSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500);
        });
    }

    // Back button handler for New Berk
    if (newBerkBackBtn && newBerkDestination) {
        newBerkBackBtn.addEventListener('click', () => {
            newBerkDestination.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => {
                newBerkDestination.classList.add('hidden');
                interactiveSection.style.display = 'block';
                const header = document.querySelector('.header');
                if (header) {
                    header.style.display = 'block';
                }
                interactiveSection.style.animation = 'fadeIn 1s ease-in';

                // Stop and hide cutscene video
                if (newBerkVideo) {
                    newBerkVideo.pause();
                    newBerkVideo.style.display = 'none';
                }

                // Change background music back to "Test Driving Toothless"
                if (backgroundMusic && isMusicPlaying) {
                    backgroundMusic.pause();
                    backgroundMusic.src = 'Test Driving Toothless.mp3';
                    backgroundMusic.load();
                    backgroundMusic.play().catch(error => {
                        console.log('Music autoplay prevented', error);
                    });
                }

                // Scroll to interactive section
                interactiveSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500);
        });
    }

    // Cloud overlay click handler - reveal images
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item) => {
        const cloudOverlay = item.querySelector('.cloud-overlay');
        if (cloudOverlay) {
            cloudOverlay.addEventListener('click', (e) => {
                e.stopPropagation();
                // Add revealed class to cloud overlay
                cloudOverlay.classList.add('revealed');
                item.classList.add('revealed');
                
                // Add reveal animation to photo
                const photo = item.querySelector('.destination-photo');
                if (photo) {
                    photo.style.animation = 'fadeIn 1s ease-in, photoReveal 0.8s ease-out';
                }
            });
        }
    });

    // Torch game setup - create 22 scattered torches
    if (torchGame) {
        const TORCH_COUNT = 22;
        let foundCount = 0;
        
        // Phrase: "HAPPY 22ND BIRTHDAY LOVE" - only letters and numbers (21 characters)
        const phrase = "HAPPY22NDBIRTHDAYLOVE";
        const fullPhrase = "HAPPY 22ND BIRTHDAY LOVE";
        const torchLetters = [];

        const counter = document.createElement('div');
        counter.className = 'torch-counter';
        counter.textContent = `Torches found: 0 / ${TORCH_COUNT}`;
        torchGame.appendChild(counter);

        for (let i = 0; i < TORCH_COUNT; i++) {
            const torch = document.createElement('div');
            torch.className = 'torch';

            const flame = document.createElement('div');
            flame.className = 'torch-flame';
            const stick = document.createElement('div');
            stick.className = 'torch-stick';
            const cloud = document.createElement('div');
            cloud.className = 'torch-cloud';
            const island = document.createElement('div');
            island.className = 'torch-island';
            island.innerHTML = `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Simple cartoonish mountain base (like emoji style) -->
                    <path d="M 20 100 L 30 70 L 40 80 L 50 50 L 60 80 L 70 70 L 80 100 Z" fill="#8B9A46" stroke="#6B7A36" stroke-width="1"/>
                    
                    <!-- Simple green vegetation layer (cartoonish) -->
                    <path d="M 25 95 L 32 75 L 42 82 L 50 55 L 58 82 L 68 75 L 75 95 Z" fill="#6B8E3A" stroke="#5A7D2A" stroke-width="0.5"/>
                    
                    <!-- Simple cartoonish trees (triangular) -->
                    <path d="M 32 75 L 30 65 L 34 65 Z" fill="#4A6B2A"/>
                    <path d="M 48 55 L 46 45 L 50 45 Z" fill="#4A6B2A"/>
                    <path d="M 68 75 L 66 65 L 70 65 Z" fill="#4A6B2A"/>
                    
                    <!-- Simple cartoonish clouds (rounded, simple shapes) -->
                    <ellipse cx="30" cy="65" rx="10" ry="6" fill="#E8E8E8" opacity="0.8"/>
                    <ellipse cx="38" cy="67" rx="8" ry="5" fill="#E8E8E8" opacity="0.8"/>
                    <ellipse cx="50" cy="55" rx="12" ry="8" fill="#E8E8E8" opacity="0.85"/>
                    <ellipse cx="58" cy="57" rx="10" ry="6" fill="#E8E8E8" opacity="0.8"/>
                    <ellipse cx="70" cy="65" rx="8" ry="5" fill="#E8E8E8" opacity="0.8"/>
                    <ellipse cx="62" cy="67" rx="7" ry="4" fill="#E8E8E8" opacity="0.8"/>
                    
                    <!-- Additional simple cloud layers -->
                    <ellipse cx="35" cy="62" rx="6" ry="4" fill="#F0F0F0" opacity="0.7"/>
                    <ellipse cx="55" cy="52" rx="8" ry="5" fill="#F0F0F0" opacity="0.75"/>
                    <ellipse cx="65" cy="62" rx="6" ry="4" fill="#F0F0F0" opacity="0.7"/>
                </svg>
            `;
            
            // Add letter/number label to torch (only for first 21 torches)
            if (i < phrase.length) {
                const letterLabel = document.createElement('div');
                letterLabel.className = 'torch-letter';
                letterLabel.textContent = phrase[i];
                letterLabel.dataset.letterIndex = i;
                torch.appendChild(letterLabel);
                torchLetters.push({
                    element: letterLabel,
                    torch: torch,
                    letter: phrase[i]
                });
            }

            torch.appendChild(flame);
            torch.appendChild(stick);
            torch.appendChild(cloud);
            torch.appendChild(island);

            // Scatter torches across the game area (10%–85% range for better spacing)
            const top = 10 + Math.random() * 75;
            const left = 5 + Math.random() * 90;
            torch.style.top = `${top}%`;
            torch.style.left = `${left}%`;

            // Store initial position for animation
            torch.dataset.initialTop = top;
            torch.dataset.initialLeft = left;

            // Click to reveal torch through fog
            torch.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!torch.classList.contains('found')) {
                    torch.classList.add('found');
                    foundCount += 1;
                    counter.textContent = `Torches found: ${foundCount} / ${TORCH_COUNT}`;
                    
                    // Check if all torches are found
                    if (foundCount === TORCH_COUNT) {
                        setTimeout(() => {
                            animateBirthdayMessage(torchLetters, fullPhrase, torchGame);
                        }, 500);
                    }
                }
            });

            torchGame.appendChild(torch);
        }
    }
    
    // Function to show birthday message as popup (unskippable)
    function animateBirthdayMessage(torchLetters, fullPhrase, container) {
        // Hide all torches, flames, sticks, clouds, and islands
        const allTorches = container.querySelectorAll('.torch');
        allTorches.forEach(torch => {
            torch.style.opacity = '0';
            torch.style.transition = 'opacity 0.5s ease-out';
        });
        
        // Create full-screen overlay to prevent interaction (unskippable)
        const overlay = document.createElement('div');
        overlay.className = 'birthday-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 9999;
            pointer-events: auto;
            cursor: default;
        `;
        document.body.appendChild(overlay);
        
        // Prevent keyboard shortcuts (ESC, etc.) and clicks from skipping the message
        const preventSkip = (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        };
        
        const preventClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        };
        
        // Block all interactions at document level
        document.addEventListener('keydown', preventSkip, true);
        document.addEventListener('keyup', preventSkip, true);
        document.addEventListener('keypress', preventSkip, true);
        overlay.addEventListener('click', preventClick, true);
        overlay.addEventListener('mousedown', preventClick, true);
        overlay.addEventListener('mouseup', preventClick, true);
        
        // Store cleanup function
        overlay.cleanup = () => {
            document.removeEventListener('keydown', preventSkip, true);
            document.removeEventListener('keyup', preventSkip, true);
            document.removeEventListener('keypress', preventSkip, true);
        };
        
        // Create birthday message popup (same style as showMessage)
        const messageEl = document.createElement('div');
        messageEl.className = 'message-popup birthday-message-popup';
        
        // Create text element with metallic styling
        const textEl = document.createElement('div');
        textEl.className = 'message-text';
        textEl.textContent = fullPhrase; // "HAPPY 22ND BIRTHDAY LOVE"
        
        messageEl.appendChild(textEl);
        
        messageEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(192, 192, 192, 0.5);
            border-radius: 8px;
            padding: 3rem 4rem;
            z-index: 10000;
            animation: messagePop 0.5s ease-out;
            box-shadow: 
                0 4px 8px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 0 20px rgba(192, 192, 192, 0.3);
            min-width: 400px;
            text-align: center;
        `;
        
        // Style the text with metallic effect (same as showMessage)
        textEl.style.cssText = `
            font-size: 2.2rem;
            font-weight: 900;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            font-family: 'Georgia', 'Times New Roman', serif;
            background: linear-gradient(
                135deg,
                #e8e8e8 0%,
                #c0c0c0 25%,
                #a0a0a0 50%,
                #c0c0c0 75%,
                #e8e8e8 100%
            );
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: metallicShine 4s ease-in-out infinite;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 10px rgba(192, 192, 192, 0.3));
            line-height: 1.4;
        `;
        
        document.body.appendChild(messageEl);
        
        // Auto-close after 8 seconds (unskippable)
        setTimeout(() => {
            messageEl.style.animation = 'messageFadeOut 0.5s ease-out';
            
            // Clean up overlay
            if (overlay.cleanup) {
                overlay.cleanup();
            }
            overlay.style.transition = 'opacity 0.5s ease-out';
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                if (messageEl.parentElement) {
                    document.body.removeChild(messageEl);
                }
                if (overlay.parentElement) {
                    document.body.removeChild(overlay);
                }
                
                // Trigger Lightfury animation after message closes (only once)
                if (lightfury && !lightfuryHasAppeared) {
                    lightfuryHasAppeared = true;
                    lightfury.classList.remove('hidden');
                    lightfury.classList.add('show');
                    
                    // Hide Lightfury after animation completes (3 seconds)
                    setTimeout(() => {
                        lightfury.classList.add('hidden');
                        lightfury.classList.remove('show');
                        
                        // Show text messages after Lightfury passes
                        showLightfuryMessages();
                    }, 3000);
                }
            }, 500);
        }, 8000); // Display for 8 seconds
    }
    
    // Function to show Lightfury text messages (same style as birthday message)
    function showLightfuryMessages() {
        // First message
        const firstMessage = createMessagePopup("WOAH, what was that? did you see that toothless?");
        document.body.appendChild(firstMessage);
        
        // Show first message for 5 seconds, then show second message
        setTimeout(() => {
            firstMessage.style.animation = 'messageFadeOut 0.5s ease-out';
            
            setTimeout(() => {
                if (firstMessage.parentElement) {
                    document.body.removeChild(firstMessage);
                }
                
                // Second message
                const secondMessage = createMessagePopup("that looks like a nightfu- no a... lightfury?");
                document.body.appendChild(secondMessage);
                
                // Show second message for 5 seconds, then show third message
                setTimeout(() => {
                    secondMessage.style.animation = 'messageFadeOut 0.5s ease-out';
                    
                    setTimeout(() => {
                        if (secondMessage.parentElement) {
                            document.body.removeChild(secondMessage);
                        }
                        
                        // Third message
                        const thirdMessage = createMessagePopup("What do you say bud? let's follow that nightfury!");
                        document.body.appendChild(thirdMessage);
                        
                        // Show third message for 5 seconds, then show final message
                        setTimeout(() => {
                            thirdMessage.style.animation = 'messageFadeOut 0.5s ease-out';
                            setTimeout(() => {
                                if (thirdMessage.parentElement) {
                                    document.body.removeChild(thirdMessage);
                                }
                                
                                // Final message
                                const finalMessage = createMessagePopup("To be Continued....");
                                document.body.appendChild(finalMessage);
                                
                                // Show final message for 5 seconds, then close
                                setTimeout(() => {
                                    finalMessage.style.animation = 'messageFadeOut 0.5s ease-out';
                                    setTimeout(() => {
                                        if (finalMessage.parentElement) {
                                            document.body.removeChild(finalMessage);
                                        }
                                    }, 500);
                                }, 5000);
                            }, 500);
                        }, 5000);
                    }, 500);
                }, 5000);
            }, 500);
        }, 5000);
    }
    
    // Helper function to create message popup (same style as birthday message)
    function createMessagePopup(text) {
        const messageEl = document.createElement('div');
        messageEl.className = 'message-popup lightfury-message-popup';
        
        // Create text element with metallic styling
        const textEl = document.createElement('div');
        textEl.className = 'message-text';
        textEl.textContent = text;
        
        messageEl.appendChild(textEl);
        
        messageEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(192, 192, 192, 0.5);
            border-radius: 8px;
            padding: 3rem 4rem;
            z-index: 10000;
            animation: messagePop 0.5s ease-out;
            box-shadow: 
                0 4px 8px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 0 20px rgba(192, 192, 192, 0.3);
            min-width: 400px;
            text-align: center;
        `;
        
        // Style the text with metallic effect (same as birthday message)
        textEl.style.cssText = `
            font-size: 2.2rem;
            font-weight: 900;
            letter-spacing: 0.1em;
            text-transform: none;
            font-family: 'Georgia', 'Times New Roman', serif;
            background: linear-gradient(
                135deg,
                #e8e8e8 0%,
                #c0c0c0 25%,
                #a0a0a0 50%,
                #c0c0c0 75%,
                #e8e8e8 100%
            );
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: metallicShine 4s ease-in-out infinite;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 10px rgba(192, 192, 192, 0.3));
            line-height: 1.4;
        `;
        
        return messageEl;
    }
    
    // Flight Game Variables
    let flightGameActive = false;
    let flightAnimationId = null;
    let toothlessX = 150;
    let toothlessY = 300;
    let ringsCollected = 0;
    const TOTAL_RINGS = 33;
    let rings = [];
    let obstacles = [];
    let keys = { w: false, a: false, s: false, d: false };
    let lastRingSpawn = 0;
    let lastObstacleSpawn = 0;
    const RING_SPAWN_INTERVAL = 2000; // 2 seconds
    const OBSTACLE_SPAWN_INTERVAL = 1500; // 1.5 seconds
    const GAME_SPEED = 3; // pixels per frame
    
    // Flight Game Functions
    function startFlightGame() {
        const flightGame = document.getElementById('flightGame');
        const flightCounter = document.getElementById('flightCounter');
        const flightGameOver = document.getElementById('flightGameOver');
        const flightWin = document.getElementById('flightWin');
        
        if (!flightGame) return;
        
        // Reset game state
        flightGameActive = true;
        ringsCollected = 0;
        toothlessX = 150;
        toothlessY = 300;
        rings = [];
        obstacles = [];
        keys = { w: false, a: false, s: false, d: false };
        lastRingSpawn = 0;
        lastObstacleSpawn = 0;
        
        // Reset UI
        if (flightCounter) {
            flightCounter.textContent = `Rings: 0 / ${TOTAL_RINGS}`;
        }
        if (flightGameOver) {
            flightGameOver.classList.add('hidden');
        }
        if (flightWin) {
            flightWin.classList.add('hidden');
        }
        
        // Clear existing rings and obstacles
        const existingRings = flightGame.querySelectorAll('.flight-ring');
        existingRings.forEach(r => r.remove());
        const existingObstacles = flightGame.querySelectorAll('.flight-obstacle');
        existingObstacles.forEach(o => o.remove());
        
        // Set up keyboard controls
        setupKeyboardControls();
        
        // Set up mobile controls
        setupMobileControls();
        
        // Start game loop
        const gameRect = flightGame.getBoundingClientRect();
        let lastTime = performance.now();
        
        function gameLoop(currentTime) {
            if (!flightGameActive) return;
            
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;
            
            // Update Toothless position based on keys
            const speed = 5;
            if (keys.w && toothlessY > 50) toothlessY -= speed;
            if (keys.s && toothlessY < gameRect.height - 100) toothlessY += speed;
            if (keys.a && toothlessX > 50) toothlessX -= speed;
            if (keys.d && toothlessX < gameRect.width - 100) toothlessX += speed;
            
            // Update Toothless visual position
            const toothlessEl = flightGame.querySelector('.flight-toothless');
            if (toothlessEl) {
                toothlessEl.style.left = `${toothlessX}px`;
                toothlessEl.style.top = `${toothlessY}px`;
            }
            
            // Spawn rings
            if (currentTime - lastRingSpawn > RING_SPAWN_INTERVAL && rings.length < 10) {
                spawnRing(flightGame, gameRect);
                lastRingSpawn = currentTime;
            }
            
            // Spawn obstacles
            if (currentTime - lastObstacleSpawn > OBSTACLE_SPAWN_INTERVAL && obstacles.length < 8) {
                spawnObstacle(flightGame, gameRect);
                lastObstacleSpawn = currentTime;
            }
            
            // Update rings
            updateRings(flightGame, gameRect, toothlessX, toothlessY);
            
            // Update obstacles
            const gameOver = updateObstacles(flightGame, gameRect, toothlessX, toothlessY);
            
            if (gameOver) {
                endFlightGame(false);
                return;
            }
            
            // Check win condition
            if (ringsCollected >= TOTAL_RINGS) {
                endFlightGame(true);
                return;
            }
            
            flightAnimationId = requestAnimationFrame(gameLoop);
        }
        
        flightAnimationId = requestAnimationFrame(gameLoop);
    }
    
    function spawnRing(container, gameRect) {
        const ring = document.createElement('div');
        ring.className = 'flight-ring';
        const x = gameRect.width + 50;
        const y = 100 + Math.random() * (gameRect.height - 200);
        ring.style.left = `${x}px`;
        ring.style.top = `${y}px`;
        container.appendChild(ring);
        
        rings.push({
            element: ring,
            x: x,
            y: y,
            collected: false
        });
    }
    
    function spawnObstacle(container, gameRect) {
        const obstacle = document.createElement('div');
        // Randomly choose between rock and tree
        const obstacleType = Math.random() > 0.5 ? 'rock' : 'tree';
        obstacle.className = `flight-obstacle ${obstacleType}`;
        const x = gameRect.width + 50;
        
        let height, y;
        
        if (obstacleType === 'tree') {
            // Trees are planted on the ground - anchor to bottom
            // Random height for variety (120px to 200px)
            height = 120 + Math.random() * 80;
            // Position Y so tree bottom is at game bottom (ground level)
            y = gameRect.height - height;
            
            // Scale foliage size based on height
            const foliageScale = height / 140; // Base height is 140px
            const foliageWidth = 90 * foliageScale;
            const foliageHeight = 65 * foliageScale;
            obstacle.style.setProperty('--foliage-width', `${foliageWidth}px`);
            obstacle.style.setProperty('--foliage-height', `${foliageHeight}px`);
        } else {
            // Rocks can be at various heights
            height = 120;
            y = 100 + Math.random() * (gameRect.height - 200);
            
            // Random rock shape variation
            const rockShape = Math.floor(Math.random() * 4); // 0-3 for different shapes
            obstacle.classList.add(`rock-shape-${rockShape}`);
        }
        
        // Set position using fixed positioning relative to container
        obstacle.style.position = 'absolute';
        obstacle.style.left = `${x}px`;
        obstacle.style.top = `${y}px`;
        obstacle.style.height = `${height}px`;
        obstacle.style.margin = '0';
        obstacle.style.padding = '0';
        obstacle.style.transform = 'none';
        obstacle.style.willChange = 'left';
        
        // Add fog overlay to blend with environment (more fog at bottom)
        const fogOverlay = document.createElement('div');
        fogOverlay.className = 'obstacle-fog';
        obstacle.appendChild(fogOverlay);
        
        // For trees: add branch details for more realism
        if (obstacleType === 'tree') {
            // Add multiple small branch clusters
            for (let i = 0; i < 4; i++) {
                const branch = document.createElement('div');
                branch.className = 'tree-branch';
                const angle = (i * 90) - 45; // Spread branches around
                const distance = 15 + Math.random() * 10;
                branch.style.cssText = `
                    position: absolute;
                    bottom: ${60 + Math.random() * 30}px;
                    left: 50%;
                    width: ${8 + Math.random() * 4}px;
                    height: ${12 + Math.random() * 6}px;
                    background: radial-gradient(ellipse, rgba(30, 70, 30, 0.9) 0%, rgba(22, 50, 22, 0.7) 50%, transparent 100%);
                    border-radius: 50%;
                    transform: translateX(-50%) translateX(${Math.cos(angle * Math.PI / 180) * distance}px) translateY(${Math.sin(angle * Math.PI / 180) * distance}px);
                    z-index: 2;
                `;
                obstacle.appendChild(branch);
            }
        }
        
        container.appendChild(obstacle);
        
        obstacles.push({
            element: obstacle,
            x: x,
            y: y,
            type: obstacleType,
            height: height
        });
    }
    
    function updateRings(container, gameRect, toothlessX, toothlessY) {
        for (let i = rings.length - 1; i >= 0; i--) {
            const ring = rings[i];
            ring.x -= GAME_SPEED;
            ring.element.style.left = `${ring.x}px`;
            
            // Remove if off screen
            if (ring.x < -50) {
                ring.element.remove();
                rings.splice(i, 1);
                continue;
            }
            
            // Check collision
            if (!ring.collected) {
                const ringRect = ring.element.getBoundingClientRect();
                const gameRect2 = container.getBoundingClientRect();
                const ringCenterX = ringRect.left - gameRect2.left + ringRect.width / 2;
                const ringCenterY = ringRect.top - gameRect2.top + ringRect.height / 2;
                
                const dx = ringCenterX - toothlessX;
                const dy = ringCenterY - toothlessY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 60) {
                    ring.collected = true;
                    ringsCollected++;
                    ring.element.classList.add('collected');
                    
                    const flightCounter = document.getElementById('flightCounter');
                    if (flightCounter) {
                        flightCounter.textContent = `Rings: ${ringsCollected} / ${TOTAL_RINGS}`;
                    }
                    
                    setTimeout(() => {
                        if (ring.element.parentElement) {
                            ring.element.remove();
                        }
                        rings.splice(i, 1);
                    }, 200);
                }
            }
        }
    }
    
    function updateObstacles(container, gameRect, toothlessX, toothlessY) {
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obstacle = obstacles[i];
            obstacle.x -= GAME_SPEED;
            
            // Update ONLY X position (horizontal movement only)
            obstacle.element.style.left = `${obstacle.x}px`;
            // Force Y position to stay exactly where it was spawned - never change it
            obstacle.element.style.top = `${obstacle.y}px`;
            obstacle.element.style.bottom = 'auto';
            obstacle.element.style.transform = 'none';
            obstacle.element.style.transition = 'none';
            
            // Remove if off screen
            if (obstacle.x < -50) {
                obstacle.element.remove();
                obstacles.splice(i, 1);
                continue;
            }
            
            // Check collision using stored positions (not getBoundingClientRect to avoid layout issues)
            // Calculate obstacle center based on stored x, y and known dimensions
            let obstacleWidth;
            if (obstacle.type === 'tree') {
                obstacleWidth = 40;
            } else {
                // Different rock shapes have different widths
                const rockShape = obstacle.element.classList.contains('rock-shape-0') ? 0 :
                                 obstacle.element.classList.contains('rock-shape-1') ? 1 :
                                 obstacle.element.classList.contains('rock-shape-2') ? 2 :
                                 obstacle.element.classList.contains('rock-shape-3') ? 3 : 0;
                obstacleWidth = [48, 52, 46, 50][rockShape] || 50;
            }
            const obstacleHeight = obstacle.height || (obstacle.type === 'tree' ? 140 : 120);
            const obstacleCenterX = obstacle.x + obstacleWidth / 2;
            const obstacleCenterY = obstacle.y + obstacleHeight / 2;
            
            // Use different collision radius based on obstacle type
            const collisionRadius = obstacle.type === 'tree' ? 45 : 40;
            
            const dx = obstacleCenterX - toothlessX;
            const dy = obstacleCenterY - toothlessY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < collisionRadius) {
                return true; // Game over
            }
        }
        return false;
    }
    
    function endFlightGame(won) {
        flightGameActive = false;
        if (flightAnimationId) {
            cancelAnimationFrame(flightAnimationId);
            flightAnimationId = null;
        }
        
        const flightGameOver = document.getElementById('flightGameOver');
        const flightWin = document.getElementById('flightWin');
        
        if (won && flightWin) {
            flightWin.classList.remove('hidden');
        } else if (flightGameOver) {
            flightGameOver.classList.remove('hidden');
        }
        
        // Clean up controls
        cleanupControls();
    }
    
    function restartFlightGame() {
        const flightGameOver = document.getElementById('flightGameOver');
        const flightWin = document.getElementById('flightWin');
        
        // Hide game over/win screens
        if (flightGameOver) {
            flightGameOver.classList.add('hidden');
        }
        if (flightWin) {
            flightWin.classList.add('hidden');
        }
        
        // Restart the game
        startFlightGame();
    }
    
    function setupKeyboardControls() {
        const handleKeyDown = (e) => {
            if (e.key === 'w' || e.key === 'W') keys.w = true;
            if (e.key === 'a' || e.key === 'A') keys.a = true;
            if (e.key === 's' || e.key === 'S') keys.s = true;
            if (e.key === 'd' || e.key === 'D') keys.d = true;
        };
        
        const handleKeyUp = (e) => {
            if (e.key === 'w' || e.key === 'W') keys.w = false;
            if (e.key === 'a' || e.key === 'A') keys.a = false;
            if (e.key === 's' || e.key === 'S') keys.s = false;
            if (e.key === 'd' || e.key === 'D') keys.d = false;
        };
        
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        
        // Store cleanup function
        window._flightKeyHandlers = { handleKeyDown, handleKeyUp };
    }
    
    function setupMobileControls() {
        const mobileUp = document.getElementById('mobileUp');
        const mobileDown = document.getElementById('mobileDown');
        const mobileLeft = document.getElementById('mobileLeft');
        const mobileRight = document.getElementById('mobileRight');
        
        if (mobileUp) {
            mobileUp.addEventListener('touchstart', (e) => { e.preventDefault(); keys.w = true; });
            mobileUp.addEventListener('touchend', (e) => { e.preventDefault(); keys.w = false; });
        }
        if (mobileDown) {
            mobileDown.addEventListener('touchstart', (e) => { e.preventDefault(); keys.s = true; });
            mobileDown.addEventListener('touchend', (e) => { e.preventDefault(); keys.s = false; });
        }
        if (mobileLeft) {
            mobileLeft.addEventListener('touchstart', (e) => { e.preventDefault(); keys.a = true; });
            mobileLeft.addEventListener('touchend', (e) => { e.preventDefault(); keys.a = false; });
        }
        if (mobileRight) {
            mobileRight.addEventListener('touchstart', (e) => { e.preventDefault(); keys.d = true; });
            mobileRight.addEventListener('touchend', (e) => { e.preventDefault(); keys.d = false; });
        }
    }
    
    function cleanupControls() {
        if (window._flightKeyHandlers) {
            document.removeEventListener('keydown', window._flightKeyHandlers.handleKeyDown);
            document.removeEventListener('keyup', window._flightKeyHandlers.handleKeyUp);
            delete window._flightKeyHandlers;
        }
    }
    
    // Back button handler for Adventures
    const adventuresBackBtn = document.getElementById('adventuresBackBtn');
    if (adventuresBackBtn) {
        adventuresBackBtn.addEventListener('click', () => {
            endFlightGame(false);
            const adventuresDestination = document.getElementById('adventuresDestination');
            if (adventuresDestination) {
                adventuresDestination.style.animation = 'fadeOut 0.5s ease-out';
                setTimeout(() => {
                    adventuresDestination.classList.add('hidden');
                    interactiveSection.style.display = 'block';
                    const header = document.querySelector('.header');
                    if (header) {
                        header.style.display = 'block';
                    }
                    interactiveSection.style.animation = 'fadeIn 1s ease-in';
                }, 500);
            }
        });
    }
    
    // Try Again button handler for Flight Game
    const flightTryAgainBtn = document.getElementById('flightTryAgainBtn');
    if (flightTryAgainBtn) {
        flightTryAgainBtn.addEventListener('click', () => {
            restartFlightGame();
        });
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes photoPop {
        0% {
            transform: scale(0.8);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes cardClick {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.95);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes messagePop {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes messageFadeOut {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Toothless animation is now handled entirely by CSS for smooth, realistic flight

// Add sparkle effect on interactive elements
interactiveCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        createSparkles(card);
    });
});

function createSparkles(element) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkle 1s ease-out forwards;
            z-index: 10;
        `;
        element.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentElement) {
                sparkle.parentElement.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: scale(0) translate(0, 0);
        }
        50% {
            opacity: 1;
            transform: scale(1) translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px);
        }
        100% {
            opacity: 0;
            transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Cookie Banner Generator Extension - Connected to cookie-banner.ca
document.addEventListener('DOMContentLoaded', function() {
    // Configuration - Updated to use your actual domain
    const API_BASE_URL = 'https://www.cookie-banner.ca';
    let isLoggedIn = false;
    let currentUser: any = null;
    let currentBannerConfig: any = null;

    // DOM elements
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const bannerBuilder = document.getElementById('banner-builder');
    const codeSection = document.getElementById('code-section');

    // Form elements
    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    const signupForm = document.getElementById('signup-form') as HTMLFormElement;
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    const logoutBtn = document.getElementById('logout-btn');

    // Banner customization elements
    const bannerTitle = document.getElementById('banner-title') as HTMLInputElement;
    const bannerText = document.getElementById('banner-text') as HTMLTextAreaElement;
    const primaryColor = document.getElementById('primary-color') as HTMLInputElement;
    const textColor = document.getElementById('text-color') as HTMLInputElement;
    const acceptText = document.getElementById('accept-text') as HTMLInputElement;
    const settingsText = document.getElementById('settings-text') as HTMLInputElement;
    const bannerPosition = document.getElementById('banner-position') as HTMLSelectElement;

    // Preview elements
    const bannerPreview = document.getElementById('banner-preview');
    const generatedCode = document.getElementById('generated-code');

    // Action buttons
    const generateCodeBtn = document.getElementById('generate-code');
    const insertBannerBtn = document.getElementById('insert-banner');
    const copyCodeBtn = document.getElementById('copy-code');

    // Initialize the app
    init();

    function init() {
        setupEventListeners();
        updatePreview();
        checkAuthState();
    }

    function setupEventListeners() {
        // Authentication
        loginForm.addEventListener('submit', handleLogin);
        signupForm.addEventListener('submit', handleSignup);
        showSignupLink?.addEventListener('click', showSignup);
        showLoginLink?.addEventListener('click', showLogin);
        logoutBtn?.addEventListener('click', handleLogout);

        // Banner customization
        [bannerTitle, bannerText, primaryColor, textColor, acceptText, settingsText, bannerPosition]
            .forEach(element => element?.addEventListener('input', updatePreview));

        // Actions
        generateCodeBtn?.addEventListener('click', handleGenerateCode);
        insertBannerBtn?.addEventListener('click', handleInsertBanner);
        copyCodeBtn?.addEventListener('click', handleCopyCode);
    }

    function checkAuthState() {
        // Check if user is logged in via your existing auth system
        const token = localStorage.getItem('auth-token');
        const user = localStorage.getItem('currentUser');
        
        if (token && user) {
            try {
                currentUser = JSON.parse(user);
                isLoggedIn = true;
                showBannerBuilder();
                loadUserBanners();
            } catch (error) {
                console.error('Error parsing user data:', error);
                handleLogout();
            }
        }
    }

    async function handleLogin(e: Event) {
        e.preventDefault();
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        try {
            await webflow.notify({ type: 'Info', message: 'Signing you in...' });
            
            // Call your existing auth API
            const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                currentUser = data.user;
                isLoggedIn = true;
                
                // Store auth data
                localStorage.setItem('auth-token', data.token);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                showBannerBuilder();
                await loadUserBanners();
                await webflow.notify({ type: 'Success', message: 'Successfully logged in!' });
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            await webflow.notify({ type: 'Error', message: 'Login failed. Please check your credentials.' });
        }
    }

    async function handleSignup(e: Event) {
        e.preventDefault();
        const name = (document.getElementById('signup-name') as HTMLInputElement).value;
        const email = (document.getElementById('signup-email') as HTMLInputElement).value;
        const password = (document.getElementById('signup-password') as HTMLInputElement).value;

        try {
            await webflow.notify({ type: 'Info', message: 'Creating your account...' });
            
            // Call your existing signup API
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                currentUser = data.user;
                isLoggedIn = true;
                
                // Store auth data
                localStorage.setItem('auth-token', data.token);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                showBannerBuilder();
                await webflow.notify({ type: 'Success', message: 'Account created successfully!' });
            } else {
                throw new Error('Signup failed');
            }
        } catch (error) {
            await webflow.notify({ type: 'Error', message: 'Signup failed. Please try again.' });
        }
    }

    function handleLogout() {
        isLoggedIn = false;
        currentUser = null;
        localStorage.removeItem('auth-token');
        localStorage.removeItem('currentUser');
        showLogin();
    }

    function showLogin() {
        hideAllSections();
        loginSection?.classList.remove('hidden');
    }

    function showSignup() {
        hideAllSections();
        signupSection?.classList.remove('hidden');
    }

    function showBannerBuilder() {
        hideAllSections();
        bannerBuilder?.classList.remove('hidden');
    }

    function hideAllSections() {
        [loginSection, signupSection, bannerBuilder, codeSection].forEach(section => {
            section?.classList.add('hidden');
        });
    }

    async function loadUserBanners() {
        if (!isLoggedIn) return;

        try {
            const token = localStorage.getItem('auth-token');
            const response = await fetch(`${API_BASE_URL}/api/banners`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const banners = await response.json();
                if (banners.length > 0) {
                    // Load the first banner as default
                    currentBannerConfig = banners[0];
                    populateBannerForm(currentBannerConfig);
                }
            }
        } catch (error) {
            console.error('Error loading user banners:', error);
        }
    }

    function populateBannerForm(config: any) {
        bannerTitle.value = config.title || 'We use cookies';
        bannerText.value = config.message || 'We use cookies to enhance your browsing experience.';
        primaryColor.value = config.primaryColor || '#0073e6';
        textColor.value = config.textColor || '#ffffff';
        acceptText.value = config.acceptButton || 'Accept All';
        settingsText.value = config.preferencesButton || 'Cookie Settings';
        bannerPosition.value = config.position || 'bottom';
        
        updatePreview();
    }

    function updatePreview() {
        if (!isLoggedIn) return;

        const title = bannerTitle.value;
        const text = bannerText.value;
        const primary = primaryColor.value;
        const textCol = textColor.value;
        const accept = acceptText.value;
        const settings = settingsText.value;

        // Update preview HTML
        const previewContent = bannerPreview?.querySelector('.banner-content') as HTMLElement;
        if (previewContent) {
            previewContent.style.backgroundColor = primary;
            previewContent.style.color = textCol;

            const previewTitle = previewContent.querySelector('h4');
            const previewText = previewContent.querySelector('p');
            const previewAccept = previewContent.querySelector('.btn-accept');
            const previewSettings = previewContent.querySelector('.btn-settings');

            if (previewTitle) previewTitle.textContent = title;
            if (previewText) previewText.textContent = text;
            if (previewAccept) {
                previewAccept.textContent = accept;
                (previewAccept as HTMLElement).style.backgroundColor = textCol;
                (previewAccept as HTMLElement).style.color = primary;
            }
            if (previewSettings) {
                previewSettings.textContent = settings;
                (previewSettings as HTMLElement).style.borderColor = textCol;
                (previewSettings as HTMLElement).style.color = textCol;
            }
        }
    }

    async function handleGenerateCode() {
        try {
            await webflow.notify({ type: 'Info', message: 'Generating your banner code...' });
            
            const bannerData = getBannerData();
            const code = await generateBannerCodeFromAPI(bannerData);
            
            if (generatedCode) {
                generatedCode.textContent = code;
            }
            codeSection?.classList.remove('hidden');
            
            await webflow.notify({ type: 'Success', message: 'Code generated successfully!' });
        } catch (error) {
            await webflow.notify({ type: 'Error', message: 'Failed to generate code. Please try again.' });
        }
    }

    async function handleInsertBanner() {
        try {
            const el = await webflow.getSelectedElement();
            if (el && el.textContent) {
                const bannerData = getBannerData();
                const code = await generateBannerCodeFromAPI(bannerData);
                el.setTextContent(code);
                await webflow.notify({ type: 'Success', message: 'Banner code inserted into selected element!' });
            } else {
                await webflow.notify({ type: 'Error', message: 'Please select a text element to insert the code.' });
            }
        } catch (error) {
            await webflow.notify({ type: 'Error', message: 'Failed to insert banner code.' });
        }
    }

    async function handleCopyCode() {
        try {
            if (generatedCode) {
                await navigator.clipboard.writeText(generatedCode.textContent || '');
                await webflow.notify({ type: 'Success', message: 'Code copied to clipboard!' });
            }
        } catch (error) {
            await webflow.notify({ type: 'Error', message: 'Failed to copy code.' });
        }
    }

    function getBannerData() {
        return {
            title: bannerTitle.value,
            message: bannerText.value,
            primaryColor: primaryColor.value,
            textColor: textColor.value,
            acceptButton: acceptText.value,
            preferencesButton: settingsText.value,
            position: bannerPosition.value,
            theme: primaryColor.value === '#ffffff' ? 'light' : 'dark'
        };
    }

    async function generateBannerCodeFromAPI(bannerData: any) {
        const token = localStorage.getItem('auth-token');
        
        // Save banner configuration to your backend
        const saveResponse = await fetch(`${API_BASE_URL}/api/banners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(bannerData),
        });

        if (!saveResponse.ok) {
            throw new Error('Failed to save banner configuration');
        }

        const savedBanner = await saveResponse.json();
        
        // Generate the actual code using your existing system
        const codeResponse = await fetch(`${API_BASE_URL}/api/banners/${savedBanner.id}/code`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!codeResponse.ok) {
            throw new Error('Failed to generate code');
        }

        const codeData = await codeResponse.json();
        return codeData.code;
    }
});

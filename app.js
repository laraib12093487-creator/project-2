// ===== Certificate Generator App =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize date
    const dateInput = document.getElementById('date');
    const today = new Date();
    dateInput.value = today.toISOString().split('T')[0];

    // ===== Template Switching =====
    const templateBtns = document.querySelectorAll('.template-btn');
    const allTemplates = document.querySelectorAll('.certificate-template');

    // Map template names to their DOM elements
    const templateElements = {
        classic: document.getElementById('certTemplate'),
        modern: document.getElementById('certTemplateModern'),
        corporate: document.getElementById('certTemplateCorporate'),
        creative: document.getElementById('certTemplateCreative'),
        vintage: document.getElementById('certTemplateVintage'),
        minimal: document.getElementById('certTemplateMinimal')
    };

    function switchTemplate(templateName) {
        // Hide all templates
        allTemplates.forEach(t => {
            t.style.display = 'none';
        });

        // Show selected template
        const selected = templateElements[templateName];
        if (selected) {
            selected.style.display = 'block';
        }
    }

    templateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            templateBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            switchTemplate(this.dataset.template);
        });
    });

    // ===== Showcase Template Click =====
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach(item => {
        item.addEventListener('click', function() {
            const template = this.dataset.template;
            document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
            templateBtns.forEach(b => {
                b.classList.toggle('active', b.dataset.template === template);
            });
            switchTemplate(template);
        });
    });

    // ===== Live Preview Updates =====
    const recipientName = document.getElementById('recipientName');
    const certificateTitle = document.getElementById('certificateTitle');
    const description = document.getElementById('description');
    const dateField = document.getElementById('date');
    const signature = document.getElementById('signature');
    const organization = document.getElementById('organization');

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function updatePreview() {
        const name = recipientName.value || 'Recipient Name';
        const title = certificateTitle.value || 'Certificate';
        const desc = description.value || 'For outstanding achievement';
        const date = formatDate(dateField.value);
        const sig = signature.value || 'Signature';
        const org = organization.value || 'Organization';

        // Update all templates
        allTemplates.forEach(template => {
            const nameEl = template.querySelector('.cert-name');
            const titleEl = template.querySelector('.cert-title');
            const descEl = template.querySelector('.cert-description');
            const dateEl = template.querySelector('.cert-date');
            const sigEl = template.querySelector('.cert-signature');
            const orgEl = template.querySelector('.cert-organization');

            if (nameEl) nameEl.textContent = name;
            if (titleEl) titleEl.textContent = title;
            if (descEl) descEl.textContent = desc;
            if (dateEl) dateEl.textContent = date;
            if (sigEl) sigEl.textContent = sig;
            if (orgEl) orgEl.textContent = org;
        });
    }

    [recipientName, certificateTitle, description, dateField, signature, organization].forEach(field => {
        field.addEventListener('input', updatePreview);
    });

    // ===== Color Scheme Switching =====
    const colorSchemes = document.querySelectorAll('.color-scheme');

    const schemeColors = {
        gold: { primary: '#D4AF37', secondary: '#1a365d', accent: '#f0d060' },
        emerald: { primary: '#10b981', secondary: '#064e3b', accent: '#34d399' },
        royal: { primary: '#8b5cf6', secondary: '#4c1d95', accent: '#a78bfa' },
        crimson: { primary: '#ef4444', secondary: '#7f1d1d', accent: '#f87171' },
        ocean: { primary: '#3b82f6', secondary: '#1e3a5f', accent: '#60a5fa' },
        rose: { primary: '#f43f5e', secondary: '#881337', accent: '#fb7185' }
    };

    colorSchemes.forEach(btn => {
        btn.addEventListener('click', function() {
            colorSchemes.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const scheme = this.dataset.scheme;
            const colors = schemeColors[scheme];

            if (colors) {
                // Apply colors to all templates
                allTemplates.forEach(template => {
                    const templateClass = Array.from(template.classList).find(c => c.startsWith('template-'));
                    if (!templateClass) return;

                    const templateName = templateClass.replace('template-', '');

                    switch(templateName) {
                        case 'classic':
                            template.style.setProperty('--gold', colors.primary);
                            template.style.setProperty('--navy', colors.secondary);
                            break;
                        case 'modern':
                            template.style.setProperty('--modern-primary', colors.primary);
                            break;
                        case 'corporate':
                            template.style.setProperty('--corp-primary', colors.secondary);
                            break;
                        case 'creative':
                            template.style.setProperty('--creative-primary', colors.primary);
                            break;
                        case 'vintage':
                            template.style.setProperty('--vintage-primary', colors.primary);
                            break;
                        case 'minimal':
                            template.style.setProperty('--minimal-primary', colors.secondary);
                            break;
                    }
                });
            }
        });
    });

    // ===== Font Style Switching =====
    const fontBtns = document.querySelectorAll('.font-btn');

    const fontFamilies = {
        playfair: "'Playfair Display', serif",
        montserrat: "'Montserrat', sans-serif",
        cormorant: "'Cormorant Garamond', serif",
        lora: "'Lora', serif"
    };

    fontBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            fontBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const font = this.dataset.font;
            const fontFamily = fontFamilies[font];

            if (fontFamily) {
                // Apply font to all certificate text elements across all templates
                allTemplates.forEach(template => {
                    const textElements = template.querySelectorAll('.cert-title, .cert-name, .cert-description, .cert-date, .cert-signature, .cert-organization, .cert-subtitle');
                    textElements.forEach(el => {
                        el.style.fontFamily = fontFamily;
                    });
                });
            }
        });
    });

    // ===== Zoom Controls =====
    const previewCanvas = document.getElementById('previewCanvas');
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const zoomLevel = document.getElementById('zoomLevel');
    let currentZoom = 100;

    zoomIn.addEventListener('click', function() {
        if (currentZoom < 150) {
            currentZoom += 10;
            applyZoom();
        }
    });

    zoomOut.addEventListener('click', function() {
        if (currentZoom > 50) {
            currentZoom -= 10;
            applyZoom();
        }
    });

    function applyZoom() {
        previewCanvas.style.transform = `scale(${currentZoom / 100})`;
        zoomLevel.textContent = currentZoom + '%';
    }

    // ===== Download as PNG =====
    const downloadBtn = document.getElementById('downloadBtn');

    downloadBtn.addEventListener('click', function() {
        // Show loading state
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<span class="spinner"></span> Generating...';
        downloadBtn.disabled = true;

        // Find the currently visible template
        let visibleTemplate = null;
        allTemplates.forEach(t => {
            if (t.style.display !== 'none') {
                visibleTemplate = t;
            }
        });

        if (!visibleTemplate) {
            visibleTemplate = allTemplates[0];
        }

        // Use html2canvas to capture the certificate
        html2canvas(visibleTemplate, {
            scale: 3,
            useCORS: true,
            backgroundColor: null,
            logging: false
        }).then(canvas => {
            // Create download link
            const link = document.createElement('a');
            link.download = `certificate-${recipientName.value.replace(/\s+/g, '-').toLowerCase()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            // Reset button
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }).catch(error => {
            console.error('Error generating certificate:', error);
            alert('Error generating certificate. Please try again.');
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        });
    });

    // ===== Print =====
    const printBtn = document.getElementById('printBtn');

    printBtn.addEventListener('click', function() {
        window.print();
    });

    // ===== Smooth Scroll for Nav Links =====
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== Navbar Background on Scroll =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // ===== Logo Upload =====
    const logoUpload = document.getElementById('logoUpload');
    const logoUploadArea = document.getElementById('logoUploadArea');
    const logoPlaceholder = document.getElementById('logoPlaceholder');
    const logoPreviewContainer = document.getElementById('logoPreviewContainer');
    const logoPreview = document.getElementById('logoPreview');
    const removeLogoBtn = document.getElementById('removeLogoBtn');
    const logoStyleSection = document.getElementById('logoStyleSection');

    let uploadedLogoSrc = '';

    // Click on upload area triggers file input
    logoUploadArea.addEventListener('click', function(e) {
        if (e.target !== removeLogoBtn && !removeLogoBtn.contains(e.target)) {
            logoUpload.click();
        }
    });

    // Handle file selection
    logoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a PNG, JPG, SVG, or WebP image.');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('File size must be less than 2MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedLogoSrc = event.target.result;
            logoPreview.src = uploadedLogoSrc;
            logoPlaceholder.style.display = 'none';
            logoPreviewContainer.style.display = 'inline-block';
            logoStyleSection.style.display = 'block';

            // Update all certificate templates with the logo
            updateCertificateLogos();
        };
        reader.readAsDataURL(file);
    });

    // Remove logo
    removeLogoBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        uploadedLogoSrc = '';
        logoUpload.value = '';
        logoPreview.src = '';
        logoPlaceholder.style.display = 'flex';
        logoPreviewContainer.style.display = 'none';
        logoStyleSection.style.display = 'none';

        // Remove logo from all templates
        updateCertificateLogos();
    });

    // Update logos across all certificate templates
    function updateCertificateLogos() {
        allTemplates.forEach(template => {
            const defaultIcon = template.querySelector('.cert-logo-default');
            const logoImg = template.querySelector('.cert-logo-img');

            if (uploadedLogoSrc) {
                if (defaultIcon) defaultIcon.style.display = 'none';
                if (logoImg) {
                    logoImg.src = uploadedLogoSrc;
                    logoImg.style.display = 'block';
                }
            } else {
                if (defaultIcon) defaultIcon.style.display = 'block';
                if (logoImg) logoImg.style.display = 'none';
            }
        });
    }

    // ===== Logo Style Controls =====

    // Size
    const logoSizeBtns = document.querySelectorAll('.logo-size-btn');
    logoSizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            logoSizeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const size = this.dataset.size;
            allTemplates.forEach(template => {
                const logoImg = template.querySelector('.cert-logo-img');
                if (logoImg) {
                    logoImg.classList.remove('logo-size-small', 'logo-size-medium', 'logo-size-large', 'logo-size-xlarge');
                    logoImg.classList.add(`logo-size-${size}`);
                }
            });
        });
    });

    // Shape
    const logoShapeBtns = document.querySelectorAll('.logo-shape-btn');
    logoShapeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            logoShapeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const shape = this.dataset.shape;
            allTemplates.forEach(template => {
                const logoImg = template.querySelector('.cert-logo-img');
                if (logoImg) {
                    logoImg.classList.remove('logo-shape-rounded', 'logo-shape-circle', 'logo-shape-square');
                    if (shape !== 'none') {
                        logoImg.classList.add(`logo-shape-${shape}`);
                    }
                }
            });
        });
    });

    // Border
    const logoBorderBtns = document.querySelectorAll('.logo-border-btn');
    logoBorderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            logoBorderBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const border = this.dataset.border;
            allTemplates.forEach(template => {
                const logoImg = template.querySelector('.cert-logo-img');
                if (logoImg) {
                    logoImg.classList.remove('logo-border-thin', 'logo-border-thick', 'logo-border-double');
                    if (border !== 'none') {
                        logoImg.classList.add(`logo-border-${border}`);
                    }
                }
            });
        });
    });

    // Shadow
    const logoShadowBtns = document.querySelectorAll('.logo-shadow-btn');
    logoShadowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            logoShadowBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const shadow = this.dataset.shadow;
            allTemplates.forEach(template => {
                const logoImg = template.querySelector('.cert-logo-img');
                if (logoImg) {
                    logoImg.classList.remove('logo-shadow-soft', 'logo-shadow-medium', 'logo-shadow-strong');
                    if (shadow !== 'none') {
                        logoImg.classList.add(`logo-shadow-${shadow}`);
                    }
                }
            });
        });
    });

    // Position
    const logoPositionBtns = document.querySelectorAll('.logo-position-btn');
    logoPositionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            logoPositionBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const position = this.dataset.position;
            allTemplates.forEach(template => {
                const logoImg = template.querySelector('.cert-logo-img');
                if (logoImg) {
                    logoImg.classList.remove('logo-position-top-center', 'logo-position-top-left', 'logo-position-top-right', 'logo-position-bottom-center');
                    logoImg.classList.add(`logo-position-${position}`);
                }
            });
        });
    });

    // ===== Initialize =====
    updatePreview();
});
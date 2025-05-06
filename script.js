// 👁 Toggle affichage mot de passe
document.querySelectorAll('.input-group-text').forEach(toggle => {
    toggle.addEventListener('click', function () {
        const input = this.previousElementSibling;
        if (input && input.type === 'password') {
            input.type = 'text';
            this.textContent = '👀';
        } else if (input) {
            input.type = 'password';
            this.textContent = '👁';
        }
    });
});

// 📧 Initialisation EmailJS
(function () {
    emailjs.init("0PbP-28fhj6A3LEY-"); // Clé publique EmailJS
})();

// ✉️ Soumission du formulaire
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm('service_vhorgta', 'template_yiipdpf', this)
        .then(function (response) {
            showFormMessage(true); // ✅ message vert
            document.getElementById('contact-form').reset();
            document.getElementById('photoPreview').src = '';
            document.getElementById('photoPreview').classList.remove('show');
            document.getElementById('messageBox').style.display = 'none';
            document.getElementById('messageToggle').checked = false;
        }, function (error) {
            showFormMessage(false); // ❌ message rouge
        });
});

// 📷 Preview image
document.getElementById('photo').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const preview = document.getElementById('photoPreview');

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.classList.add('show');
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.classList.remove('show');
    }
});

// 🔁 Réinitialisation de la preview image + message
document.getElementById('resetBtn').addEventListener('click', function () {
    const preview = document.getElementById('photoPreview');
    preview.src = '';
    preview.classList.remove('show');
    document.getElementById('messageBox').style.display = 'none';
    document.getElementById('messageToggle').checked = false;
});

// 💬 Affichage message supplémentaire
document.getElementById('messageToggle').addEventListener('change', function () {
    document.getElementById('messageBox').style.display = this.checked ? 'block' : 'none';
});

// 🎨 Changer le thème
document.querySelectorAll('.theme-color').forEach(color => {
    color.addEventListener('click', function () {
        const theme = this.getAttribute('data-theme').split(',');
        const borderColor = theme[1];
        const title = this.getAttribute('data-title');

        document.querySelectorAll('.form-control, .form-select, .input-group-text').forEach(el => {
            el.style.borderColor = borderColor;
        });

        document.querySelectorAll('.btn-primary').forEach(el => {
            el.style.backgroundColor = borderColor;
        });

        document.querySelectorAll('h2, .section-title').forEach(el => {
            el.style.color = borderColor;
        });

        document.title = title;
        document.querySelector('h2').textContent = title;
    });
});

// ✅ Message de feedback
function showFormMessage(success) {
    const toastContainer = document.getElementById('formToast');
    const toast = document.createElement('div');

    toast.className = `toast-custom ${success ? 'toast-success' : 'toast-error'}`;
    toast.textContent = success ? '✅ Mail bien envoyé !' : '❌ Échec de l’envoi du mail.';

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);
}

  // Désactiver le clic droit
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // Désactiver les raccourcis clavier liés à l'inspecteur
  document.addEventListener("keydown", function (e) {
    // F12
    if (e.key === "F12") {
      e.preventDefault();
    }

    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) {
      e.preventDefault();
    }

    // Ctrl+U (affichage du code source)
    if (e.ctrlKey && e.key === "u") {
      e.preventDefault();
    }
  });

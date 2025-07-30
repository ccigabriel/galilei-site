document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling para links internos ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verifica se o link é para uma âncora na mesma página
            if (this.hash !== "") {
                // Previne o comportamento padrão do link
                e.preventDefault();

                const hash = this.hash;
                const targetElement = document.querySelector(hash);

                if (targetElement) {
                    // Calcula a posição do elemento alvo ajustando pela altura da navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                    // Rola suavemente até a posição calculada
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Opcional: Fecha o menu hamburguer em mobile após clicar
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarToggler && navbarCollapse.classList.contains('show')) {
                         var bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: false // Evita que ele tente abrir/fechar novamente
                        });
                        bsCollapse.hide();
                    }

                    // Opcional: Atualiza a classe 'active' no link clicado (remove de outros)
                    navLinks.forEach(lnk => lnk.classList.remove('active'));
                    this.classList.add('active');
                     // Adiciona o estado ativo ao link da página atual no histórico
                     if (history.pushState) {
                        history.pushState(null, null, hash);
                    } else {
                        location.hash = hash; // Fallback para navegadores antigos
                    }
                }
            }
        });
    });

    // --- Atualizar link ativo ao rolar a página ---
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    function updateActiveLink() {
        let index = sections.length;

        while(--index && window.scrollY + navbarHeight + 50 < sections[index].offsetTop) {} // O +50 é um pequeno offset

        navLinks.forEach((link) => link.classList.remove('active'));

        // Adiciona a classe 'active' ao link correspondente à seção visível
        // Certifica-se de que o link existe antes de adicionar a classe
        let activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${sections[index].id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Executa na carga inicial e ao rolar
    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink);

    // --- Opcional: Efeito sutil na Navbar ao rolar ---
    const navbar = document.querySelector('.navbar-custom');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                // Pode adicionar uma classe para mudar o estilo se quiser
                // navbar.classList.add('navbar-scrolled');
                // Ou apenas mudar o estilo diretamente (menos performático)
                // navbar.style.backgroundColor = 'rgba(32, 16, 135, 0.95)'; // Exemplo
                // navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            } else {
                // navbar.classList.remove('navbar-scrolled');
                // navbar.style.backgroundColor = 'var(--primary-color)';
                // navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }
        });
    }


    // --- Adicionar classe 'loaded' ao body após o carregamento completo (para animações CSS iniciais, se houver)
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    

});
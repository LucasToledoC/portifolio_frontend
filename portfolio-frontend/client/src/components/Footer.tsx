import { Github, Linkedin, Instagram } from "lucide-react";

interface FooterProps {
  visits: number;
}

export default function Footer({ visits }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Lucas Toledo Cortonezi</h3>
            <p className="text-gray-400 text-sm">
              Desenvolvedor e estudante de Engenharia de Software apaixonado por
              criar soluções inovadoras.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#inicio"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sobre Mim
                </a>
              </li>
              <li>
                <a
                  href="#projetos"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Projetos
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/LucasToledoC"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://br.linkedin.com/in/lucas-toledo-cortonezi-10a851350"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/alem4ao/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Lucas Toledo Cortonezi. Todos os direitos reservados.
          </p>

          {/* Visit Counter */}
          <div className="text-gray-400 text-sm">
            <span>👁️ {visits.toLocaleString("pt-BR")} visitantes</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


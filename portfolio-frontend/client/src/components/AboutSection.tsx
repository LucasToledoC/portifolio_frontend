import { Github, Linkedin, Instagram } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Sobre Mim
        </h2>

        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Sou um estudante dedicado de Engenharia de Software na{" "}
            <strong>FIAP (Faculdade de Informática e Administração Paulista)</strong>,
            com início em 03/2025 e previsão de conclusão em 12/2028. Com sede em São
            Paulo, Brasil, sou apaixonado por tecnologia e busco constantemente
            aprimorar minhas habilidades em desenvolvimento de software.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Minha jornada é marcada pela curiosidade e pelo desejo de criar soluções
            inovadoras. Estou sempre em busca de novos desafios que me permitam
            crescer como profissional e contribuir para projetos significativos.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 justify-center">
          <a
            href="https://br.linkedin.com/in/lucas-toledo-cortonezi-10a851350"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span className="font-semibold">LinkedIn</span>
          </a>
          <a
            href="https://github.com/LucasToledoC"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="font-semibold">GitHub</span>
          </a>
          <a
            href="https://www.instagram.com/alem4ao/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-pink-600 rounded-lg transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-semibold">Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}


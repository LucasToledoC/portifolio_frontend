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
            Estou cursando Engenharia de Software na{" "}
            <strong>FIAP (Faculdade de Informática e Administração Paulista)</strong>,
            minha formação teve início em 03/2025 e tem previsão de conclusão em 12/2028. 
            Moro em São Paulo na capital, na zona oeste. Tenho 18 anos e amo implementar 
            soluções tecnológicas que impactam positivamente a vida das pessoas.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Sou uma pessoa dedicada, e esforçada, sempre procurando aprender e melhorar
            tanto pessoalmente quanto profissionalmente. Tenho paixão pela tecnologia e
            estou sempre buscando maneiras para expandir meus conhecimentos e habilidades.
            Meu objetivo após concluir a graduação é fazer uma pós em Engenharia de Prompt.
          </p>
        </div>

        {/* Social Links: grid on mobile (2 columns), horizontal on sm+ */}
        <div className="grid grid-cols-2 gap-3 place-items-center sm:flex sm:gap-6 sm:justify-center">
          <a
            href="https://br.linkedin.com/in/lucas-toledo-cortonezi-10a851350"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center gap-2 px-4 py-3 bg-gray-900 hover:bg-blue-600 rounded-lg transition-colors justify-center"
          >
            <Linkedin className="w-5 h-5" />
            <span className="font-semibold">LinkedIn</span>
          </a>
          <a
            href="https://github.com/LucasToledoC"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center gap-2 px-4 py-3 bg-gray-900 hover:bg-gray-700 rounded-lg transition-colors justify-center"
          >
            <Github className="w-5 h-5" />
            <span className="font-semibold">GitHub</span>
          </a>
          <a
            href="https://www.instagram.com/alem4ao/"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 sm:col-auto w-full sm:w-auto flex items-center gap-2 px-4 py-3 bg-gray-900 hover:bg-pink-600 rounded-lg transition-colors justify-center"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-semibold">Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}


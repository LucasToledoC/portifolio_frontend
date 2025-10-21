export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black to-gray-900"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
          Olá, eu sou Lucas Toledo Cortonezi
        </h1>
        <p className="text-xl sm:text-2xl text-gray-400 mb-12 font-light">
          Desenvolvedor e estudante de Engenharia de Software
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projetos"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
          >
            Entrar em Contato
          </a>
        </div>
      </div>
    </section>
  );
}


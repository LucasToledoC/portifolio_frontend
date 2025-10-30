import { Download } from "lucide-react";

export default function ResumeSection() {
  const handleDownloadResume = () => {
  // Use the PDF placed in the Vite `public/` folder.
  // Files in `public` are served from the site root, so use an absolute path to avoid
  // broken downloads when the app is on a nested route.
  const link = document.createElement("a");
  link.href = "/LucasToledoCurriculo.pdf"; // place the file in `public/` at project root
  link.download = "CurriculoLucasToledo.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="curriculo" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-8">Meu Currículo</h2>

        <div className="bg-gray-900 rounded-lg p-12 shadow-md border border-gray-800">
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Baixe meu currículo completo para conhecer mais sobre minha formação,
            experiências e habilidades técnicas. Estou sempre aberto a novas
            oportunidades e desafios profissionais.
          </p>

          <button
            onClick={handleDownloadResume}
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-base sm:text-lg w-full sm:w-auto justify-center"
          >
            <Download className="w-6 h-6" />
            Baixar Currículo (PDF)
          </button>

          <p className="text-gray-500 text-sm mt-6">
            Última atualização:{new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    </section>
  );
}


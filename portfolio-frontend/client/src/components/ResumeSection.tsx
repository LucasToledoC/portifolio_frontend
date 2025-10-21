import { Download } from "lucide-react";

export default function ResumeSection() {
  const handleDownloadResume = () => {
    // Create a simple PDF resume (placeholder)
    // In production, you would link to an actual resume file
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Place your resume in public folder
    link.download = "Lucas_Toledo_Cortonezi_Resume.pdf";
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
          >
            <Download className="w-6 h-6" />
            Baixar Currículo (PDF)
          </button>

          <p className="text-gray-500 text-sm mt-6">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    </section>
  );
}


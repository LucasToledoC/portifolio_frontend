import { useEffect, useState } from "react";

interface Certificate {
  id: number;
  nome: string;
  instituicao: string;
  origem?: string;
  data_conclusao: string;
  link_certificado?: string;
}

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrigin, setSelectedOrigin] = useState<string>("");
  const [origins, setOrigins] = useState<string[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/certificados`
        );
        if (response.ok) {
          const data = await response.json();
          setCertificates(data);

          // Extract unique origins
          const uniqueOrigins = Array.from(
            new Set(data.map((c: Certificate) => c.origem).filter(Boolean))
          ) as string[];
          setOrigins(uniqueOrigins);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const filteredCertificates =
    selectedOrigin === ""
      ? certificates
      : certificates.filter((cert) => cert.origem === selectedOrigin);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section id="certificados" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Certificados e Cursos
        </h2>

        {/* Filter */}
        {origins.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedOrigin("")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedOrigin === ""
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Todos
            </button>
            {origins.map((origin) => (
              <button
                key={origin}
                onClick={() => setSelectedOrigin(origin)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedOrigin === origin
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {origin}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Carregando certificados...</p>
          </div>
        ) : filteredCertificates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Nenhum certificado encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-blue-500 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {cert.nome}
                </h3>
                <p className="text-gray-300 font-semibold mb-2">
                  {cert.instituicao}
                </p>
                {cert.origem && (
                  <span className="inline-block bg-blue-900 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {cert.origem}
                  </span>
                )}
                <p className="text-gray-500 text-sm">
                  {formatDate(cert.data_conclusao)}
                </p>
                {cert.link_certificado && (
                  <a
                    href={cert.link_certificado}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-semibold text-sm"
                  >
                    Ver Certificado →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


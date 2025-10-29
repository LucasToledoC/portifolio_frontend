import { useEffect, useState } from "react";
import { fetchWithSharedFallback } from "../lib/fetchWithSharedFallback";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  id: number;
  titulo: string;
  descricao: string;
  tecnologias: string;
  link_github?: string;
  link_deploy?: string;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "snapshot" | null>(null);
  const [snapshotUpdatedAt, setSnapshotUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setSource(null);
      try {
        const API = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projetos`;
        const SNAP_BASE = import.meta.env.VITE_SNAPSHOTS_URL ||
          // prefer jsDelivr CDN for raw repo assets (better CORS & caching)
          "https://cdn.jsdelivr.net/gh/LucasToledoC/portifolio_frontend@snapshots/client/public/api-snapshots";
        const SNAP = `${SNAP_BASE}/projects.json`;
        const res = await fetchWithSharedFallback<Project[]>(API, SNAP, 6000);
        setProjects(res.data || []);
        setSource(res.source);
        if (res.updatedAt) setSnapshotUpdatedAt(res.updatedAt);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projetos" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Meus Projetos
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Carregando projetos...</p>
          </div>
        ) : (
          <>
            {source === "snapshot" && (
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded bg-yellow-900 text-yellow-200">
                  <span>Mostrando backup (offline).</span>
                  {snapshotUpdatedAt && (
                    <small className="text-xs text-yellow-300">Última atualização: {new Date(snapshotUpdatedAt).toLocaleString()}</small>
                  )}
                  <button
                    onClick={() => {
                      setLoading(true);
                      // re-run the effect by calling fetch directly
                      (async () => {
                        try {
                          const API = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projetos`;
                          const SNAP_BASE = import.meta.env.VITE_SNAPSHOTS_URL ||
                            // prefer jsDelivr CDN for raw repo assets (better CORS & caching)
                            "https://cdn.jsdelivr.net/gh/LucasToledoC/portifolio_frontend@snapshots/client/public/api-snapshots";
                          const SNAP = `${SNAP_BASE}/projects.json`;
                          const res = await fetchWithSharedFallback<Project[]>(API, SNAP, 8000);
                          setProjects(res.data || []);
                          setSource(res.source);
                          if (res.updatedAt) setSnapshotUpdatedAt(res.updatedAt);
                        } catch (e) {
                          console.error(e);
                        } finally {
                          setLoading(false);
                        }
                      })();
                    }}
                    className="ml-3 px-3 py-1 bg-yellow-800 text-yellow-100 rounded hover:opacity-90"
                  >
                    Tentar recarregar
                  </button>
                </div>
              </div>
            )}

            {projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Nenhum projeto adicionado ainda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg hover:border-blue-500 border border-gray-800 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.titulo}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{project.descricao}</p>

                {/* Technologies */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tecnologias.split(",").map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.link_github && (
                    <a
                      href={project.link_github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-semibold">GitHub</span>
                    </a>
                  )}
                  {project.link_deploy && (
                    <a
                      href={project.link_deploy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-semibold">Deploy</span>
                    </a>
                  )}
                </div>
              </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}


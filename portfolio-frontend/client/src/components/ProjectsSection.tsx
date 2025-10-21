import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projetos`
        );
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
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
        ) : projects.length === 0 ? (
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
      </div>
    </section>
  );
}


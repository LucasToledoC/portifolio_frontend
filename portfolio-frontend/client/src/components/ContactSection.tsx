import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  const currentYear = new Date().getFullYear();

  return (
    <section id="contato" className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Entre em Contato
        </h2>

        <div className="bg-gray-900 rounded-lg p-6 sm:p-10 border border-gray-800">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Vamos conversar!
          </h3>

          <p className="text-gray-400 mb-6 text-base sm:text-lg max-w-2xl mx-auto">
            Estou sempre aberto a novas oportunidades, ideias e colaborações.
            Sinta-se à vontade para me contatar pelos botões abaixo — respondo
            pelo Whatsapp ou pelo LinkedIn.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/5511943693412"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              WhatsApp
            </a>

            <a
              href="https://br.linkedin.com/in/lucas-toledo-cortonezi-10a851350"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-6 py-3 border border-gray-700 text-gray-200 rounded-lg hover:border-gray-500 transition-colors"
            >
              Ver no LinkedIn
            </a>
          </div>

          <div className="mt-6 space-y-4 text-gray-400">
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>São Paulo, Brasil</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <a href="mailto:lucastoledocort25@gmail.com" className="text-blue-400">lucastoledocort25@gmail.com</a>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <a href="tel:+5511943693412" className="text-blue-400">+55 (11) 94369-3412</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


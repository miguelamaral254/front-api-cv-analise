import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Importado para o carrossel

// Ícones simples para ilustração. Você pode trocar por uma biblioteca como react-icons.
const IconInovacao = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const IconColaboracao = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconCrescimento = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;

// Componente para o carrossel de texto automático
const ProcessCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // Inicia o fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setIsFading(false); // Remove o fade-out para iniciar o fade-in
      }, 500); // Duração da transição
    }, 3000); // Tempo que cada item fica visível

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="h-8 text-center"> {/* Altura fixa para evitar "pulos" no layout */}
      <span
        className={`transition-opacity duration-500 ease-in-out text-xl font-semibold text-blue-800 ${isFading ? 'opacity-0' : 'opacity-100'}`}
      >
        {items[currentIndex]}
      </span>
    </div>
  );
};

const Home = () => {
  const processos = [
    "Tomada de decisões",
    "Raciocínio cotidiano",
    "Generalização do pensamento",
    "Aspectos intersubjetivos da linguagem",
    "e muito mais...",
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Seção Hero */}
      <section className="bg-gradient-to-b from-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Transforme Vidas com Inovação Inclusiva
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">
            Junte-se a uma equipe que une psicologia, educação e tecnologia para criar soluções que maximizam potencialidades e quebram barreiras. Sua carreira com propósito começa aqui.
          </p>
          <div className="mt-8">
            <Link
              to="/vagas"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
            >
              Vagas abertas
            </Link>
          </div>
        </div>
      </section>

      {/* Seção Sobre Nós - ATUALIZADA */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Sobre a Cognvox
          </h2>
          <p className="text-lg text-gray-600">
            A Cognvox é formada por profissionais das áreas da psicologia, da educação e da ciência da computação. Estudamos e desenvolvemos tecnologias e serviços voltados para pessoas neurodivergentse, a partir de uma perspectiva histórico-cultural.
          </p>
          <div className="py-4">
            <p className="text-lg text-gray-700 mb-2">
              Nossa ferramenta apoia processos como:
            </p>
            <ProcessCarousel items={processos} />
          </div>
          <p className="text-lg text-gray-600">
            Acreditamos que, na e pela intervenção do outro (professores, pais e psicólogos), é possível superar limitações e transformar desafios em potencialidades. Nossa missão é clara: quebrar barreiras e construir um futuro mais inclusivo.
          </p>
        </div>
      </section>

      {/* Seção Nossa Cultura */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Nossa Cultura</h2>
            <p className="text-lg text-gray-600 mt-2">Crescemos Juntos: o que nos torna um ótimo lugar para trabalhar.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <IconInovacao />
              <h3 className="text-2xl font-bold mt-4 mb-2">Inovação Inclusiva</h3>
              <p className="text-gray-600">
                Aqui, suas ideias são valorizadas. Incentivamos a curiosidade e a experimentação para criar soluções que geram impacto real.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <IconColaboracao />
              <h3 className="text-2xl font-bold mt-4 mb-2">Colaboração com Empatia</h3>
              <p className="text-gray-600">
                Acreditamos que os melhores resultados vêm do trabalho em equipe. Somos diversos, inclusivos e cultivamos o respeito em cada interação.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <IconCrescimento />
              <h3 className="text-2xl font-bold mt-4 mb-2">Desenvolvimento Contínuo</h3>
              <p className="text-gray-600">
                Investimos no seu crescimento. Oferecemos aprendizado, mentoria e desafios que impulsionam sua carreira e fortalecem nossa missão.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção de Valores */}
      <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">O que nos Move</h2>
             <p className="text-lg text-gray-600 mt-2">Nossos Valores</p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-blue-900">Paixão por Inovação</h3>
                  <p className="mt-1 text-gray-700">Buscamos sempre novas formas de promover inclusão e desenvolvimento.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-blue-900">Pessoas em Primeiro Lugar</h3>
                  <p className="mt-1 text-gray-700">Cuidamos da nossa equipe, dos clientes e da comunidade com empatia e respeito.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-blue-900">Integridade Absoluta</h3>
                  <p className="mt-1 text-gray-700">Agimos com transparência e ética em tudo o que fazemos.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-blue-900">Compromisso com o Impacto</h3>
                  <p className="mt-1 text-gray-700">O verdadeiro sucesso da Cognvox é medido pelo impacto positivo na vida das pessoas.</p>
              </div>
          </div>
      </section>

      {/* Seção Final de CTA */}
      <section className="bg-blue-800 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Quer Fazer Parte Dessa Transformação?
          </h2>
          <p className="mt-4 text-lg text-blue-200 max-w-3xl mx-auto">
            Descubra oportunidades que unem propósito, tecnologia e impacto social. Seu lugar na Cognvox pode estar te esperando.
          </p>
          <div className="mt-8">
            <Link
              to="/vagas"
              className="bg-white hover:bg-gray-200 text-blue-800 font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              Junte-se ao Time
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
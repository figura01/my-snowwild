import Head from 'next/head';

const Advantages = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Head>
        <title>Les Avantages de Louer Votre Matériel Chez Nous</title>
        <meta name="description" content="Découvrez les nombreux avantages de louer votre matériel de ski chez nous et profitez pleinement de vos vacances d'hiver." />
      </Head>
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Les Avantages de Louer Votre Matériel Chez Nous
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Tarifs Compétitifs</h2>
            <p className="text-gray-700">Profitez de tarifs avantageux et économisez par rapport à l'achat de matériel. Nos offres de location sont conçues pour s'adapter à tous les budgets, avec des options flexibles pour répondre à vos besoins spécifiques.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Équipement de Haute Qualité</h2>
            <p className="text-gray-700">Nous renouvelons régulièrement notre parc de matériel pour vous offrir les dernières nouveautés en termes de technologie et de confort. Louer chez nous, c'est l'assurance de disposer d'un équipement en parfait état.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Service Client Personnalisé</h2>
            <p className="text-gray-700">Notre équipe de professionnels est à votre écoute pour vous conseiller et vous aider à choisir le matériel le plus adapté à votre niveau et à vos envies. Nous prenons le temps de bien ajuster chaque équipement pour garantir votre sécurité et votre plaisir sur les pistes.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Flexibilité et Commodité</h2>
            <p className="text-gray-700">Que vous souhaitiez louer à la journée, à la semaine ou pour une plus longue durée, nous avons des options flexibles pour répondre à vos besoins. De plus, en louant sur place, vous évitez les tracas du transport de matériel.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Essai Avant Achat</h2>
            <p className="text-gray-700">Envie de tester avant d'investir dans du matériel ? La location est la solution idéale pour essayer différents modèles et marques. Si vous décidez d'acheter, nous vous proposons souvent des offres spéciales sur le matériel que vous avez loué.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
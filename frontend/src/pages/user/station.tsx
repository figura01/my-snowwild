import Image from "next/image";

export default function Station(){

    return (
        <div className="bg-gray-100 text-gray-800 font-sans">

      <main className="container mx-auto py-12">
        <section className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Bienvenue à La Mongie</h2>
          <p className="mb-6 text-center">
            La Mongie est l&apos;une des stations de ski les plus populaires des Pyrénées françaises. Située au pied du célèbre Col du Tourmalet, elle offre un accès direct au domaine skiable du Grand Tourmalet, le plus grand domaine skiable des Pyrénées françaises.
          </p>
          <div className="flex justify-center">
            <img src="/mongie.png" alt="La Mongie" className=" h-64 object-cover rounded-lg mb-6 shadow-md" />
          </div>
          <p className="mb-4">
            La station est idéale pour les skieurs de tous niveaux, des débutants aux experts. Vous pourrez profiter de paysages magnifiques, de pistes bien entretenues et d&apos;une ambiance conviviale. En été, La Mongie se transforme en un paradis pour les randonneurs et les amoureux de la nature.
          </p>
          <p className="text-center font-semibold text-lg">
            Que vous soyez en quête de sensations fortes ou de détente, La Mongie a quelque chose à offrir à chacun. Venez découvrir nos installations modernes, nos restaurants chaleureux et notre accueil chaleureux. Nous vous attendons avec impatience !
          </p>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg shadow-lg mb-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">Activités Hivernales</h2>
            <ul className="list-disc pl-6 space-y-2 text-blue-800">
              <li>Ski alpin et snowboard</li>
              <li>Ski de fond</li>
              <li>Randonnée en raquettes</li>
              <li>Balades en motoneige</li>
              <li>Parapente</li>
            </ul>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/ski.png" alt="Activités Hivernales" className="w-full max-w-md h-64 object-cover rounded-lg shadow-md" />
          </div>
        </section>

        <section className="bg-green-50 p-8 rounded-lg shadow-lg mb-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex justify-center order-2 md:order-1">
            <img src="/parapente.webp" alt="Activités Estivales" className="w-full max-w-md h-64 object-cover rounded-lg shadow-md" />
          </div>
          <div className="md:w-1/2 md:pl-8 mb-6 md:mb-0 order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-4 text-green-600">Activités Estivales</h2>
            <ul className="list-disc pl-6 space-y-2 text-green-800">
              <li>Randonnée pédestre</li>
              <li>VTT</li>
              <li>Escalade</li>
              <li>Parapente</li>
              <li>Observation de la faune et de la flore</li>
            </ul>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Informations Pratiques</h2>
          <div className="flex flex-col md:flex-row justify-around">
            <div className="mb-6 md:mb-0">
              <p className="mb-2"><strong>Adresse :</strong> 65200 La Mongie, France</p>
              <p className="mb-2"><strong>Contact :</strong> +33 5 62 95 50 71</p>
              <p className="mb-2"><strong>Email :</strong> <a href="mailto:info@lamongie.com" className="text-blue-600 hover:underline">info@lamongie.com</a></p>
            </div>
            <div>
              <p className="mb-2"><strong>Site Web :</strong> <a href="https://www.example.com" className="text-blue-600 hover:underline">www.example.com</a></p>
              <p className="mb-2"><strong>Heures d&apos;ouverture :</strong></p>
              <ul className="list-disc pl-6">
                <li>Lundi - Vendredi : 9h00 - 17h00</li>
                <li>Samedi : 10h00 - 16h00</li>
                <li>Dimanche : Fermé</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-600 text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 La Mongie. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
    )
}
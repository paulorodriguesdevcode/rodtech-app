'use client'
import { useEffect, useState } from 'react';
import { getVerseOfTheDay, listVersions } from '../api/BibleService';
import { useRouter } from 'next/navigation';

const BiblePage = () => {
  const [verse, setVerse] = useState<{ text: string; reference: string; version: string } | null>(null);

  const [versions, setVersions] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const data = await listVersions();
        setVersions(data);
      } catch (error) {
        console.error('Error fetching versions:', error);
      }
    };

    fetchVersions();
  }, []);

  useEffect(() => {
    const fetchVerseOfTheDay = async () => {
      try {
        const data = await getVerseOfTheDay();
        setVerse(data);
      } catch (error) {
        console.error('Error fetching verse of the day:', error);
      }
    };

    fetchVerseOfTheDay();
  }, []);

  const handleVersionClick = (version: string) => {
    router.push(`biblia/${version}`);
  };

  return (
    <div className="min-h-screen bg-purple-900 p-8 text-white">
      <main className="container mx-auto mt-10 max-w-4xl bg-purple-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Versículo do Dia</h1>

        {verse ? (
          <div className="space-y-4 mb-10 text-center ">
            <p className="text-lg italic ">{verse.text}</p>
            <p className="text-sm text-gray-300">
              <strong>Referência:</strong> {verse.reference}
            </p>
            <p className="text-sm text-gray-300">
              <strong>Versão:</strong> {verse.version}
            </p>
          </div>
        ) : (
          <p className="text-lg">Carregando...</p>
        )}

        <strong className='mt-20 '>Acesse a biblia na versão desejada:</strong>
        <div className="grid grid-cols-3 gap-3 mt-4 ">
          {versions.map((version, pos) => (
            <div
              key={pos}
              className={`p-4 rounded-lg shadow cursor-pointer flex hover:bg-purple-400 bg-purple-700 justify-center `}
              onClick={() => handleVersionClick(version)}
            >
              <p className="text-lg" title={version}  >
                {version.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BiblePage;

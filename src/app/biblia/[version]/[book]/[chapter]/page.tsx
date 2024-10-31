'use client'
import { listVerses } from '@/app/api/BibleService';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BiblePage = () => {
  const [verses, setVerses] = useState<string[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);

  const router = useRouter();

  const params = useParams<{ version: string; book: string; chapter: string }>();
  useEffect(() => {
    if (params) {
      const { version, book, chapter } = params;
      const fetchVerses = async () => {
        try {
          const data = await listVerses(version, book, Number(chapter));
          setVerses(data);
        } catch (error) {
          console.error('Error fetching verses:', error);
        }
      };
      fetchVerses();
    }
  }, [params]);

  const handleVerseClick = async (index: number) => {
    await navigator.clipboard.writeText(`${verses[index][0] == '"' ? ('') : ('"')} ${verses[index]}" ${book.toUpperCase()} ${chapter}:${index + 1}`);
    setSelectedVerse(index);
  };

  const handleNextChapter = async () => {
    const nextChapter = Number(chapter) + 1
    router.push(`${nextChapter}`);
  };

  const handleAgoChapter = async () => {
    const nextChapter = Number(chapter) - 1
    router.push(`${nextChapter}`);
  };

  if (!params) return null;

  const { book, chapter } = params;

  return (
    <div className="min-h-screen bg-purple-900 p-8 text-white">
      <main className="mx-auto mt-10 bg-purple-800 p-6 rounded-lg shadow-lg">
        <div className='flex justify-between  rounded-xl items-center'>
          <ArrowLeft width={50} height={50} className='cursor-pointer' onClick={() => handleAgoChapter()} />
          <h1 className="md:text-4xl text-1xl font-bold mb-6 text-center">
            {book.toUpperCase()} - Capítulo - {chapter}
          </h1>
          <ArrowRight width={50} height={50} className='cursor-pointer' onClick={() => handleNextChapter()} />
        </div>
        <div className="mt-10">
          <strong>Versículos:</strong>
          <div className="grid grid-cols-1 gap-3 mt-2">
            {verses.map((verse, pos) => (
              <div
                key={pos}
                onClick={() => handleVerseClick(pos)}
                className={`p-4 rounded-lg shadow cursor-pointer ${selectedVerse === pos ? 'bg-purple-500' : 'bg-purple-700'
                  }`}
              >
                <div className="text-lg flex space-x-2">
                  <strong>{pos + 1}: </strong>
                  <div className='flex w-full h-full justify-between' title='clique para copiar'>
                    <p>{verse}</p>
                    <Copy width={30} height={30} color='white' className='h-full justify-end' />
                  </div>

                </div>
              </div>
            ))}
            <div className='flex justify-between  rounded-xl items-center'>
          <ArrowLeft width={30} height={30} className='cursor-pointer' onClick={() => handleAgoChapter()} />
          <h1 className="md:text-4xl text-1xl font-bold mb-6 text-center">
            {book.toUpperCase()} - Capítulo - {chapter}
          </h1>
          <ArrowRight width={30} height={30} className='cursor-pointer' onClick={() => handleNextChapter()} />
        </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BiblePage;

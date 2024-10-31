'use client'
import { BookDetails, listOneBookDetails } from '@/app/api/BibleService';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BiblePage = () => {
  const [bookDetails, setBookDetails] = useState<BookDetails>();

  const params = useParams<{ version: string, book: string }>();

  const router = useRouter();

  const book = params?.book

  const handleChapterClick = (pos: number) => {
    router.push(`${book}/${pos}`);
  };

  useEffect(() => {
    const fetchBookDetails = async (book?: string|undefined) => {
      try {
        const data = await listOneBookDetails(book);
        setBookDetails(data);
      } catch (error) {
        console.error('Error fetching verse of the day:', error);
      }
    };

    fetchBookDetails(book);
  }, [book]);

  if (!params) return

  return (
    <div className="min-h-screen bg-purple-900 p-8 text-white">
      <main className="container mx-auto mt-10 max-w-4xl bg-purple-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">
          {bookDetails?.name?.toUpperCase()}
        </h1>
        <div className="space-y-4">
          <strong>Capítulos</strong>
          {bookDetails ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: bookDetails.totalChapters }, (_, index) => (
                <p
                  key={index + 1}
                  onClick={() => handleChapterClick(index + 1)}
                  className="cursor-pointer text-lg text-center bg-purple-700 p-2 rounded-lg shadow hover:bg-purple-400"
                >
                  {`${index + 1}`}
                </p>
              ))}
            </div>
          ) : (
            <p>Carregando capítulos...</p>
          )}
        </div>
      </main>
    </div>
  );
  
};

export default BiblePage;

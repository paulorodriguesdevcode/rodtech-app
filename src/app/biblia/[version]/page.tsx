'use client'
import { BookDetails, listBookDetails } from '@/app/api/BibleService';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const VersionPage = () => {
  const params = useParams<{version: string}>();
  const version  = params?.version
  const [books, setBooks] = useState<BookDetails[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await listBookDetails();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };

    fetchBooks();
  }, [version]);

  if(!version){return}

  const handleBookClick = (book: string) => {
    router.push(`${version}/${book}`);
  };

  return (
    <div className="min-h-screen min-w-screen bg-purple-900 p-8 text-white">
      <main className="mx-auto mt-10 bg-purple-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Livros na versão - {version.toUpperCase()}
        </h1>
        <div className="space-y-2">
          <strong>Versículos:</strong>
          <div className="grid grid-cols-4 gap-3">
            {books.map((book, pos) => (
              <div
                key={pos}
                className={`p-4 rounded-lg shadow cursor-pointer flex hover:bg-purple-400 bg-purple-700`}
                onClick={() => handleBookClick(book.abrev)}
              >
                <p className="text-lg" title={book.abrev}  >
                  {book.abrev.toUpperCase()}                  
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VersionPage;

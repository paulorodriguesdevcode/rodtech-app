export interface Book {
  abbrev: string;
  name: string;
  chapters: string[][];
}

export interface Verse {
  text: string;
  reference: string;
  version: string;
}

export interface BookDetails {
  name: string,
  abrev: string,
  totalChapters: number
}

export async function getVerseOfTheDay(): Promise<Verse> {
  const response = await fetch(`${process.env.API_URL}/biblia`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar o versículo do dia');
  }

  return response.json();
}

export async function listBooks(version: string): Promise<Book[]> {
  const response = await fetch(`${process.env.API_URL}/biblia/${version}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao listar livros');
  }

  return response.json();
}

export async function listVersions(): Promise<string[]> {
  const response = await fetch(`${process.env.API_URL}/biblia/versions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao listar versões disponiveis');
  }

  return response.json();
}

export async function listBookDetails(book?:string|undefined): Promise<BookDetails[]> {
  const response = await fetch(`${process.env.API_URL}/biblia/books/details${book ? ('/'+book):('')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao listar livros');
  }

  return response.json();
}

export async function listOneBookDetails(book?:string): Promise<BookDetails> {
  const response = await fetch(`${process.env.API_URL}/biblia/books/details${book ? ('/'+book):('')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao listar livros');
  }

  return response.json();
}

export async function listChapters(version: string, bookAbbrev: string): Promise<number[]> {
  const response = await fetch(`${process.env.API_URL}/biblia/${version}/${bookAbbrev}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao listar capítulos');
  }

  return response.json();
}

export async function listVerses(version: string, bookAbbrev: string, chapter: number): Promise<string[]> {
  const response = await fetch(`${process.env.API_URL}/biblia/${version}/${bookAbbrev}/${chapter}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao listar versículos');
  }

  return response.json();
}

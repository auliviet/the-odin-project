const AUTHORS = [
  { id: 1, name: "Bryan" },
  { id: 2, name: "Christian" },
  { id: 3, name: "Jason" },
];

const BOOKS = [
  {
    id: 1,
    name: "Dune",
  },
  { id: 2, name: "Foundations" },
];

export default async function getAuthorById(id: number) {
  return AUTHORS.find((author) => author.id === id);
}

export async function getBookById(id: number) {
  return BOOKS.find((book) => book.id === id);
}

import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Edit, Trash2 } from 'lucide-react';
import { Text } from '../../ui-kits/text';

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  year: string | number;
}

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  return (
    <Box className="w-full">
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map(book => (
          <Paper
            key={book?._id}
            elevation={4}
            className="rounded-2xl p-6 shadow-lg bg-gradient-to-br from-white via-blue-50 to-purple-50 hover:shadow-2xl transition-shadow h-full flex flex-col justify-between"
          >
            <Box>
              <Text variant="H20" className="mb-2 text-blue-900 truncate">
                {book?.title}
              </Text>
              <Text variant="D16" className="mb-1 text-gray-500">
                Author: <span className="font-semibold">{book?.author}</span>
              </Text>
              <Text variant="D16" className="mb-1 text-gray-500">
                Genre: <span className="font-semibold">{book?.genre}</span>
              </Text>
              <Text variant="D16" className="mb-4 text-gray-500">
                Year: <span className="font-semibold">{book?.year}</span>
              </Text>
            </Box>
            <Box className="flex gap-3 mt-4 ml-auto items-center">
              <Edit
                size={20}
                className="text-purple-700 cursor-pointer"
                onClick={() => onEdit(book)}
              />
              <Trash2
                size={20}
                className="text-red-700 cursor-pointer"
                onClick={() => onDelete(book)}
              />
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default BookList;

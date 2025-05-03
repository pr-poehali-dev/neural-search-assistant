
import { Card } from '@/components/ui/card';
import { SearchResults } from '@/types/search';

interface SearchResultProps {
  results: SearchResults;
}

const SearchResult = ({ results }: SearchResultProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Ответ нейросети:</h2>
        <p className="text-gray-700 whitespace-pre-line">{results.answer}</p>
      </Card>
      
      <h3 className="text-lg font-medium mt-8 mb-4">Источники информации:</h3>
      <div className="space-y-4">
        {results.sources.map((source, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-purple-700 mb-2">
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {source.title}
              </a>
            </h3>
            <p className="text-sm text-gray-600">{source.snippet}</p>
            <div className="mt-2 text-xs text-gray-500 truncate">
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {source.url}
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;

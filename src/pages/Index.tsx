
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/Spinner';
import { SearchResult } from '@/components/SearchResult';
import { SearchResults } from '@/types/search';

const Index = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResults | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Имитация запроса к API
    setTimeout(() => {
      // Демо-данные для примера
      const mockResults: SearchResults = {
        answer: `По вашему запросу "${query}" найдена информация из нескольких источников. 
        Ваш запрос был проанализирован и обработан нейросетью, которая собрала релевантные данные из открытых источников.`,
        sources: [
          {
            title: "Википедия: " + query,
            url: "https://ru.wikipedia.org/wiki/" + encodeURIComponent(query),
            snippet: "Статья содержит основную информацию по теме " + query + "..."
          },
          {
            title: "Научная публикация о " + query,
            url: "https://arxiv.org/search/?query=" + encodeURIComponent(query),
            snippet: "Научное исследование, затрагивающее аспекты темы " + query + "..."
          },
          {
            title: "Новости по теме: " + query,
            url: "https://news.google.com/search?q=" + encodeURIComponent(query),
            snippet: "Последние новости и события, связанные с темой " + query + "..."
          }
        ]
      };
      
      setResults(mockResults);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">НейроПоиск</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Задайте вопрос, и нейросеть найдет информацию в открытых источниках
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex gap-2">
            <Input
              className="flex-1"
              placeholder="Введите ваш запрос..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button 
              onClick={handleSearch} 
              disabled={isLoading || !query.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Искать
            </Button>
          </div>
        </div>
        
        {isLoading && (
          <div className="flex justify-center my-12">
            <Spinner />
          </div>
        )}
        
        {results && !isLoading && (
          <SearchResult results={results} />
        )}
      </div>
    </div>
  );
};

export default Index;

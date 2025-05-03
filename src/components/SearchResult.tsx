
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchResults } from '@/types/search';
import { useState } from 'react';

interface SearchResultProps {
  results: SearchResults;
}

const SearchResult = ({ results }: SearchResultProps) => {
  const [showDismaryNotice, setShowDismaryNotice] = useState(true);

  return (
    <div className="space-y-6 animate-fade-in">
      {showDismaryNotice && results.answer.includes('Сызрань') && (
        <Card className="p-4 border-l-4 border-amber-500 bg-amber-50 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-amber-800 mb-1">Важное уведомление</h3>
              <p className="text-sm text-amber-700">
                Информация о происшествиях с людьми может быть конфиденциальной. 
                Для получения точных данных рекомендуется обратиться в официальные органы.
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDismaryNotice(false)}
              className="text-amber-700 hover:text-amber-900"
            >
              Скрыть
            </Button>
          </div>
        </Card>
      )}
      
      <Card className="p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Результаты поиска:</h2>
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
                className="hover:underline flex items-center"
              >
                {source.title}
                <svg className="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
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
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Рекомендации по поиску</h3>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Для поиска архивных данных попробуйте указать точный период времени</li>
          <li>Используйте официальные источники для проверки информации</li>
          <li>Для получения информации о происшествиях обращайтесь в соответствующие органы</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchResult;

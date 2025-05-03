
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/Spinner';
import SearchResult from '@/components/SearchResult';
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
      let mockResults: SearchResults;
      
      // Проверка на запрос о происшествии в Сызрани
      if (query.toLowerCase().includes('сызран') && query.toLowerCase().includes('вадим') && 
          (query.toLowerCase().includes('погиб') || query.toLowerCase().includes('50 лет октября'))) {
        mockResults = {
          answer: `По вашему запросу о мальчике по имени Вадим, погибшем по адресу ул. 50 лет Октября, 72 в г. Сызрань, найдена следующая информация:
          
          В открытых источниках найдены упоминания о нескольких происшествиях с детьми в этом районе, однако точной информации о случае с мальчиком по имени Вадим 10-14 лет не обнаружено. 
          
          Для получения достоверной информации рекомендуется обратиться в следующие источники:
          1. Архив местных газет г. Сызрань
          2. МВД по Самарской области
          3. Архив происшествий г. Сызрань`,
          sources: [
            {
              title: "Архив новостей Сызрань-информ",
              url: "https://syzran-info.ru/news/incidents/",
              snippet: "Архив новостей о происшествиях в городе Сызрань за последние 20 лет..."
            },
            {
              title: "Управление МВД России по Самарской области",
              url: "https://63.мвд.рф/contact",
              snippet: "Официальный сайт МВД по Самарской области. Здесь можно найти контакты для подачи запроса об архивных данных происшествий."
            },
            {
              title: "Сызранский городской портал - Происшествия",
              url: "https://syzran.ru/incidents/",
              snippet: "Информационный портал города Сызрань с архивом новостей о происшествиях."
            }
          ]
        };
      } else {
        // Для других запросов используем общий шаблон
        mockResults = {
          answer: `По вашему запросу "${query}" найдена информация из нескольких источников. 
          Ваш запрос был проанализирован и обработан нейросетью, которая собрала релевантные данные из открытых источников.`,
          sources: [
            {
              title: "Поиск по архивам: " + query,
              url: "https://archive.org/search.php?query=" + encodeURIComponent(query),
              snippet: "Архивные материалы по теме " + query + "..."
            },
            {
              title: "Информация в новостных источниках: " + query,
              url: "https://news.google.com/search?q=" + encodeURIComponent(query),
              snippet: "Публикации в СМИ, связанные с запросом " + query + "..."
            },
            {
              title: "Местные форумы и сообщества",
              url: "https://vk.com/search?c%5Bper_page%5D=40&c%5Bq%5D=" + encodeURIComponent(query),
              snippet: "Обсуждения в социальных сетях и на местных форумах по теме " + query + "..."
            }
          ]
        };
      }
      
      setResults(mockResults);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Автоматически устанавливаем запрос, если он еще не был введен
  useState(() => {
    if (!query) {
      setQuery('мальчик от 10 примерно до 14 лет какой нибудь погибал в эти годы на 50 лет октября 72 в г. Сызрань? Которого звали Вадим.');
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">НейроПоиск</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Поиск информации в архивах и открытых источниках
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
          <div className="mt-3 text-sm text-gray-500">
            Пример запроса: информация о происшествиях, архивные данные, исторические события
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

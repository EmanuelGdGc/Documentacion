import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

interface SearchResult {
  title: string;
  url: string;
  content: string;
  type: 'doc' | 'page';
  plugin?: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const { siteConfig } = useDocusaurusContext();

  // Datos simulados de documentos (en producción vendría de una API o índice)
  const mockData: SearchResult[] = [
    {
      title: 'Contexto y Objetivo - GcRisk',
      url: '/docs/gcrisk/contexto-objetivo',
      content: 'Documentación sobre el contexto y objetivos del sistema GcRisk',
      type: 'doc',
      plugin: 'gcrisk'
    },
    {
      title: 'Arquitectura - GcRisk',
      url: '/docs/gcrisk/arquitectura/overview',
      content: 'Descripción de la arquitectura del sistema GcRisk',
      type: 'doc',
      plugin: 'gcrisk'
    },
    {
      title: 'Contexto y Objetivo - GCBloomRisk',
      url: '/docs/gcbloomrisk/contexto-objetivo',
      content: 'Documentación sobre el contexto y objetivos del sistema GCBloomRisk',
      type: 'doc',
      plugin: 'gcbloomrisk'
    },
    {
      title: 'Contexto y Objetivo - GCM',
      url: '/docs/gcm/contexto-objetivo',
      content: 'Documentación sobre el contexto y objetivos del sistema GCM',
      type: 'doc',
      plugin: 'gcm'
    },
    {
      title: 'Contexto y Objetivo - GCMutual',
      url: '/docs/gcmutual/contexto-objetivo',
      content: 'Documentación sobre el contexto y objetivos del sistema GCMutual',
      type: 'doc',
      plugin: 'gcmutual'
    },
    {
      title: 'Instalación de Docusaurus',
      url: '/docs/docusaurus/instalacion',
      content: 'Guía de instalación y configuración de Docusaurus',
      type: 'doc',
      plugin: 'docusaurus'
    }
  ];

  const searchDocuments = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];
    
    const lowercaseQuery = searchQuery.toLowerCase();
    return mockData.filter(doc => 
      doc.title.toLowerCase().includes(lowercaseQuery) ||
      doc.content.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 8); // Limitar a 8 resultados
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const searchResults = searchDocuments(query);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    history.push(result.url);
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const getPluginLabel = (plugin?: string) => {
    switch (plugin) {
      case 'gcrisk': return 'GcRisk';
      case 'gcbloomrisk': return 'GCBloomRisk';
      case 'gcm': return 'GCM';
      case 'gcmutual': return 'GCMutual';
      case 'docusaurus': return 'Docusaurus';
      default: return '';
    }
  };

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <div className={styles.searchInputWrapper}>
        <svg 
          className={styles.searchIcon} 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <path 
            d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar en la documentación..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className={styles.clearButton}
          >
            ×
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className={styles.searchResults}>
          {results.map((result, index) => (
            <div
              key={`${result.url}-${index}`}
              className={`${styles.searchResult} ${
                index === selectedIndex ? styles.selected : ''
              }`}
              onClick={() => handleResultClick(result)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className={styles.resultHeader}>
                <span className={styles.resultTitle}>{result.title}</span>
                {result.plugin && (
                  <span className={styles.resultPlugin}>
                    {getPluginLabel(result.plugin)}
                  </span>
                )}
              </div>
              <p className={styles.resultContent}>{result.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
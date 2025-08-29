export const getIdiomas = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=languages');
    if (!response.ok) {
      throw new Error('Falha ao buscar os idiomas da API.');
    }
    const countries = await response.json();
    const languageTranslator = new Intl.DisplayNames(['pt'], { type: 'language' });
    const allLanguageCodes = new Set();
    countries.forEach(country => {
      if (country.languages) {
        Object.keys(country.languages).forEach(code => allLanguageCodes.add(code));
      }
    });

    const languageList = Array.from(allLanguageCodes)
      .map(code => {
        if (code === 'sh') return null; 
        
        let name = languageTranslator.of(code);
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return { value: name, label: name };
      })
      .filter(Boolean) 
      .sort((a, b) => a.label.localeCompare(b.label));
    
    return languageList;

  } catch (error) {
    console.error("Erro no serviço de idiomas:", error);
    throw error;
  }
};
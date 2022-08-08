import strings from '../Translations/en';

const useLocalize = () => {
  return (key) => {
    let res = strings;
    const parts = key.split('.').filter(Boolean);

    for (const part of parts) {
      res = res?.[part];
    }

    if (typeof res === 'string') {
      return res;
    }

    // Return empty string for incomplete key of if key not found
    return '';
  };
};

export default useLocalize;

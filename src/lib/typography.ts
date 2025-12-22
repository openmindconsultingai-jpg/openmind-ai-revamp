/**
 * Typography utility functions for Polish text
 * Handles widow prevention (orphaned single letters at end of lines)
 */

// Polish single-letter words that shouldn't be left alone at end of lines
const POLISH_WIDOWS = ['a', 'i', 'o', 'u', 'w', 'z', 'A', 'I', 'O', 'U', 'W', 'Z'];

/**
 * Prevents widows by replacing regular spaces after single-letter words
 * with non-breaking spaces (\u00A0)
 */
export const preventWidows = (text: string): string => {
  if (!text) return text;
  
  // Replace space after single Polish letters with non-breaking space
  let result = text;
  
  POLISH_WIDOWS.forEach(letter => {
    // Match single letter followed by space (at word boundary)
    const regex = new RegExp(`(^|\\s)(${letter})\\s`, 'g');
    result = result.replace(regex, `$1$2\u00A0`);
  });
  
  return result;
};

/**
 * Apply widow prevention to React children or strings
 */
export const noWidows = (content: string | undefined): string => {
  if (!content) return '';
  return preventWidows(content);
};

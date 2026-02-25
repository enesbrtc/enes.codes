export interface IntentSuggestion {
  suggestion: string;
  confidence: number;
}

export function detectIntent(input: string): IntentSuggestion | null {
  const normalizedInput = input.toLowerCase().trim();

  // SSH connection intents
  if (normalizedInput.includes('enes') ||
      normalizedInput.includes('connect') ||
      normalizedInput.includes('login') ||
      normalizedInput === 'enes.codes') {
    return {
      suggestion: "Did you mean: ssh enes.codes ?",
      confidence: 0.9
    };
  }

  // Portfolio/about intents
  if (normalizedInput.includes('about') ||
      normalizedInput.includes('cv') ||
      normalizedInput.includes('resume') ||
      normalizedInput.includes('portfolio') ||
      normalizedInput === 'projects?') {
    return {
      suggestion: "Try: projects or experience",
      confidence: 0.8
    };
  }

  // Tech stack intents
  if (normalizedInput.includes('tech') ||
      normalizedInput.includes('stack') ||
      normalizedInput.includes('skills')) {
    return {
      suggestion: "Try: stack",
      confidence: 0.7
    };
  }

  // Contact intents
  if (normalizedInput.includes('contact') ||
      normalizedInput.includes('email') ||
      normalizedInput.includes('reach')) {
    return {
      suggestion: "Try: contact",
      confidence: 0.7
    };
  }

  return null;
}

export function suggestSimilarCommand(input: string, availableCommands: string[]): string | null {
  const normalizedInput = input.toLowerCase();

  // Simple Levenshtein distance for typo detection
  function levenshteinDistance(a: string, b: string): number {
    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[b.length][a.length];
  }

  let bestMatch: string | null = null;
  let bestDistance = Infinity;

  for (const command of availableCommands) {
    const distance = levenshteinDistance(normalizedInput, command.toLowerCase());
    const maxLength = Math.max(normalizedInput.length, command.length);
    const similarity = 1 - distance / maxLength;

    // Only suggest if similarity is high enough and distance is small
    if (similarity > 0.6 && distance <= 2 && distance < bestDistance) {
      bestMatch = command;
      bestDistance = distance;
    }
  }

  return bestMatch;
}
/**
 * Replaces placeholders in a string template with corresponding values from a replacement object.
 *
 * Placeholders are specified in double curly braces, e.g., `{{key}}`, and will be replaced
 * by the value associated with `key` in the `replacements` object. If a placeholder's key
 * is not found in the `replacements`, it is left unchanged in the string.
 *
 * @param text - The string containing placeholders to be replaced.
 * @param replacements - An object where keys represent placeholder names (without curly braces),
 *                        and values represent their corresponding replacement values.
 *                        Values can be either strings or numbers.
 * @returns The string with all placeholders replaced by their corresponding values.
 *
 * @example
 * const template = "Hello, {{name}}! You have {{count}} new messages.";
 * const replacements = { name: "Alice", count: 5 };
 * const result = stringInterpolator(template, replacements);
 * console.log(result); // "Hello, Alice! You have 5 new messages."
 */
function stringInterpolator(
  text: string,
  replacements: Record<string, string | number>
): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const replacement = replacements[key]
    return replacement !== undefined ? String(replacement) : `{{${key}}}`
  })
}

export default stringInterpolator

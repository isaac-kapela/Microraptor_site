/**
 * @file utils.ts
 * @brief Utilitários gerais do projeto.
 * @description Funções auxiliares reutilizáveis em todo o projeto.
 * @module lib/utils
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * @brief Combina classes CSS condicionalmente.
 * @description Utiliza `clsx` para processar classes condicionais e `tailwind-merge`
 *   para resolver conflitos de classes Tailwind CSS.
 * @param inputs Lista variável de valores de classe (strings, objetos, arrays).
 * @returns String com as classes mescladas e deduplicadas.
 * @example
 * cn("px-4 py-2", isActive && "bg-red-500", "hover:bg-red-700")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

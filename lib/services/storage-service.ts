/**
 * storage-service.ts
 * Servicio para manejar el almacenamiento local en el navegador
 * Proporciona métodos para guardar, obtener, actualizar y eliminar datos
 * Compatible con localStorage y sessionStorage
 */

// Tipo de almacenamiento que se puede utilizar
export type StorageType = "localStorage" | "sessionStorage";

// Interfaz para las operaciones del servicio de almacenamiento
export interface StorageService {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  updateItem<T>(key: string, value: Partial<T>): void;
  removeItem(key: string): void;
  clear(): void;
  hasItem(key: string): boolean;
}

// Factory function para crear una instancia del servicio
export const createStorageService = (
  storageType: StorageType = "localStorage",
  prefix: string = "ecommerce_"
): StorageService => {
  // Validar que estamos en el navegador
  const isBrowser = typeof window !== "undefined";

  // Obtener la instancia de almacenamiento correcta
  const getStorage = (): Storage => {
    if (!isBrowser) {
      // Crear un almacenamiento ficticio para SSR
      return {
        getItem: () => null,
        setItem: () => null,
        removeItem: () => null,
        clear: () => null,
        key: () => null,
        length: 0,
      } as Storage;
    }

    return storageType === "localStorage"
      ? window.localStorage
      : window.sessionStorage;
  };

  // Prefijo para todas las claves para evitar colisiones
  const getPrefixedKey = (key: string): string => `${prefix}${key}`;

  return {
    /**
     * Obtiene un valor del almacenamiento
     * @param key Clave a buscar
     * @returns El valor deserializado o null si no existe
     */
    getItem<T>(key: string): T | null {
      try {
        const storage = getStorage();
        const item = storage.getItem(getPrefixedKey(key));

        if (item === null) {
          return null;
        }

        return JSON.parse(item) as T;
      } catch (error) {
        console.error(
          `Error al obtener el item '${key}' del ${storageType}:`,
          error
        );
        return null;
      }
    },

    /**
     * Guarda un valor en el almacenamiento
     * @param key Clave para guardar el valor
     * @param value Valor a guardar (será serializado)
     */
    setItem<T>(key: string, value: T): void {
      try {
        const storage = getStorage();
        const serializedValue = JSON.stringify(value);
        storage.setItem(getPrefixedKey(key), serializedValue);
      } catch (error) {
        console.error(
          `Error al guardar el item '${key}' en ${storageType}:`,
          error
        );
      }
    },

    /**
     * Actualiza parcialmente un objeto existente en el almacenamiento
     * @param key Clave del objeto a actualizar
     * @param value Propiedades a actualizar
     */
    updateItem<T>(key: string, value: Partial<T>): void {
      try {
        const storage = getStorage();
        const prefixedKey = getPrefixedKey(key);
        const currentItem = storage.getItem(prefixedKey);

        if (currentItem === null) {
          this.setItem(key, value as T);
          return;
        }

        const parsedItem = JSON.parse(currentItem) as T;
        const updatedItem = { ...parsedItem, ...value };
        storage.setItem(prefixedKey, JSON.stringify(updatedItem));
      } catch (error) {
        console.error(
          `Error al actualizar el item '${key}' en ${storageType}:`,
          error
        );
      }
    },

    /**
     * Elimina un valor del almacenamiento
     * @param key Clave a eliminar
     */
    removeItem(key: string): void {
      try {
        const storage = getStorage();
        storage.removeItem(getPrefixedKey(key));
      } catch (error) {
        console.error(
          `Error al eliminar el item '${key}' de ${storageType}:`,
          error
        );
      }
    },

    /**
     * Limpia todos los valores guardados con el prefijo configurado
     */
    clear(): void {
      try {
        const storage = getStorage();

        if (!isBrowser) return;

        // Solo elimina las claves que coinciden con nuestro prefijo
        Object.keys(storage).forEach((key) => {
          if (key.startsWith(prefix)) {
            storage.removeItem(key);
          }
        });
      } catch (error) {
        console.error(`Error al limpiar datos de ${storageType}:`, error);
      }
    },

    /**
     * Verifica si existe un valor para la clave dada
     * @param key Clave a verificar
     * @returns true si existe, false en caso contrario
     */
    hasItem(key: string): boolean {
      try {
        const storage = getStorage();
        return storage.getItem(getPrefixedKey(key)) !== null;
      } catch (error) {
        console.error(
          `Error al verificar si existe el item '${key}' en ${storageType}:`,
          error
        );
        return false;
      }
    },
  };
};

// Exportar instancias predeterminadas para uso rápido
export const localStorageService = createStorageService("localStorage");
export const sessionStorageService = createStorageService("sessionStorage");

// Función de conveniencia para crear un servicio para un contexto específico
export const createContextStorage = <T>(
  context: string,
  storageType: StorageType = "localStorage"
) => {
  const service = createStorageService(storageType);

  return {
    get: (): T | null => service.getItem<T>(context),
    set: (value: T): void => service.setItem(context, value),
    update: (value: Partial<T>): void => service.updateItem(context, value),
    remove: (): void => service.removeItem(context),
    exists: (): boolean => service.hasItem(context),
  };
};

// Ejemplos de uso específico para la tienda (se pueden exportar para uso en la aplicación)
export const cartStorage = createContextStorage<any>("cart");
export const wishlistStorage = createContextStorage<string[]>("wishlist");
export const userPreferencesStorage =
  createContextStorage<any>("userPreferences");
export const recentlyViewedStorage = createContextStorage<string[]>(
  "recentlyViewed",
  "sessionStorage"
);

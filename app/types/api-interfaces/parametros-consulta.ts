// Parámetros completos para consulta
export interface QueryParams {
  pagination?: PaginationOptions;
  sort?: SortOptions | SortOptions[];
  filter?: FilterOptions;
  include?: string[];
  fields?: string[];
  search?: string;
}

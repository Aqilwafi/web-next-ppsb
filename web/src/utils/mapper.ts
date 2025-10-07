export function mapFromDBToForm<T extends Record<string, any>>(data: T): any {
  if (!data) return {};
  const result: Record<string, any> = {};

  for (const key in data) {
    const val = data[key];
    if (val === null || val === undefined) result[key] = "";
    else result[key] = val;
  }

  return result;
}

export function mapFormToDB<T extends Record<string, any>>(form: T): any {
  const result: Record<string, any> = {};

  for (const key in form) {
    const val = form[key];
    if (val === "") result[key] = null;
    else result[key] = val;
  }

  return result;
}

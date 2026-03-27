/**
 * React Native upload support
 */
export type ReactNativeUploadFile = {
  uri: string;
  name?: string;
  type?: string;
};

const isReactNativeUploadFile = (
  value: unknown,
): value is ReactNativeUploadFile => {
  if (!value || typeof value !== "object") return false;
  return "uri" in value && typeof (value as { uri?: unknown }).uri === "string";
};

export type ExtractableUpload = ReactNativeUploadFile | Blob | File;

export const isExtractableFile = (value: unknown): value is ExtractableUpload =>
  (typeof File !== "undefined" && value instanceof File) ||
  (typeof Blob !== "undefined" && value instanceof Blob) ||
  isReactNativeUploadFile(value);

export const formDataAppendFile = (
  formData: FormData,
  fieldName: string,
  file: ReactNativeUploadFile | Blob | File,
) => {
  if (isReactNativeUploadFile(file)) {
    formData.append(fieldName, {
      uri: file.uri,
      name: file.name ?? "upload",
      type: file.type ?? "application/octet-stream",
    } as any);
    return;
  }

  if ("name" in file) {
    formData.append(fieldName, file, file.name);
    return;
  }

  formData.append(fieldName, file);
};

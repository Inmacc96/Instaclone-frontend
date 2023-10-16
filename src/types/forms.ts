export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

export type ChangePasswordFormTouched = Record<
  keyof ChangePasswordFormData,
  boolean
>;

export interface ValidateChangePassword {
  oldPassword: (v: ChangePasswordFormData) => string;
  newPassword: (v: ChangePasswordFormData) => string;
  repeatNewPassword: (v: ChangePasswordFormData) => string;
}

export interface ChangeEmailFormData {
  email: string;
}

export type ChangeEmailFormTouched = Record<keyof ChangeEmailFormData, boolean>;

export interface ValidateChangeEmail {
  email: (v: ChangeEmailFormData) => string;
}

export interface ChangeDescriptionFormData {
  description: string;
}

export type ChangeDescriptionFormTouched = Record<
  keyof ChangeDescriptionFormData,
  boolean
>;

export interface ValidateChangeDescription {
  description: (v: ChangeDescriptionFormData) => string;
}

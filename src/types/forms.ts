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

export interface ChangeWebsiteFormData {
  website: string;
}

export type ChangeWebsiteFormTouched = Record<
  keyof ChangeWebsiteFormData,
  boolean
>;

export interface ValidateChangeWebsite {
  website: (v: ChangeWebsiteFormData) => string;
}

export interface AddCommentFormData {
  comment: string;
}

export type AddCommentFormTouched = Record<keyof AddCommentFormData, boolean>;

export interface ValidateAddComment {
  comment: (v: AddCommentFormData) => string;
}

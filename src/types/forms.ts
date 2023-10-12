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

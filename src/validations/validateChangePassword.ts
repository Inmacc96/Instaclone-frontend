import { ChangePasswordFormData } from "../types/forms";

export const validateOldPassword = (formData: ChangePasswordFormData) => {
  const oldPassword = formData.oldPassword;
  if (!oldPassword) {
    return "Old password is required";
  } else {
    return "";
  }
};

export const validateNewPassword = (formData: ChangePasswordFormData) => {
  const newPassword = formData.newPassword;
  const repeatNewPassword = formData.repeatNewPassword;
  if (!newPassword) {
    return "New password is required";
  } else if (newPassword !== repeatNewPassword) {
    return "Passwords are not equal";
  } else {
    return "";
  }
};

export const validateRepeatNewPassword = (formData: ChangePasswordFormData) => {
  const newPassword = formData.newPassword;
  const repeatNewPassword = formData.repeatNewPassword;
  if (!repeatNewPassword) {
    return "Repeat new password is required";
  } else if (newPassword !== repeatNewPassword) {
    return "Passwords are not equal";
  } else {
    return "";
  }
};

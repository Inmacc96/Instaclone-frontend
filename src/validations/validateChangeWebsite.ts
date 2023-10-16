import { ChangeWebsiteFormData } from "../types/forms";

export const validateWebsite = (formData: ChangeWebsiteFormData) => {
  const webSite = formData.webSite;
  if (!webSite) {
    return "Website is required";
  } else {
    return "";
  }
};

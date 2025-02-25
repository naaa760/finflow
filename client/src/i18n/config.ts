import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      common: {
        loading: "Loading...",
        error: "An error occurred",
        retry: "Try again",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        add: "Add",
      },
      transactions: {
        title: "Transactions",
        income: "Income",
        expense: "Expense",
        amount: "Amount",
        category: "Category",
        description: "Description",
        date: "Date",
        type: "Type",
        addNew: "Add Transaction",
      },
      // Add more translations
    },
  },
  es: {
    translation: {
      common: {
        loading: "Cargando...",
        error: "Se produjo un error",
        retry: "Intentar de nuevo",
        save: "Guardar",
        cancel: "Cancelar",
        delete: "Eliminar",
        edit: "Editar",
        add: "Agregar",
      },
      // Add more translations
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

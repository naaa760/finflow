interface CategoryRule {
  keywords: string[];
  category: string;
}

const categoryRules: CategoryRule[] = [
  {
    keywords: ["grocery", "food", "restaurant", "cafe", "coffee"],
    category: "Food",
  },
  {
    keywords: ["uber", "taxi", "bus", "train", "gas", "fuel"],
    category: "Transport",
  },
  {
    keywords: ["netflix", "spotify", "movie", "cinema", "theater"],
    category: "Entertainment",
  },
  {
    keywords: ["rent", "electricity", "water", "internet", "phone"],
    category: "Bills",
  },
  {
    keywords: ["salary", "wage", "payment", "income"],
    category: "Salary",
  },
];

export const suggestCategory = (description: string): string => {
  const lowercaseDesc = description.toLowerCase();

  for (const rule of categoryRules) {
    if (rule.keywords.some((keyword) => lowercaseDesc.includes(keyword))) {
      return rule.category;
    }
  }

  return "Other";
};

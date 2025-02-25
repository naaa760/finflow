"use client";
import { useState } from "react";

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  label?: string;
  className?: string;
}

export default function DeleteButton({
  onDelete,
  label = "Delete",
  className,
}: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this item?")) {
      setIsDeleting(true);
      try {
        await onDelete();
      } catch (error) {
        console.error("Error deleting:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`text-red-600 hover:text-red-800 disabled:opacity-50 ${
        className || ""
      }`}
    >
      {isDeleting ? "Deleting..." : label}
    </button>
  );
}

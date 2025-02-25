"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { transactionService } from "@/services/transactions";
import { budgetService } from "@/services/budgets";
import { api } from "@/lib/api";
import TransactionForm from "@/components/TransactionForm";
import BudgetForm from "@/components/BudgetForm";
import DeleteButton from "@/components/DeleteButton";
import BudgetProgress from "@/components/BudgetProgress";
import TransactionChart from "@/components/TransactionChart";
import BudgetChart from "@/components/BudgetChart";
import TransactionFilters from "@/components/TransactionFilters";
import { exportToCsv } from "@/utils/exportToCsv";
import { toast } from "react-hot-toast";
import { useNotifications } from "@/components/NotificationCenter";
import { PlaidLink } from "@/components/PlaidLink";
import { plaidService } from "@/services/plaid";
import { TransactionsTable } from "@/components/TransactionsTable";
import Link from "next/link";
import {
  PlusIcon,
  ArrowDownTrayIcon,
  WalletIcon,
  ArrowUpIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

// Add TypeScript interfaces
interface Transaction {
  name: ReactNode;
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: "income" | "expense";
  icon?: string; // Optional since we're using static icons
}

interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
}

interface TransactionFilters {
  type?: "income" | "expense";
  category?: string;
  dateRange?: "all" | "today" | "week" | "month" | "year";
}

interface PlaidAccount {
  id: string;
  name: string;
  type: string;
  balances: {
    current: number;
  };
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="px-4 py-2 text-[#6B4423] hover:text-[#8B5E34] rounded-lg hover:bg-white/20 transition-all duration-300"
  >
    {children}
  </Link>
);

// Add these motion variants at the top of your file
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Add this base button style class
const buttonBaseStyle = `
  relative overflow-hidden
  before:content-[''] before:absolute before:inset-0 
  before:bg-[conic-gradient(from_0deg,rgba(255,255,255,0.5),transparent)]
  before:transition-transform before:duration-500 before:ease-out before:rotate-0
  hover:before:rotate-180
  active:scale-95
  transition-all duration-300
`;

// Add this card base style
const cardBaseStyle = `
  relative overflow-hidden
  before:content-[''] before:absolute before:inset-0 
  before:bg-[conic-gradient(from_0deg,rgba(139,94,52,0.15),transparent)]
  before:transition-transform before:duration-700 before:ease-out before:rotate-0
  hover:before:rotate-180
  transition-all duration-500
  backdrop-blur-sm
  border border-[#8B5E34]/20
  hover:shadow-[0_15px_40px_rgba(139,94,52,0.25)]
  group
`;

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { addNotification } = useNotifications();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [plaidAccounts, setPlaidAccounts] = useState<PlaidAccount[]>([]);

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user) return;

      try {
        await api.post("/auth/sync", {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
        });
      } catch (error) {
        console.error("Failed to sync user:", error);
        addNotification(
          "Failed to sync user data. Please try refreshing the page.",
          "error"
        );
      }
    };

    syncUser();
  }, [user, isLoaded, addNotification]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsData, budgetsData] = await Promise.all([
          transactionService.getAll(),
          budgetService.getAll(),
        ]);
        setTransactions(transactionsData);
        setBudgets(budgetsData);
        setFilteredTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (isLoaded && user) {
      fetchData();
    }
  }, [user, isLoaded]);

  const refreshData = async () => {
    try {
      const [transactionsData, budgetsData] = await Promise.all([
        transactionService.getAll(),
        budgetService.getAll(),
      ]);
      setTransactions(transactionsData);
      setBudgets(budgetsData);
      setFilteredTransactions(transactionsData);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const handleDeleteTransaction = async (id: string) => {
    try {
      await transactionService.delete(id);
      await refreshData();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const filterTransactions = (filters: TransactionFilters) => {
    let filtered = [...transactions];

    if (filters.type) {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    if (filters.category) {
      filtered = filtered.filter((t) => t.category === filters.category);
    }

    if (filters.dateRange !== "all") {
      const now = new Date();
      let startDate = new Date();

      switch (filters.dateRange) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case "week":
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case "month":
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case "year":
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
      }

      filtered = filtered.filter((t) => new Date(t.date) >= startDate);
    }

    return filtered;
  };

  const handleExport = () => {
    const dataToExport = filteredTransactions.map((t) => ({
      Date: new Date(t.date).toLocaleDateString(),
      Description: t.description,
      Category: t.category,
      Amount: t.amount,
      Type: t.type,
    }));

    exportToCsv(dataToExport, "transactions");
  };

  const handleBudgetWarning = (message: string) => {
    toast(message, {
      duration: 4000,
      icon: "⚠️",
      style: {
        background: "#fef3c7",
        color: "#92400e",
        border: "1px solid #f59e0b",
      },
    });
  };

  const fetchPlaidData = async () => {
    try {
      const accounts = await plaidService.getAccounts();
      setPlaidAccounts(accounts);
    } catch (error) {
      console.error("Error fetching Plaid data:", error);
    }
  };

  if (!isLoaded || !user) {
    return null;
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#F5E6D3] via-[#E6D5C3] to-[#D4BBA3]">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/cl.jpg"
          alt="Dashboard Background"
          fill
          quality={100}
          className="object-cover opacity-20"
          priority
        />
        {/* Warm gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#8B5E34]/30 via-[#6B4423]/25 to-[#4A2F17]/20"
          style={{ mixBlendMode: "soft-light" }}
        />
      </div>

      {/* Navbar with warm glass effect */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-[#8B5E34]/10 backdrop-blur-md border border-[#8B5E34]/20 rounded-2xl m-4 shadow-[0_8px_30px_rgb(139,94,52,0.1)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-[#6B4423]">
                FinFlow
              </span>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <NavLink href="/dashboard">Dashboard</NavLink>
                  <NavLink href="/transactions">Transactions</NavLink>
                  <NavLink href="/budgets">Budgets</NavLink>
                  <NavLink href="/investments">Investments</NavLink>
                  <NavLink href="/profile">Profile</NavLink>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowTransactionForm(true)}
                className={`${buttonBaseStyle} bg-gradient-to-r from-[#8B5E34] to-[#6B4423] text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-8 p-6"
      >
        {/* Animated Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className={`${cardBaseStyle} bg-gradient-to-br from-[#8B5E34]/10 via-[#6B4423]/5 to-transparent 
              p-8 rounded-3xl shadow-[0_8px_30px_rgba(139,94,52,0.15)]`}
          >
            <motion.div
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B5E34]/10 rounded-xl group-hover:bg-[#8B5E34]/20 transition-colors">
                  <WalletIcon className="w-6 h-6 text-[#8B5E34]" />
                </div>
                <h3 className="text-[#6B4423] text-lg font-medium">Balance</h3>
              </div>
              <p className="text-4xl font-bold text-[#4A2F17] mt-2 group-hover:translate-x-1 transition-transform">
                ${balance.toFixed(2)}
              </p>
              <div className="flex items-center gap-2 text-[#8B5E34]/70">
                <ArrowUpIcon className="w-4 h-4" />
                <span className="text-sm">+12.5% from last month</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className={`${cardBaseStyle} bg-gradient-to-br from-[#8B5E34]/10 via-[#6B4423]/5 to-transparent 
              p-6 rounded-2xl shadow-[0_8px_30px_rgba(139,94,52,0.1)]`}
          >
            <motion.div
              variants={floatingVariants}
              initial="initial"
              animate="animate"
            >
              <h3 className="text-[#6B4423] text-lg font-medium">
                Monthly Spending
              </h3>
              <span className="text-red-500">-3.2%</span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className={`${cardBaseStyle} bg-gradient-to-br from-[#8B5E34]/10 via-[#6B4423]/5 to-transparent 
              p-6 rounded-2xl shadow-[0_8px_30px_rgba(139,94,52,0.1)]`}
          >
            <motion.div
              variants={floatingVariants}
              initial="initial"
              animate="animate"
            >
              <h3 className="text-[#6B4423] text-lg font-medium">
                Savings Goal
              </h3>
              <span className="text-blue-500">78%</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowTransactionForm(true)}
            className={`${buttonBaseStyle} bg-gradient-to-r from-[#8B5E34] to-[#6B4423] text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            Add Transaction
          </button>
          <button
            onClick={() => setShowBudgetForm(true)}
            className={`${buttonBaseStyle} bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            Create Budget
          </button>
        </div>

        {showTransactionForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/80 p-8 rounded-2xl shadow-2xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
              <TransactionForm
                onSuccess={() => {
                  refreshData();
                  setShowTransactionForm(false);
                }}
              />
              <button
                onClick={() => setShowTransactionForm(false)}
                className="mt-4 text-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {showBudgetForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/80 p-8 rounded-2xl shadow-2xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Create Budget</h2>
              <BudgetForm
                onSuccess={() => {
                  refreshData();
                  setShowBudgetForm(false);
                }}
              />
              <button
                onClick={() => setShowBudgetForm(false)}
                className="mt-4 text-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <button
            onClick={handleExport}
            className={`${buttonBaseStyle} bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            Export to CSV
          </button>
        </div>
        <TransactionFilters
          onFilterChange={(filters) => {
            const filtered = filterTransactions(filters);
            setFilteredTransactions(filtered);
          }}
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-8"
        >
          {filteredTransactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              variants={cardVariants}
              whileHover={{ scale: 1.01 }}
              className={`${cardBaseStyle} bg-white/30 p-6 rounded-2xl mb-4 
                shadow-[0_4px_20px_rgba(139,94,52,0.1)] hover:bg-white/40`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#8B5E34]/10 flex items-center justify-center">
                    <Image
                      src={transaction.icon || "/placeholder-icon.png"}
                      alt={transaction.description || "Transaction icon"}
                      width={24}
                      height={24}
                      className="opacity-70"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[#4A2F17]">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-[#8B5E34]/70">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-lg font-semibold ${
                      transaction.type === "income"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    ${transaction.amount.toFixed(2)}
                  </span>
                  <DeleteButton
                    onDelete={() => handleDeleteTransaction(transaction.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${cardBaseStyle} bg-gradient-to-br from-[#8B5E34]/10 via-[#6B4423]/5 to-transparent 
            rounded-3xl p-8 shadow-[0_8px_30px_rgba(139,94,52,0.1)]`}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#8B5E34]/10 rounded-xl">
                <ArrowRightIcon className="w-6 h-6 text-[#8B5E34]" />
              </div>
              <h2 className="text-xl font-semibold text-[#6B4423]">
                Quick Transfer
              </h2>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Recipient"
                className="w-full p-4 rounded-xl bg-white/10 border border-[#8B5E34]/20 text-[#4A2F17] placeholder-[#8B5E34]/40 focus:outline-none focus:ring-2 focus:ring-[#8B5E34]/20"
              />
              <input
                type="number"
                placeholder="Amount"
                className="w-full p-4 rounded-xl bg-white/10 border border-[#8B5E34]/20 text-[#4A2F17] placeholder-[#8B5E34]/40 focus:outline-none focus:ring-2 focus:ring-[#8B5E34]/20"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${buttonBaseStyle} w-full py-4 bg-gradient-to-r from-[#8B5E34] to-[#6B4423] 
                  text-white rounded-xl font-semibold shadow-lg hover:shadow-xl`}
              >
                Send Money
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`${cardBaseStyle} bg-gradient-to-br from-[#8B5E34]/10 via-[#6B4423]/5 to-transparent 
            rounded-2xl p-6 shadow-[0_8px_30px_rgba(139,94,52,0.1)]`}
        >
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#6B4423] mb-4">
              Investment Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Stocks</span>
                <span className="font-semibold">$8,240.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Crypto</span>
                <span className="font-semibold">$3,890.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Real Estate</span>
                <span className="font-semibold">$12,400.00</span>
              </div>
              <button className="w-full py-2 bg-white text-pink-600 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </motion.div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Budgets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgets.map((budget) => (
              <BudgetProgress
                key={budget.id}
                category={budget.category}
                spent={budget.spent}
                amount={budget.amount}
                onWarning={handleBudgetWarning}
              />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-xl bg-white shadow-lg"
          >
            <TransactionChart transactions={transactions} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-6 rounded-xl bg-white shadow-lg"
          >
            <BudgetChart budgets={budgets} />
          </motion.div>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Bank Accounts</h2>
          <PlaidLink onSuccess={fetchPlaidData} />

          {plaidAccounts.length > 0 && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {plaidAccounts.map((account) => (
                <div
                  key={account.id}
                  className="p-4 bg-white rounded-lg shadow"
                >
                  <h3 className="font-medium">{account.name}</h3>
                  <p className="text-gray-600">{account.type}</p>
                  <p className="text-xl mt-2">
                    ${account.balances.current.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <TransactionsTable transactions={filteredTransactions} />
      </motion.div>

      {/* Animated Quick Actions */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-8 right-8 flex flex-col gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 bg-[#8B5E34] text-white rounded-full shadow-lg hover:bg-[#6B4423] transition-colors"
          onClick={() => setShowTransactionForm(true)}
        >
          <PlusIcon className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 bg-[#8B5E34] text-white rounded-full shadow-lg hover:bg-[#6B4423] transition-colors"
          onClick={handleExport}
        >
          <ArrowDownTrayIcon className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}

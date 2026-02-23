import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Toaster } from "@/components/ui/toaster";

// Auth Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import KycIdentity from "@/pages/onboarding/KycIdentity";
import KycAddress from "@/pages/onboarding/KycAddress";
import OnboardingSuccess from "@/pages/onboarding/OnboardingSuccess";

// Dashboard Pages
import Dashboard from "@/pages/dashboard/Dashboard";
import AccountsOverview from "@/pages/accounts/AccountsOverview";
import AccountDetails from "@/pages/accounts/AccountDetails";
import TransactionsList from "@/pages/transactions/TransactionsList";
import SendMoney from "@/pages/pay/SendMoney";
import Cards from "@/pages/cards/Cards";
import LoansOverview from "@/pages/loans/LoansOverview";
import LoanDetail from "@/pages/loans/LoanDetail";
import LoanApply from "@/pages/loans/LoanApply";

// New Pages
import InvestmentsOverview from "@/pages/investments/InvestmentsOverview";
import MutualFunds from "@/pages/investments/MutualFunds";
import Stocks from "@/pages/investments/Stocks";
import SavingsGoals from "@/pages/goals/SavingsGoals";
import Analytics from "@/pages/analytics/Analytics";
import Statements from "@/pages/statements/Statements";
import Profile from "@/pages/profile/Profile";
import SecuritySettings from "@/pages/settings/SecuritySettings";
import NotificationSettings from "@/pages/settings/NotificationSettings";
import HelpSupport from "@/pages/support/HelpSupport";
import NotificationsCenter from "@/pages/notifications/NotificationsCenter";

// Simple Auth Guard Mock
const AuthGuard = () => {
  // In a real app, verify token validity here
  const isAuthenticated = localStorage.getItem("novapay-auth") === "true";
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="novapay-theme">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Onboarding Routes (No Sidebar) */}
          <Route path="/onboarding/kyc-identity" element={<KycIdentity />} />
          <Route path="/onboarding/kyc-address" element={<KycAddress />} />
          <Route path="/onboarding/success" element={<OnboardingSuccess />} />

          {/* Protected Dashboard Routes */}
          <Route element={<AuthGuard />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Accounts */}
              <Route path="/accounts" element={<AccountsOverview />} />
              <Route path="/accounts/:id" element={<AccountDetails />} />
              
              {/* Transactions */}
              <Route path="/transactions" element={<TransactionsList />} />
              
              {/* Money */}
              <Route path="/pay/send" element={<SendMoney />} />
              <Route path="/cards" element={<Cards />} />
              
              {/* Grow */}
              <Route path="/loans" element={<LoansOverview />} />
              <Route path="/loans/apply" element={<LoanApply />} />
              <Route path="/loans/:loanId" element={<LoanDetail />} />
              
              {/* Investments */}
              <Route path="/investments" element={<InvestmentsOverview />} />
              <Route path="/investments/mutual-funds" element={<MutualFunds />} />
              <Route path="/investments/stocks" element={<Stocks />} />
              
              <Route path="/goals" element={<SavingsGoals />} />
              
              {/* Insights */}
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/statements" element={<Statements />} />
              
              {/* Account & Support */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings/security" element={<SecuritySettings />} />
              <Route path="/settings/notifications" element={<NotificationSettings />} />
              <Route path="/support" element={<HelpSupport />} />
              <Route path="/notifications" element={<NotificationsCenter />} />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;

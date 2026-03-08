import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Dashboard from "./pages/Dashboard";
import DocumentsList from "./pages/DocumentsList";
import Datasets from "./pages/Datasets";
import DatasetDetails from "./pages/DatasetDetails";
import NewIngestion from "./pages/NewIngestion";
import AutoMode from "./pages/AutoMode";
import GuidedMode from "./pages/GuidedMode";
import DocumentDetails from "./pages/DocumentDetails";
import ChunkExplorer from "./pages/ChunkExplorer";
import RetrievalTest from "./pages/RetrievalTest";
import ActivityLogs from "./pages/ActivityLogs";
import Settings from "./pages/Settings";
import Models from "./pages/Models";
import VectorStore from "./pages/VectorStore";
import IngestionsList from "./pages/IngestionsList";
import Playground from "./pages/Playground";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/datasets" element={<Datasets />} />
          <Route path="/datasets/new" element={<Datasets />} />
          <Route path="/datasets/:id" element={<DatasetDetails />} />
          <Route path="/ingestions" element={<IngestionsList />} />
          <Route path="/ingestions/new" element={<NewIngestion />} />
          <Route path="/ingestions/auto" element={<AutoMode />} />
          <Route path="/ingestions/guided/*" element={<GuidedMode />} />
          <Route path="/documents" element={<DocumentsList />} />
          <Route path="/documents/:id" element={<DocumentDetails />} />
          <Route path="/chunks" element={<ChunkExplorer />} />
          <Route path="/retrieval" element={<RetrievalTest />} />
          <Route path="/models" element={<Models />} />
          <Route path="/vector-store" element={<VectorStore />} />
          <Route path="/activity" element={<ActivityLogs />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

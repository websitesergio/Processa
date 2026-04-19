import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: unknown;
  componentStack?: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, componentStack: undefined };
  }

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error, componentStack: undefined };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log full details for debugging
    console.error("Error caught by boundary:", error, errorInfo);

    // Save component stack so you can see what crashed (super useful)
    this.setState({ componentStack: errorInfo.componentStack || undefined });
  }

  handleReset = () => {
    // Reset local state and go home
    this.setState({ hasError: false, error: null, componentStack: undefined });
    window.location.href = "/";
  };

  private getSafeMessage(err: unknown): string {
    try {
      if (err instanceof Error) return err.message || "Unknown error";
      if (typeof err === "string") return err;
      if (err && typeof err === "object" && "message" in err) {
        const maybe = (err as any).message;
        if (typeof maybe === "string" && maybe.trim().length > 0) return maybe;
      }
      return "Unknown error";
    } catch {
      return "Unknown error";
    }
  }

  render() {
    if (this.state.hasError) {
      const message = this.getSafeMessage(this.state.error);

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-900/70 border border-gray-800/70 rounded-2xl p-8 backdrop-blur-sm shadow-2xl text-center">
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 flex items-center justify-center mx-auto">
                  <AlertTriangle className="text-red-400" size={40} strokeWidth={1.5} />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-50 mb-3">Something went wrong</h2>

              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                We encountered an unexpected error. Don&apos;t worry, your data is safe. Try refreshing the page
                or return to the homepage.
              </p>

              <div className="mb-6 p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                <p className="text-xs text-red-300 font-mono break-all">{message}</p>

                {/* DEV-only component stack (doesn't leak info on production) */}
                {import.meta.env.DEV && this.state.componentStack && (
                  <pre className="mt-3 text-[10px] leading-relaxed text-red-200/70 whitespace-pre-wrap break-words text-left">
                    {this.state.componentStack}
                  </pre>
                )}
              </div>

              <button
                onClick={this.handleReset}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center justify-center gap-2 group"
              >
                <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
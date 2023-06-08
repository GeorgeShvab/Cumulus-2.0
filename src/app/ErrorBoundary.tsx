'use client'

import { Component, ErrorInfo, ReactElement, ReactNode } from 'react'

class ErrorBoundary extends Component<{ children: ReactElement; fallback: ReactElement }> {
  state = { hasError: false }

  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export default ErrorBoundary

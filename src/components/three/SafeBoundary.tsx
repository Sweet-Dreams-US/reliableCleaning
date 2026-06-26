"use client";

import { Component, ReactNode } from "react";

/**
 * Minimal error boundary so a failed remote 3D/GLB load degrades gracefully to
 * a fallback instead of taking down the page.
 */
export class SafeBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

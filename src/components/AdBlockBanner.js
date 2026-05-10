"use client";

import { useState } from "react";
import { Shield, X, ExternalLink } from "lucide-react";

export default function AdBlockBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3 mb-4">
      <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1 text-sm text-blue-200">
        <p className="font-semibold mb-1">Tips: Install AdBlocker untuk pengalaman nonton tanpa iklan!</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <a
            href="https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 px-3 py-1.5 rounded text-xs transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            uBlock Origin (Chrome)
          </a>
          <a
            href="https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 px-3 py-1.5 rounded text-xs transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            uBlock Origin (Firefox)
          </a>
        </div>
      </div>
      <button onClick={() => setDismissed(true)} className="text-gray-400 hover:text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

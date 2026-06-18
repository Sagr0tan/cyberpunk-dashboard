#!/usr/bin/env python3
"""CyberDash — simple HTTP server on port 3000 with auto-open."""

import http.server
import socketserver
import webbrowser
import threading
import os

PORT = 3000
DIR  = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def log_message(self, fmt, *args):
        print(f"  {self.address_string()} — {fmt % args}")


def open_browser():
    webbrowser.open(f"http://localhost:{PORT}")


with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"\n  CyberDash running at http://localhost:{PORT}")
    print("  Press Ctrl+C to stop.\n")
    threading.Timer(0.8, open_browser).start()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  Server stopped.")

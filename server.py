#!/usr/bin/env python3
"""
Sentix Enterprise Portal - HTTP & REST API Server
Standard Python Library - Zero Third-Party Dependencies Required
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Serve API endpoint mock for Enterprise integration testing
        if self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"status": "healthy", "system": "Sentix ERP", "nlp_status": "active"}')
            return
        return super().do_GET()

def main():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"===========================================================")
        print(f" Sentix Enterprise Portal Server Running!")
        print(f" Access URL: http://localhost:{PORT}")
        print(f" Press CTRL+C to stop the server.")
        print(f"===========================================================")
        webbrowser.open(f"http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer shut down cleanly.")
            sys.exit(0)

if __name__ == "__main__":
    main()
